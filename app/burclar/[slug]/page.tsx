import type { Metadata } from "next";
import { FullLink as Link } from "@/components/full-link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Star } from "lucide-react";
import { signBySlug, sources, zodiacSigns } from "@/lib/zodiac-data";
import { absoluteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return zodiacSigns.map((sign) => ({ slug: sign.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sign = signBySlug[slug];
  if (!sign) return {};
  return {
    title: `${sign.name} (${sign.latin}) Gerçek Takımyıldızı`,
    description: `${sign.name} takımyıldızının astronomik konumu, yaklaşık Güneş geçişi, önemli yıldızları ve Güneş, Ay, yükselen sembolik yorumları.`,
    alternates: { canonical: `/burclar/${slug}` },
  };
}
export default async function SignDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sign = signBySlug[slug];
  if (!sign) notFound();
  const index = zodiacSigns.findIndex((s) => s.slug === slug);
  const prev = zodiacSigns[(index + 12) % 13];
  const next = zodiacSigns[(index + 1) % 13];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${sign.name} (${sign.latin}) Takımyıldızı Rehberi`,
    dateModified: "2026-09-19",
    author: { "@type": "Organization", name: "RealHoroscope Editörlüğü" },
    publisher: { "@type": "Organization", name: "RealHoroscope" },
    mainEntityOfPage: absoluteUrl(`/burclar/${slug}`),
  };
  return (
    <main id="ana-icerik" className="page-main">
      <article className="page-narrow">
        <nav className="mb-6 text-sm text-slate-500" aria-label="İçerik yolu">
          <Link href="/burclar">13 Takımyıldız</Link> / <span>{sign.name}</span>
        </nav>
        <header
          className="panel overflow-hidden p-6 sm:p-10"
          style={{
            background: `radial-gradient(circle at 90% 10%,${sign.accent}22,transparent 40%),linear-gradient(145deg,rgba(20,23,42,.96),rgba(11,13,27,.94))`,
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="eyebrow">
                IAU {sign.iau} · {sign.latin}
              </p>
              <h1 className="display mt-3 text-5xl sm:text-7xl">
                <span style={{ color: sign.accent }}>{sign.glyph}</span>{" "}
                {sign.name}
              </h1>
              <p className="mt-4 flex items-center gap-2 text-violet-100">
                <CalendarDays size={18} />
                {sign.dates}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Anahtar temalar
              </p>
              <div className="mt-2 flex max-w-60 flex-wrap gap-2">
                {sign.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-full bg-white/7 px-3 py-1 text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-7 text-sm text-slate-400">
            Yaklaşık dönem sabit burç takvimi değildir. Kesin sınır geçişi yıl
            ve saate göre hesaplayıcıdan kontrol edilmelidir.
          </p>
        </header>
        <div className="prose mt-9">
          <h2>Gökyüzündeki bölge</h2>
          <p>{sign.astronomy}</p>
          <div className="my-6 rounded-2xl border border-white/10 bg-white/[.03] p-5">
            <p className="!m-0 flex items-center gap-2 text-sm font-bold !text-slate-100">
              <Star className="text-amber-200" size={18} />
              Öne çıkan yıldızlar
            </p>
            <p className="!mb-0">{sign.stars.join(" · ")}</p>
          </div>
          <h2>Tarihsel ve kültürel arka plan</h2>
          <p>{sign.history}</p>
          <h2>RealHoroscope sembolik okuması</h2>
          <p>{sign.interpretation}</p>
          <h2>Karakter analizi</h2>
          {sign.characterAnalysis.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="grid gap-4 md:grid-cols-3">
            <section className="rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <h3 className="!mt-0">Güneş’te</h3>
              <p>{sign.sun}</p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <h3 className="!mt-0">Ay’da</h3>
              <p>{sign.moon}</p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <h3 className="!mt-0">Yükselende</h3>
              <p>{sign.ascendant}</p>
            </section>
          </div>
          <h2>Üç yerleşimde aynı anlamı taşımaz</h2>
          <p>
            {sign.name} Güneş’te yaşam yönünü ve iradeyi, Ay’da güven ihtiyacını
            ve duygusal refleksi, yükselende ise yeni durumlara giriş biçimini
            anlatır. Aynı {sign.name} adı bir haritada iki kez görünse bile
            yorumun görevi değişir. Bu nedenle sonuç ekranındaki öneriler
            yerleşime göre ayrı hazırlanır; Güneş için hedef, Ay için ihtiyaç,
            yükselen için davranış biçimi ele alınır.
          </p>
          <h2>Dengeleyici soru</h2>
          <p>{sign.balance}</p>
          <h2>Sık sorulanlar</h2>
          {sign.questions.map((item) => (
            <section key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </section>
          ))}
          <h2>Kaynak ve yöntem notu</h2>
          <p>
            Konum hesabı {sources[0].name} ile yapılır; takımyıldız adı modern
            IAU bölgelerini ifade eder. Yorum bölümleri RealHoroscope’un
            kültürel ve sembolik editoryal çalışmasıdır, bilimsel kişilik
            değerlendirmesi değildir.
          </p>
        </div>
        <footer className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <Link
            href={`/burclar/${prev.slug}`}
            className="flex items-center gap-2 text-sm text-slate-300"
          >
            <ArrowLeft size={17} />
            {prev.name}
          </Link>
          <Link
            href={`/burclar/${next.slug}`}
            className="flex items-center gap-2 text-sm text-slate-300"
          >
            {next.name}
            <ArrowRight size={17} />
          </Link>
        </footer>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
