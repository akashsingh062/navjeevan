import { NextResponse } from "next/server";

function transformFacebookUrl(urlStr: string): string {
  if (!urlStr.includes("fbcdn.net") || !urlStr.includes("/t15.")) {
    return urlStr;
  }
  try {
    const u = new URL(urlStr);
    const pathname = u.pathname;
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    const parts = nameWithoutExt.split("_");
    if (parts.length >= 3) {
      const videoId = parts[1];
      if (/^\d+$/.test(videoId)) {
        return `https://www.facebook.com/watch/?v=${videoId}&poster=${encodeURIComponent(urlStr)}`;
      }
    }
  } catch (err) {
    console.error("Error transforming Facebook URL:", err);
  }
  return urlStr;
}

interface FBGraphQLEdge {
  node?: {
    __typename?: string;
    is_playable?: boolean;
    image?: { uri?: string };
  };
}

interface FBGraphQLPageInfo {
  end_cursor?: string;
  has_next_page?: boolean;
}

interface FBGraphQLMediaNode {
  id?: string;
  media?: {
    edges?: FBGraphQLEdge[];
    page_info?: FBGraphQLPageInfo;
  };
}

async function fetchFacebookGraphQLAlbum(setToken: string): Promise<string[]> {
  const url = "https://www.facebook.com/api/graphql/";
  const images: string[] = [];
  const maxImages = 200;

  const variables1 = {
    feedbackSource: 65,
    feedLocation: "PERMALINK",
    focusCommentID: null,
    mediasetToken: setToken,
    privacySelectorRenderLocation: "COMET_STREAM",
    renderLocation: "permalink",
    scale: 1,
    useDefaultActor: false,
    __relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider: false,
    __relay_internal__pv__TestPilotShouldIncludeDemoAdUseCaserelayprovider: false,
    __relay_internal__pv__CometUFIShareActionMigrationrelayprovider: true,
    __relay_internal__pv__CometUFICommentAutoTranslationTyperelayprovider: "AUTO_TRANSLATE",
    __relay_internal__pv__CometUFICommentAvatarStickerAnimatedImagerelayprovider: false,
    __relay_internal__pv__CometUFICommentActionLinksRewriteEnabledrelayprovider: false,
    __relay_internal__pv__IsWorkUserrelayprovider: false,
    __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
    __relay_internal__pv__CometUFISingleLineUFIrelayprovider: false
  };

  const bodyParams1 = new URLSearchParams();
  bodyParams1.append("doc_id", "27412278931730196");
  bodyParams1.append("variables", JSON.stringify(variables1));
  bodyParams1.append("__a", "1");

  try {
    const res1 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
        "Accept": "*/*"
      },
      body: bodyParams1.toString(),
      next: { revalidate: 0 }
    });

    if (!res1.ok) {
      console.error(`GraphQL page 1 responded with status ${res1.status}`);
      return [];
    }

    const text1 = await res1.text();
    const lines1 = text1.split("\n").filter(l => l.trim().length > 0);

    let album: FBGraphQLMediaNode | null = null;
    for (const line of lines1) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.data?.album) {
          album = parsed.data.album;
          break;
        }
      } catch {}
    }

    if (!album) {
      console.error("Could not find album in GraphQL page 1 response.");
      return [];
    }

    const albumId = album.id;
    let pageInfo = album.media?.page_info;
    const edges1 = album.media?.edges || [];

    const processEdges = (edges: FBGraphQLEdge[]) => {
      for (const edge of edges) {
        const node = edge.node;
        if (!node) continue;
        if (node.__typename === "Video" || node.is_playable) continue;

        const uri = node.image?.uri;
        if (uri && typeof uri === "string") {
          images.push(uri);
        }
      }
    };

    processEdges(edges1);

    let cursor = pageInfo?.end_cursor;
    let hasNextPage = pageInfo?.has_next_page;
    let pagesFetched = 1;

    while (hasNextPage && cursor && images.length < maxImages && pagesFetched < 10) {
      const variables2 = {
        id: albumId,
        count: 24,
        cursor: cursor,
        renderLocation: "permalink",
        scale: 1,
        __relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider: false
      };

      const bodyParams2 = new URLSearchParams();
      bodyParams2.append("doc_id", "26372385769106764");
      bodyParams2.append("variables", JSON.stringify(variables2));
      bodyParams2.append("__a", "1");

      const res2 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
          "Accept": "*/*"
        },
        body: bodyParams2.toString(),
        next: { revalidate: 0 }
      });

      if (!res2.ok) {
        console.error(`GraphQL pagination page ${pagesFetched + 1} responded with status ${res2.status}`);
        break;
      }

      const text2 = await res2.text();
      const lines2 = text2.split("\n").filter(l => l.trim().length > 0);

      let pageNode: FBGraphQLMediaNode | null = null;
      for (const line of lines2) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.data?.node) {
            pageNode = parsed.data.node;
            break;
          }
        } catch {}
      }

      if (!pageNode) {
        console.error(`Could not find node in page ${pagesFetched + 1} response.`);
        break;
      }

      const edges2 = pageNode.media?.edges || [];
      processEdges(edges2);

      pageInfo = pageNode.media?.page_info;
      cursor = pageInfo?.end_cursor;
      hasNextPage = pageInfo?.has_next_page;
      pagesFetched++;
    }

  } catch (err) {
    console.error("Error in fetchFacebookGraphQLAlbum:", err);
  }

  return images;
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ success: false, message: "Missing URL parameter." }, { status: 400 });
    }

    let targetUrl = url.trim();

    if (targetUrl.includes("story.php") || targetUrl.includes("permalink.php")) {
      try {
        const parsedUrl = new URL(targetUrl);
        const storyFbid = parsedUrl.searchParams.get("story_fbid");
        const id = parsedUrl.searchParams.get("id");
        if (storyFbid && id) {
          targetUrl = `https://www.facebook.com/${id}/posts/${storyFbid}`;
        }
      } catch (err) {
        console.error("Error parsing direct story/permalink URL:", err);
      }
    }

    let response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      redirect: "manual",
      next: { revalidate: 0 }
    });

    let finalUrl = targetUrl;
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        if (location.includes("story.php") || location.includes("permalink.php")) {
          try {
            const redirectUrl = new URL(location);
            const storyFbid = redirectUrl.searchParams.get("story_fbid");
            const id = redirectUrl.searchParams.get("id");
            if (storyFbid && id) {
              const desktopUrl = `https://www.facebook.com/${id}/posts/${storyFbid}`;
              response = await fetch(desktopUrl, {
                headers: {
                  "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
                  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "Accept-Language": "en-US,en;q=0.5",
                },
                next: { revalidate: 0 }
              });
              finalUrl = response.url || desktopUrl;
            } else {
              response = await fetch(location, {
                headers: {
                  "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
                  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "Accept-Language": "en-US,en;q=0.5",
                },
                next: { revalidate: 0 }
              });
              finalUrl = response.url || location;
            }
          } catch (err) {
            console.error("Error parsing redirect URL:", err);
          }
        } else {
          response = await fetch(location, {
            headers: {
              "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.5",
            },
            next: { revalidate: 0 }
          });
          finalUrl = response.url || location;
        }
      }
    }

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const rawHtml = await response.text();

    const html = rawHtml
      .replace(/\\/g, "")
      .replace(/&amp;/g, "&")
      .replace(/\\u003d/gi, "=")
      .replace(/\\u0026/gi, "&");

    const finalImages: string[] = [];

    const resolveUrl = (src: string) => {
      try {
        if (src.startsWith("http://") || src.startsWith("https://")) {
          return src;
        }
        return new URL(src, finalUrl).toString();
      } catch {
        return src;
      }
    };

    const uLower = finalUrl.toLowerCase();

    if (uLower.includes("facebook.com")) {

      let activeHtml = html;

      let setToken: string | null = null;
      try {
        const urlObj = new URL(targetUrl);
        const setParam = urlObj.searchParams.get("set");
        if (setParam) {
          setToken = setParam;
        }
      } catch {}

      if (!setToken) {
        const mediasetTokenMatch = html.match(/"mediaset_token":"([^"]+)"/);
        const pcbMatch = html.match(/set=pcb\.(\d+)/);
        const albumMatch = html.match(/set=a\.(\d+)/);

        if (mediasetTokenMatch && mediasetTokenMatch[1]) {
          setToken = mediasetTokenMatch[1];
        } else if (pcbMatch && pcbMatch[1]) {
          setToken = `pcb.${pcbMatch[1]}`;
        } else if (albumMatch && albumMatch[1]) {
          setToken = `a.${albumMatch[1]}`;
        }
      }

      if (setToken) {
        const albumUrl = `https://www.facebook.com/media/set/?set=${setToken}`;
        try {
          const albumResponse = await fetch(albumUrl, {
            headers: {
              "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
            next: { revalidate: 0 }
          });
          if (albumResponse.ok) {
            const albumRawHtml = await albumResponse.text();
            activeHtml = albumRawHtml.replace(/\\/g, "").replace(/&amp;/g, "&");
          }
        } catch (err) {
          console.error("Failed to fetch expanded Facebook mediaset:", err);
        }
      }

      const foundMedia: string[] = [];

      const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi;
      const secureImageRegex = /<meta\s+property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/gi;

      let match;
      while ((match = ogImageRegex.exec(activeHtml)) !== null) {
        if (match[1]) foundMedia.push(resolveUrl(match[1]));
      }
      while ((match = secureImageRegex.exec(activeHtml)) !== null) {
        if (match[1] && !foundMedia.includes(match[1])) {
          foundMedia.push(resolveUrl(match[1]));
        }
      }

      const scontentRegex = /(https:\/\/[a-z0-9.-]+\.fbcdn\.net\/v\/[^"'\s>)}]+)/gi;
      const fbcdnMatches = activeHtml.match(scontentRegex) || [];

      const idMap = new Map<string, { url: string; score: number }>();

      const isExcludedMedia = (urlStr: string): boolean => {
        const lowerUrl = urlStr.toLowerCase();
        return (
          lowerUrl.includes("/t39.30808-1/") ||
          lowerUrl.includes("/t1.30497-1/") ||
          lowerUrl.includes("/emoji.php") ||
          lowerUrl.includes("/rsrc.php") ||
          lowerUrl.includes("cstp=mx") ||
          lowerUrl.includes("fb50") ||
          lowerUrl.includes("fb100") ||
          lowerUrl.includes("fb200") ||
          lowerUrl.includes("safe_image.php") ||
          lowerUrl.includes("s24x24") ||
          lowerUrl.includes("s32x32") ||
          lowerUrl.includes("s40x40") ||
          lowerUrl.includes("s72x72") ||
          lowerUrl.includes("s100x100") ||
          lowerUrl.includes("s160x160")
        );
      };

      const isVideoMedia = (urlStr: string): boolean => {
        const lower = urlStr.toLowerCase();
        return (
          lower.includes("/t15.") ||
          lower.includes(".mp4") ||
          lower.includes("/video/") ||
          lower.includes("video.fna") ||
          lower.includes("facebook.com/watch") ||
          lower.includes("facebook.com/video.php") ||
          lower.includes("fb.watch")
        );
      };

      if (setToken) {
        try {
          console.log(`Fetching Facebook album photos using GraphQL for setToken: ${setToken}`);
          const graphqlImages = await fetchFacebookGraphQLAlbum(setToken);
          console.log(`GraphQL fetched ${graphqlImages.length} images.`);
          for (const media of graphqlImages) {
            if (isExcludedMedia(media) || isVideoMedia(media)) continue;
            try {
              const u = new URL(media);
              const pathname = u.pathname;
              const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
              if (filename) {
                idMap.set(filename, { url: media, score: 200 });
              }
            } catch {
              idMap.set(media, { url: media, score: 200 });
            }
          }
        } catch (err) {
          console.error("Failed to fetch via GraphQL:", err);
        }
      }

      for (const media of foundMedia) {
        if (isExcludedMedia(media) || isVideoMedia(media)) continue;
        try {
          const u = new URL(media);
          const pathname = u.pathname;
          const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
          if (filename) {
            const existing = idMap.get(filename);
            if (!existing || existing.score < 120) {
              idMap.set(filename, { url: media, score: 120 });
            }
          }
        } catch {
          const existing = idMap.get(media);
          if (!existing || existing.score < 120) {
            idMap.set(media, { url: media, score: 120 });
          }
        }
      }

      for (const link of fbcdnMatches) {
        if (isExcludedMedia(link) || isVideoMedia(link)) {
          continue;
        }

        try {
          const u = new URL(link);
          const pathname = u.pathname;
          const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
          if (filename) {
            let score = 100;
            if (link.includes("s590x590")) {
              score = 80;
            } else if (link.includes("s600x600") || link.includes("s640x640") || link.includes("s720x720")) {
              score = 90;
            } else if (link.includes("s960x960")) {
              score = 110;
            } else if (link.includes("mx2048x1536") || link.includes("p600x600")) {
              score = 150;
            } else if (!link.includes("_s")) {
              score = 120;
            }

            const existing = idMap.get(filename);
            if (!existing || existing.score < score) {
              idMap.set(filename, { url: link, score });
            }
          }
        } catch {}
      }

      const fbImages = Array.from(idMap.values()).map(info => transformFacebookUrl(info.url));
      if (fbImages.length > 0) {
        finalImages.push(...fbImages);
      } else if (foundMedia.length > 0) {
        finalImages.push(...Array.from(new Set(foundMedia)).filter(m => !isExcludedMedia(m) && !isVideoMedia(m)).map(transformFacebookUrl));
      }

    } else if (uLower.includes("photos.google.com") || uLower.includes("photos.app.goo.gl") || uLower.includes("googleusercontent.com")) {

      const googleUserRegex = /(https:\/\/[a-z0-9.-]+\.googleusercontent\.com\/pw\/[a-zA-Z0-9_-]+)/gi;
      const googleUserRegexAlt = /(https:\/\/[a-z0-9.-]+\.googleusercontent\.com\/[a-zA-Z0-9_-]{50,})/gi;

      const gMatches = html.match(googleUserRegex) || [];
      const gMatchesAlt = html.match(googleUserRegexAlt) || [];

      const allGMatches = Array.from(new Set([...gMatches, ...gMatchesAlt]));

      for (const link of allGMatches) {

        if (
          link.includes("placeholder") ||
          link.includes("avatar") ||
          link.includes("profile") ||
          link.match(/[=](?:s24|s32|s48|s64|s96|s128|s192|s256|s320)(?:$|\b)/)
        ) {
          continue;
        }

        let highResUrl = link;
        if (highResUrl.includes("=")) {
          highResUrl = highResUrl.substring(0, highResUrl.indexOf("=")) + "=w1920-h1080";
        } else {
          highResUrl = highResUrl + "=w1920-h1080";
        }

        if (!finalImages.includes(highResUrl)) {
          finalImages.push(highResUrl);
        }
      }

    } else if (uLower.includes("instagram.com")) {

      const shortcodeMatch = targetUrl.match(/\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/);

      try {
        const oembedTarget = shortcodeMatch
          ? `https://www.instagram.com/${shortcodeMatch[1]}/${shortcodeMatch[2]}/`
          : targetUrl;
        const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(oembedTarget)}&maxwidth=1080`;
        const oembedRes = await fetch(oembedUrl, {
          headers: { "Accept": "application/json" },
          next: { revalidate: 0 }
        });

        if (oembedRes.ok) {
          const text = await oembedRes.text();
          try {
            const data = JSON.parse(text);
            if (data.thumbnail_url) {
              finalImages.push(data.thumbnail_url);
            }
          } catch {
            console.error("Instagram oEmbed returned non-JSON response.");
          }
        }
      } catch (err) {
        console.error("Instagram oEmbed API failed:", err);
      }

      if (shortcodeMatch && finalImages.length === 0) {
        try {
          const embedUrl = `https://www.instagram.com/${shortcodeMatch[1]}/${shortcodeMatch[2]}/embed/captioned/`;
          const embedRes = await fetch(embedUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.5",
              "Referer": "https://www.instagram.com/",
            },
            next: { revalidate: 0 }
          });

          if (embedRes.ok) {
            const embedHtml = await embedRes.text();
            const cleanEmbedHtml = embedHtml
              .replace(/\\u0026/g, "&")
              .replace(/&amp;/g, "&")
              .replace(/\\\//g, "/");

            const bgImageRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
            let match;
            while ((match = bgImageRegex.exec(cleanEmbedHtml)) !== null) {
              if (match[1] && match[1].includes("cdninstagram.com") && !match[1].includes("s150x150") && !match[1].includes("profile_pic")) {
                if (!finalImages.includes(match[1])) finalImages.push(match[1]);
              }
            }

            const displayUrlRegex = /"display_url"\s*:\s*"([^"]+)"/gi;
            while ((match = displayUrlRegex.exec(cleanEmbedHtml)) !== null) {
              if (match[1]) {
                const cleanUrl = match[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
                if (!finalImages.includes(cleanUrl)) finalImages.push(cleanUrl);
              }
            }

            const embedImgRegex = /<img[^>]+src=["']([^"']*cdninstagram\.com[^"']+)["']/gi;
            while ((match = embedImgRegex.exec(cleanEmbedHtml)) !== null) {
              if (match[1] && !match[1].includes("profile_pic") && !match[1].includes("s150x150") && !match[1].includes("static.cdninstagram.com") && !match[1].includes("rsrc.php")) {
                const cleanUrl = match[1].replace(/&amp;/g, "&");
                if (!finalImages.includes(cleanUrl)) finalImages.push(cleanUrl);
              }
            }

            const videoUrlRegex = /"video_url"\s*:\s*"([^"]+)"/gi;
            while ((match = videoUrlRegex.exec(cleanEmbedHtml)) !== null) {
              if (match[1]) {
                const cleanUrl = match[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
                if (!finalImages.includes(cleanUrl)) finalImages.push(cleanUrl);
              }
            }
          }
        } catch (err) {
          console.error("Instagram embed page fetch failed:", err);
        }
      }

      if (finalImages.length === 0) {
        let instaHtml = html;

        try {
          const browserRes = await fetch(targetUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.5",
            },
            redirect: "follow",
            next: { revalidate: 0 }
          });

          if (browserRes.ok) {
            const rawInstaHtml = await browserRes.text();
            instaHtml = rawInstaHtml
              .replace(/\\u0026/g, "&")
              .replace(/&amp;/g, "&")
              .replace(/\\\//g, "/");
          }
        } catch {}

        const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi;
        const ogVideoRegex = /<meta\s+property=["']og:video["']\s+content=["']([^"']+)["']/gi;

        let match;
        while ((match = ogImageRegex.exec(instaHtml)) !== null) {
          if (match[1]) {
            const imgUrl = resolveUrl(match[1]);
            if (!finalImages.includes(imgUrl)) finalImages.push(imgUrl);
          }
        }
        while ((match = ogVideoRegex.exec(instaHtml)) !== null) {
          if (match[1]) {
            const videoUrl = resolveUrl(match[1]);
            if (!finalImages.includes(videoUrl)) finalImages.push(videoUrl);
          }
        }

        const instaCdnRegex = /(https:\/\/scontent[a-z0-9.-]*\.cdninstagram\.com\/[^"'\s>)}]+)/gi;
        const instaMatches = instaHtml.match(instaCdnRegex) || [];
        for (const link of instaMatches) {
          if (!finalImages.includes(link) && !link.includes("logo") && !link.includes("avatar") && !link.includes("profile_pic") && !link.includes("s150x150") && !link.includes("rsrc.php")) {
            finalImages.push(link);
          }
        }
      }

    } else {

      const metaImageRegex = /<meta\s+[^>]*(?:property|name)=["'](?:og:image|og:image:secure_url|twitter:image)["']\s+content=["']([^"']+)["']/gi;
      const metaVideoRegex = /<meta\s+[^>]*(?:property|name)=["'](?:og:video|og:video:secure_url|twitter:player|twitter:player:stream)["']\s+content=["']([^"']+)["']/gi;

      let match;
      const metaMedia: string[] = [];
      while ((match = metaImageRegex.exec(html)) !== null) {
        if (match[1]) {
          const imgUrl = resolveUrl(match[1]);
          if (!metaMedia.includes(imgUrl)) metaMedia.push(imgUrl);
        }
      }
      while ((match = metaVideoRegex.exec(html)) !== null) {
        if (match[1]) {
          const videoUrl = resolveUrl(match[1]);
          if (!metaMedia.includes(videoUrl)) metaMedia.push(videoUrl);
        }
      }

      finalImages.push(...metaMedia);

      const videoTagRegex = /<video\s+[^>]*src=["']([^"']+)["']/gi;
      const sourceTagRegex = /<source\s+[^>]*src=["']([^"']+)["']/gi;

      while ((match = videoTagRegex.exec(html)) !== null) {
        if (match[1]) {
          const videoUrl = resolveUrl(match[1]);
          if (!finalImages.includes(videoUrl)) finalImages.push(videoUrl);
        }
      }
      while ((match = sourceTagRegex.exec(html)) !== null) {
        if (match[1]) {
          const videoUrl = resolveUrl(match[1]);
          if (!finalImages.includes(videoUrl)) finalImages.push(videoUrl);
        }
      }

      const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["']/gi;
      const bodyImages: string[] = [];
      while ((match = imgTagRegex.exec(html)) !== null) {
        if (match[1]) {
          const imgUrl = resolveUrl(match[1]);

          const isLayoutAsset =
            imgUrl.includes("logo") ||
            imgUrl.includes("icon") ||
            imgUrl.includes("header") ||
            imgUrl.includes("footer") ||
            imgUrl.includes("sprite") ||
            imgUrl.includes("tracker") ||
            imgUrl.includes("pixel") ||
            imgUrl.match(/\.(svg|ico|gif)($|\?)/i);

          if (!isLayoutAsset && !bodyImages.includes(imgUrl) && !metaMedia.includes(imgUrl)) {
            bodyImages.push(imgUrl);
          }
        }
      }

      finalImages.push(...bodyImages.slice(0, 30));
    }

    const uniqueImages = Array.from(new Set(finalImages));

    if (uniqueImages.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No public media found in this link. Please ensure it is a public post, album, or webpage."
      });
    }

    return NextResponse.json({
      success: true,
      images: uniqueImages
    });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Failed to resolve link.";
    return NextResponse.json({ success: false, message: errMsg }, { status: 500 });
  }
}
