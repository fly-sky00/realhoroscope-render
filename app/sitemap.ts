import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { zodiacSigns } from "@/lib/zodiac-data";
import { siteUrl } from "@/lib/site-url";
const base=siteUrl;
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-19T00:00:00Z");
  const routes = ["", "/burclar", "/gokyuzu", "/burc-uyumu", "/rehber", "/gorsel-aks", "/yontem", "/kaynaklar", "/editor-ilkeleri", "/hakkimizda", "/iletisim", "/gizlilik", "/kullanim-sartlari"];
  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: updated,
      changeFrequency: route === "/gokyuzu" ? "daily" as const : "monthly" as const,
      priority: route === "" ? 1 : (route === "/burclar" || route === "/rehber") ? 0.8 : 0.6,
    })),
    ...zodiacSigns.map((sign) => ({ url: `${base}/burclar/${sign.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...articles.map((article) => ({ url: `${base}/rehber/${article.slug}`, lastModified: new Date(`${article.modifiedAt ?? '2026-09-19'}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
