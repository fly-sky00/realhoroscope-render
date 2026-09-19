import type { Metadata } from "next";
import { FullLink as Link } from "@/components/full-link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { articleBySlug, articles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site-url";
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/rehber/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/rehber/${slug}`,
      publishedTime: "2026-09-13",
      modifiedTime: "2026-09-19",
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: "2026-09-13",
    dateModified: "2026-09-19",
    author: { "@type": "Organization", name: "RealHoroscope Editörlüğü" },
    publisher: { "@type": "Organization", name: "RealHoroscope" },
    mainEntityOfPage: absoluteUrl(`/rehber/${slug}`),
  };
  return (
    <main id="ana-icerik" className="page-main">
      <article className="page-narrow">
        <Link
          href="/rehber"
          className="mb-7 inline-flex items-center gap-2 text-sm text-slate-400"
        >
          <ArrowLeft size={16} />
          Rehbere dön
        </Link>
        <header>
          <p className="eyebrow">{article.category}</p>
          <h1 className="display mt-3 text-4xl sm:text-6xl">{article.title}</h1>
          <p className="lede mt-5">{article.description}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {article.readTime}
            </span>
            <span>Güncellendi: {article.updated}</span>
            <span>Yazar: RealHoroscope Editörlüğü</span>
          </div>
        </header>
        <div className="star-rule my-9" />
        <div className="prose">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <h2>Kaynaklar</h2>
          <ul>
            <li>
              <a
                href="https://iauarchive.eso.org/public/themes/constellations/"
                target="_blank"
                rel="noreferrer"
              >
                IAU: Takımyıldızların tanımı ve sınırları
              </a>
            </li>
            <li>
              <a
                href="https://github.com/cosinekitty/astronomy"
                target="_blank"
                rel="noreferrer"
              >
                Astronomy Engine: Konum hesabı ve koordinat dönüşümleri
              </a>
            </li>
            {article.category === "Ay" && (
              <li>
                <a
                  href="https://science.nasa.gov/moon/moon-phases/"
                  target="_blank"
                  rel="noreferrer"
                >
                  NASA: Ay fazlarının geometrisi
                </a>
              </li>
            )}
          </ul>
          <p>
            Astronomik açıklamalar için Astronomy Engine dokümantasyonu, IAU
            takımyıldız tanımları ve bağımsız efemeris kaynakları temel alınır.
            Sembolik yorumlar ayrı ve açıkça etiketlenir. Bir hata görürseniz{" "}
            <Link href="/iletisim">düzeltme talebi</Link> gönderebilirsiniz.
          </p>
        </div>
        <aside className="mt-10 rounded-2xl border border-violet-200/15 bg-violet-300/5 p-5 text-sm text-slate-300">
          <strong className="text-violet-100">Editoryal not:</strong> Bu yazı
          otomatik günlük burç metni değildir. Kavramı öğretmek ve
          hesaplayıcının sınırlarını açıklamak amacıyla hazırlanmıştır.
        </aside>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
