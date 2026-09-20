import type { Metadata } from "next";

import { Manrope, Marcellus } from "next/font/google";

import { CookieSettings } from "@/components/cookie-settings";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "RealHoroscope | Gerçek 13'lü Zodyak",
    template: "%s | RealHoroscope",
  },

  description:
    "Güneş, Ay, yükselen ve akslarını IAU takımyıldız sınırlarıyla hesapla; yöntemi, kaynakları ve 13 takımyıldızı ayrıntılarıyla keşfet.",

  applicationName: "RealHoroscope",

  authors: [{ name: "RealHoroscope Editörlüğü" }],

  creator: "RealHoroscope",

  publisher: "RealHoroscope",

  category: "astronomi ve kültür",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "RealHoroscope",
    title: "RealHoroscope | Gerçek 13'lü Zodyak",
    description:
      "Gerçek gökyüzü konumlarını hesapla, yöntemini incele ve 13 takımyıldızı öğren.",
    url: "/",
  },

  twitter: {
    card: "summary",
    title: "RealHoroscope | Gerçek 13'lü Zodyak",
    description:
      "IAU takımyıldız sınırlarına dayalı gökyüzü hesaplayıcısı ve rehberi.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RealHoroscope",
  url: siteUrl,
  email: "realhoroscope.online@gmail.com",
  description:
    "Astronomik konumları kültürel ve sembolik zodyak yorumlarından açıkça ayıran Türkçe eğitim ve hesaplama platformu.",
};

const adsenseClient =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${marcellus.variable}`}
    >
      <head>
        {adsenseClient ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>

      <body>
        <a className="skip-link" href="#ana-icerik">
          İçeriğe geç
        </a>

        <SiteHeader />

        {children}

        <SiteFooter />

        <CookieSettings />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}