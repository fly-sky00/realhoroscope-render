const fallbackSiteUrl = "https://realhoroscope.online";

function resolveSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;
  try {
    return new URL(candidate).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
