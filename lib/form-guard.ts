import { sql } from "drizzle-orm";
import { getDb } from "@/db";

type GuardScope = "contact" | "comments" | "admin-login";

export function originMatchesRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const expectedHost = forwardedHost || request.headers.get("host") || new URL(request.url).host;
    return originUrl.host === expectedHost;
  } catch {
    return false;
  }
}

export async function formGuard(request: Request, scope: GuardScope) {
  if (!originMatchesRequest(request)) {
    return Response.json({ error: "Bu kaynaktan gönderim kabul edilmiyor." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "JSON verisi gereklidir." }, { status: 415 });
  }

  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = request.headers.get("cf-connecting-ip") ?? forwardedIp ?? "unidentified";
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${scope}:${Math.floor(now / 86_400_000)}:${ip}`),
  );
  const key = Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  const result = await getDb().execute(sql`
    INSERT INTO form_limits (key, window_start, count)
    VALUES (${key}, ${now}, 1)
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN form_limits.window_start <= ${now - windowMs} THEN 1
        ELSE form_limits.count + 1
      END,
      window_start = CASE
        WHEN form_limits.window_start <= ${now - windowMs} THEN EXCLUDED.window_start
        ELSE form_limits.window_start
      END
    RETURNING count, window_start
  `);

  await getDb().execute(sql`
    DELETE FROM form_limits WHERE window_start < ${now - 86_400_000}
  `);

  const row = result.rows[0] as { count?: number | string; window_start?: number | string } | undefined;
  const count = Number(row?.count ?? 0);
  const windowStart = Number(row?.window_start ?? now);
  const limit = scope === "admin-login" ? 10 : 5;

  if (!row || count > limit) {
    return Response.json(
      { error: "Kısa sürede çok fazla gönderim yapıldı. Bir süre sonra yeniden deneyin." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000)),
          ),
        },
      },
    );
  }
  return null;
}

export async function readFormJson(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("empty");
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16_384) {
        await reader.cancel();
        throw new RangeError("body too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } finally {
    reader.releaseLock();
  }
}
