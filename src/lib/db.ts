import mongoose from "mongoose";
import dns from "dns";

if (process.env.NODE_ENV === "development") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (err) {
    console.warn("Could not set custom DNS servers for database connection:", err);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
const cached: MongooseCache = global.mongoose;

async function resolveMongoSrv(srvUri: string): Promise<string> {
  const match = srvUri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?#]+)([^?#]*)(.*)$/);
  if (!match) return srvUri;

  const [_, username, password, srvHost, dbPath, optionsPart] = match;
  const dbName = dbPath ? dbPath.replace(/^\//, "") : "";

  console.log("[DNS Fix] Resolving MongoDB Atlas SRV host via DNS-over-HTTPS (DoH)...");

  // Fetch hostnames using Google/Cloudflare DoH APIs
  const dnsProviders = [
    `https://dns.google/resolve?name=_mongodb._tcp.${srvHost}&type=SRV`,
    `https://cloudflare-dns.com/dns-query?name=_mongodb._tcp.${srvHost}&type=SRV`
  ];

  for (const url of dnsProviders) {
    try {
      const headers: Record<string, string> = {};
      if (url.includes("cloudflare")) {
        headers["accept"] = "application/dns-json";
      }

      const res = await fetch(url, { headers, next: { revalidate: 3600 } } as any);
      if (!res.ok) continue;
      
      const data = await res.json();
      if (data.Status !== 0 || !data.Answer || data.Answer.length === 0) continue;

      const hosts = data.Answer.map((ans: any) => {
        const parts = ans.data.split(/\s+/);
        const target = parts[3].replace(/\.$/, "");
        const port = parts[2];
        return `${target}:${port}`;
      }).join(",");

      // Resolve options via TXT record
      let txtOptions = "";
      for (const txtUrl of [
        `https://dns.google/resolve?name=${srvHost}&type=TXT`,
        `https://cloudflare-dns.com/dns-query?name=${srvHost}&type=TXT`
      ]) {
        try {
          const txtRes = await fetch(txtUrl, {
            headers: txtUrl.includes("cloudflare") ? { "accept": "application/dns-json" } : {}
          });
          if (txtRes.ok) {
            const txtData = await txtRes.json();
            if (txtData.Status === 0 && txtData.Answer && txtData.Answer.length > 0) {
              const txtRaw = txtData.Answer[0].data;
              txtOptions = txtRaw.replace(/^"|"$/g, "");
              break;
            }
          }
        } catch {
          // ignore error and try next
        }
      }

      let finalQuery = "ssl=true";
      if (txtOptions) finalQuery += `&${txtOptions}`;
      if (optionsPart) {
        const cleanOpts = optionsPart.replace(/^\?/, "");
        if (cleanOpts) finalQuery += `&${cleanOpts}`;
      }

      const standardUri = `mongodb://${username}:${password}@${hosts}/${dbName}?${finalQuery}`;
      console.log("[DNS Fix] Successfully converted SRV URI to standard URI bypassing local DNS.");
      return standardUri;
    } catch (err) {
      console.warn("[DNS Fix] Resolution provider failed:", url, err);
    }
  }

  return srvUri;
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = (async () => {
      let connectionString = MONGODB_URI;
      if (connectionString.startsWith("mongodb+srv://")) {
        try {
          connectionString = await resolveMongoSrv(connectionString);
        } catch (err) {
          console.warn("[DNS Fix] Fallback to original srv string:", err);
        }
      }
      return mongoose.connect(connectionString, opts);
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
