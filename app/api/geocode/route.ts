export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const known: Record<string, { lat: number; lon: number; label: string; zone?:string }> = {
  "istanbul|türkiye": { lat: 41.0082, lon: 28.9784, label: "İstanbul, Türkiye", zone:"Europe/Istanbul" },
  "ankara|türkiye": { lat: 39.9334, lon: 32.8597, label: "Ankara, Türkiye", zone:"Europe/Istanbul" },
  "izmir|türkiye": { lat: 38.4237, lon: 27.1428, label: "İzmir, Türkiye", zone:"Europe/Istanbul" },
  "paris|france": { lat:48.8566,lon:2.3522,label:"Paris, France",zone:"Europe/Paris" },
  "paris|fransa": { lat:48.8566,lon:2.3522,label:"Paris, Fransa",zone:"Europe/Paris" },
  "london|united kingdom": { lat:51.5072,lon:-0.1276,label:"London, United Kingdom",zone:"Europe/London" },
  "londra|birleşik krallık": { lat:51.5072,lon:-0.1276,label:"Londra, Birleşik Krallık",zone:"Europe/London" },
  "berlin|germany": { lat:52.52,lon:13.405,label:"Berlin, Germany",zone:"Europe/Berlin" },
  "berlin|almanya": { lat:52.52,lon:13.405,label:"Berlin, Almanya",zone:"Europe/Berlin" },
  "new york|united states": { lat:40.7128,lon:-74.006,label:"New York, United States",zone:"America/New_York" },
  "los angeles|united states": { lat:34.0522,lon:-118.2437,label:"Los Angeles, United States",zone:"America/Los_Angeles" },
  "toronto|canada": { lat:43.6532,lon:-79.3832,label:"Toronto, Canada",zone:"America/Toronto" },
  "tokyo|japan": { lat:35.6762,lon:139.6503,label:"Tokyo, Japan",zone:"Asia/Tokyo" },
  "tokyo|japonya": { lat:35.6762,lon:139.6503,label:"Tokyo, Japonya",zone:"Asia/Tokyo" },
  "sydney|australia": { lat:-33.8688,lon:151.2093,label:"Sydney, Australia",zone:"Australia/Sydney" },
  "dubai|united arab emirates": { lat:25.2048,lon:55.2708,label:"Dubai, United Arab Emirates",zone:"Asia/Dubai" },
  "amsterdam|netherlands": { lat:52.3676,lon:4.9041,label:"Amsterdam, Netherlands",zone:"Europe/Amsterdam" },
};

function normalizePlace(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replaceAll("ı", "i")
    .trim();
}

const normalizedKnown = new Map(
  Object.entries(known).map(([key, value]) => [normalizePlace(key), value]),
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get("city") ?? "").trim();
  const country = (searchParams.get("country") ?? "").trim();
  if (!city || !country || city.length > 80 || country.length > 80) return Response.json({ error: "Şehir ve ülke gereklidir." }, { status: 400 });
  const saved = normalizedKnown.get(normalizePlace(`${city}|${country}`));
  if (saved) return Response.json(searchParams.has('candidates')?{results:[saved]}:saved, { headers: { "Cache-Control": "public, max-age=86400" } });
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2"); url.searchParams.set("limit", "5"); url.searchParams.set("city", city); url.searchParams.set("country", country);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(10000), headers: { Accept: "application/json", "User-Agent": "RealHoroscope/2.0 (realhoroscope.online@gmail.com)" } });
    if (!response.ok) throw new Error(`Nominatim ${response.status}`);
    const rows = (await response.json()) as { lat: string; lon: string; display_name: string }[];
    if (!rows[0]) return Response.json({ error: "Konum bulunamadı. İl ve ülke adını kontrol edin." }, { status: 404 });
    const results=rows.map(row=>({lat:Number(row.lat),lon:Number(row.lon),label:row.display_name})).filter(row=>Number.isFinite(row.lat)&&Number.isFinite(row.lon));
    return Response.json(searchParams.has('candidates')?{results}:results[0], { headers: { "Cache-Control": "public, max-age=86400" } });
  } catch (error) {
    console.error("Geocode unavailable", error);
    return Response.json({ error: "Konum hizmetine şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyin." }, { status: 503 });
  }
}
