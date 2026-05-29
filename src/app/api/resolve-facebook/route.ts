import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ success: false, message: "Missing URL parameter." }, { status: 400 });
    }

    const targetUrl = url.trim();

    // Call the page with a social media bot user agent (guarantees OG meta headers!)
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_patched.html)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      next: { revalidate: 0 } // Bypass cache
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const finalUrl = response.url || targetUrl;
    const rawHtml = await response.text();
    
    // Unescape backslashes, HTML entities, and Unicode escapes
    const html = rawHtml
      .replace(/\\/g, "")
      .replace(/&amp;/g, "&")
      .replace(/\\u003d/gi, "=")
      .replace(/\\u0026/gi, "&");

    const finalImages: string[] = [];

    // Helper to resolve relative URLs
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

    // 1. DYNAMIC SCRAPING BASED ON DOMAIN
    if (uLower.includes("facebook.com")) {
      // --- FACEBOOK SCRAPER ---
      const foundImages: string[] = [];
      
      // Parse og:image tags
      const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi;
      const secureImageRegex = /<meta\s+property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/gi;
      
      let match;
      while ((match = ogImageRegex.exec(html)) !== null) {
        if (match[1]) foundImages.push(resolveUrl(match[1]));
      }
      while ((match = secureImageRegex.exec(html)) !== null) {
        if (match[1] && !foundImages.includes(match[1])) {
          foundImages.push(resolveUrl(match[1]));
        }
      }

      // Scan all scontent/fbcdn direct URLs inside body (allowing hyphens in subdomains)
      const scontentRegex = /(https:\/\/[a-z0-9.-]+\.fbcdn\.net\/v\/[^"'\s>)}]+)/gi;
      const fbcdnMatches = html.match(scontentRegex) || [];

      // Group and score urls by their base filename to guarantee extraction of ALL unique images
      const idMap = new Map<string, { url: string; score: number }>();

      // Seed with og:images
      for (const img of foundImages) {
        try {
          const u = new URL(img);
          const pathname = u.pathname;
          const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
          if (filename) {
            idMap.set(filename, { url: img, score: 120 });
          }
        } catch {
          idMap.set(img, { url: img, score: 120 });
        }
      }

      for (const link of fbcdnMatches) {
        // Exclude profile photos, small UI icons, or emojis
        if (
          link.includes("/t39.30808-1/") || 
          link.includes("/t1.30497-1/") || 
          link.includes("/emoji.php") || 
          link.includes("/rsrc.php")
        ) {
          continue;
        }

        // Check if it's a small thumbnail or avatar size
        const isThumbnail = 
          link.includes("s24x24") || 
          link.includes("s32x32") || 
          link.includes("s40x40") || 
          link.includes("s72x72") || 
          link.includes("s100x100") || 
          link.includes("s160x160");

        if (isThumbnail) continue;

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

      const fbImages = Array.from(idMap.values()).map(info => info.url);
      if (fbImages.length > 0) {
        finalImages.push(...fbImages);
      } else if (foundImages.length > 0) {
        finalImages.push(...Array.from(new Set(foundImages)));
      }

    } else if (uLower.includes("photos.google.com") || uLower.includes("photos.app.goo.gl") || uLower.includes("googleusercontent.com")) {
      // --- GOOGLE PHOTOS SCRAPER ---
      const googleUserRegex = /(https:\/\/[a-z0-9.-]+\.googleusercontent\.com\/pw\/[a-zA-Z0-9_-]+)/gi;
      const googleUserRegexAlt = /(https:\/\/[a-z0-9.-]+\.googleusercontent\.com\/[a-zA-Z0-9_-]{50,})/gi;
      
      const gMatches = html.match(googleUserRegex) || [];
      const gMatchesAlt = html.match(googleUserRegexAlt) || [];
      
      const allGMatches = Array.from(new Set([...gMatches, ...gMatchesAlt]));
      
      for (const link of allGMatches) {
        // Exclude common google layout assets or small avatars
        if (
          link.includes("placeholder") || 
          link.includes("avatar") || 
          link.includes("profile") ||
          link.match(/[=](?:s24|s32|s48|s64|s96|s128|s192|s256|s320)(?:$|\b)/)
        ) {
          continue;
        }

        // Set max high-resolution parameter for Google Photos shared images
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
      // --- INSTAGRAM SCRAPER ---
      const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi;
      let match;
      while ((match = ogImageRegex.exec(html)) !== null) {
        if (match[1]) {
          const imgUrl = resolveUrl(match[1]);
          if (!finalImages.includes(imgUrl)) finalImages.push(imgUrl);
        }
      }

      // Scan for any direct Instagram CDN image paths
      const instaCdnRegex = /(https:\/\/[a-z0-9.-]+\.cdninstagram\.com\/[^"'\s>)}]+)/gi;
      const instaMatches = html.match(instaCdnRegex) || [];
      for (const link of instaMatches) {
        if (!finalImages.includes(link) && !link.includes("logo") && !link.includes("avatar")) {
          finalImages.push(link);
        }
      }

    } else {
      // --- UNIVERSAL GENERIC WEB PAGE SCRAPER ---
      // 1. Search meta og/twitter tags
      const metaImageRegex = /<meta\s+[^>]*(?:property|name)=["'](?:og:image|og:image:secure_url|twitter:image)["']\s+content=["']([^"']+)["']/gi;
      let match;
      const metaImages: string[] = [];
      while ((match = metaImageRegex.exec(html)) !== null) {
        if (match[1]) {
          const imgUrl = resolveUrl(match[1]);
          if (!metaImages.includes(imgUrl)) metaImages.push(imgUrl);
        }
      }
      
      finalImages.push(...metaImages);

      // 2. Search body img tags
      const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["']/gi;
      const bodyImages: string[] = [];
      while ((match = imgTagRegex.exec(html)) !== null) {
        if (match[1]) {
          const imgUrl = resolveUrl(match[1]);
          
          // Exclude typical layout assets, small tracking pixels, UI icons, or layout SVGs
          const isLayoutAsset = 
            imgUrl.includes("logo") || 
            imgUrl.includes("icon") || 
            imgUrl.includes("header") || 
            imgUrl.includes("footer") || 
            imgUrl.includes("sprite") || 
            imgUrl.includes("tracker") ||
            imgUrl.includes("pixel") ||
            imgUrl.match(/\.(svg|ico|gif)($|\?)/i);
            
          if (!isLayoutAsset && !bodyImages.includes(imgUrl) && !metaImages.includes(imgUrl)) {
            bodyImages.push(imgUrl);
          }
        }
      }

      // Append up to 30 body images to prevent spamming small layout items
      finalImages.push(...bodyImages.slice(0, 30));
    }

    // Clean duplicate images
    const uniqueImages = Array.from(new Set(finalImages));

    if (uniqueImages.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No public images found in this link. Please ensure it is a public post, album, or webpage."
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
