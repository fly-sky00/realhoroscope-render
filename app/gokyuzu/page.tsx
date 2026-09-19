import type { Metadata } from "next";
import { FullLink as Link } from "@/components/full-link";
import { CalendarDays, Moon, Sun } from "lucide-react";
import { currentSky, sunTransitions } from "@/lib/astro";

export const metadata: Metadata = {
  title: "Bugünün Gerçek Gökyüzü",
  description: "Güneş ve Ay'ın güncel IAU takımyıldız konumunu, Ay fazını ve yıllık Güneş geçişlerini görün.",
  alternates: { canonical: "/gokyuzu" },
};

const dateFormat = new Intl.DateTimeFormat("tr-TR", { dateStyle: "long", timeZone: "UTC" });

export default function SkyPage() {
  const now = new Date();
  const sky = currentSky(now);
  const transitions = sunTransitions(now.getUTCFullYear());
  return <main id="ana-icerik" className="page-main"><div className="site-shell">
    <header className="max-w-3xl"><p className="eyebrow">UTC {now.toISOString().slice(11,16)} · {dateFormat.format(now)}</p><h1 className="display mt-3 text-4xl sm:text-6xl">Bugünün gerçek gökyüzü</h1><p className="lede mt-5">Bu ekran sabit burç tarihlerini değil, hesaplama anındaki astronomik koordinatları IAU takımyıldız sınırlarıyla eşleştirir.</p></header>
    <section className="mt-9 grid gap-4 md:grid-cols-3">
      <article className="panel p-6"><Sun className="text-amber-200"/><p className="mt-6 text-sm text-slate-400">Güneşin bulunduğu bölge</p><p className="display mt-2 text-4xl">{sky.sun.glyph} {sky.sun.name}</p><p className="mt-2 text-sm text-slate-400">{sky.sun.latin} · IAU: {sky.sun.iau}</p></article>
      <article className="panel p-6"><Moon className="text-cyan-200"/><p className="mt-6 text-sm text-slate-400">Ayın bulunduğu bölge</p><p className="display mt-2 text-4xl">{sky.moon.glyph} {sky.moon.name}</p><p className="mt-2 text-sm text-slate-400">{sky.moon.latin} · IAU: {sky.moon.iau}</p></article>
      <article className="panel p-6"><CalendarDays className="text-violet-200"/><p className="mt-6 text-sm text-slate-400">Ay fazı</p><p className="display mt-2 text-3xl">{sky.phaseName}</p><p className="mt-2 text-sm text-slate-400">Faz açısı: {sky.phase.toFixed(1)}°</p></article>
    </section>
    <section className="mt-12 grid gap-7 lg:grid-cols-[1.15fr_.85fr]"><div className="panel overflow-hidden"><div className="border-b border-white/10 p-6"><p className="eyebrow">{now.getUTCFullYear()} geçiş takvimi</p><h2 className="display mt-2 text-3xl">Güneş hangi bölgeye ne zaman geçiyor?</h2></div><div className="divide-y divide-white/8">{transitions.map((item)=><div key={item.date.toISOString()} className="grid gap-2 p-5 sm:grid-cols-[10rem_1fr] sm:items-center"><time className="font-bold text-cyan-100">{dateFormat.format(item.date)}</time><p className="text-slate-300"><span className="text-slate-500">{item.from.name}</span> → <strong>{item.to.glyph} {item.to.name}</strong><span className="ml-2 text-xs text-slate-500">yaklaşık {item.date.toISOString().slice(11,16)} UTC</span></p></div>)}</div></div><aside className="prose"><h2>Bu sonuç neden klasik takvimden farklı?</h2><p>Tropikal astrolojide zodyak, ilkbahar ekinoksundan başlayan on iki eşit 30 derecelik dilime ayrılır. Bu sayfadaki astronomik görünüm ise gökyüzündeki eşit olmayan IAU bölgelerini kullanır.</p><p>Bu nedenle Güneşin astronomik takımyıldız konumu ile yaygın gazete burcu aynı olmak zorunda değildir. Bugünkü tropikal karşılık <strong>{sky.tropical}</strong> iken astronomik bölge <strong>{sky.sun.name}</strong>.</p><h2>Güncellik notu</h2><p>Değerler sayfa oluşturulduğu anda hesaplanır. Bu ekran gökyüzü konumlarını gösterir. Teleskopla gözlem yaparken hava durumu ve ufkun önündeki engeller ayrıca değerlendirilir.</p><Link href="/yontem" className="font-bold">Hesaplama yöntemini incele →</Link></aside></section>
  </div></main>;
}
