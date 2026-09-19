"use client";

import { useState } from "react";
import { Clipboard, Link2, LoaderCircle, MapPin, MessageCircle, Printer, RotateCcw, Share2, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BirthFields } from "@/components/birth-fields";
import { initialBirth, resolveBirth } from "@/lib/birth-input";
import { CombinationReading } from "@/components/combination-reading";

import { LunarDetails } from "@/components/lunar-details";
import { InstagramShare } from "@/components/instagram-share";
import { ZodiacDiagram } from "@/components/zodiac-diagram";
import { phaseLabel, tropicalSign, type BirthSkyResult } from "@/lib/astro";
import { signByIau } from "@/lib/zodiac-data";
import { emotionalReading, growthReading, socialReading, printReading } from "@/lib/interpretations";

function ResultCard({ title, placement, note }: { title: string; placement: BirthSkyResult["sun"]; note: string }) {
  const sign = signByIau[placement.iau];
  return <article className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.12em] text-cyan-200/70">{title}</p><h3 className="display mt-2 text-2xl">{placement.glyph} {placement.name}</h3><p className="mt-1 text-sm text-violet-200">{placement.latin} · IAU {placement.iau}</p></div>{placement.longitude !== undefined && <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{placement.longitude.toFixed(2)}°</span>}</div><p className="mt-4 text-sm text-slate-300">{sign ? note : "Nokta, 13 ekliptik takımyıldızın dışındaki komşu bir IAU bölgesine düştü."}</p></article>;
}

function PrintSheet({ result, locationLabel, localDate, timeZone, preview = false }: { result: BirthSkyResult; locationLabel: string; localDate:string; timeZone:string; preview?: boolean }) {
  const date=localDate.slice(0,10).split('-').reverse().join('.');
  return <section className={`report-sheet ${preview ? "print-preview-sheet" : "print-sheet"}`} aria-hidden={!preview}>
    <header className="print-heading"><div><p className="print-brand">REALHOROSCOPE <span>DOĞUM ATLASI</span></p><h1>Gökyüzünüzün hikâyesi</h1><p>{locationLabel}</p></div><div className="print-meta"><b>{date}</b><span>{localDate.slice(11,16)} · Yerel saat</span><small>{timeZone.replaceAll('_',' ')}</small></div></header>
    <div className="print-layout"><div className="print-chart"><ZodiacDiagram compact result={result} print/></div><div className="print-summary">
      <div><small>GÜNEŞ</small><strong>{result.sun.name}</strong><span>Yaşam yönünüz</span></div>
      <div><small>AY</small><strong>{result.moon.name}</strong><span>Duygusal dünyanız</span></div>
      <div><small>YÜKSELEN</small><strong>{result.ascendant.name}</strong><span>Hayata yaklaşımınız</span></div>
    </div></div>
    <div className="print-note"><p className="print-section-title">Sizi bir araya getiren nitelikler</p><p>{printReading(result)}</p></div>
    <div className="print-axes"><div><small>KÖK AKS</small><strong>{result.descendant.name}</strong><span>Saklı potansiyeliniz</span></div><div><small>GÖLGE AKS</small><strong>{result.sunOpposite.name}</strong><span>Kendinizle yüzleşme</span></div></div>
    <div className="print-note print-emotional"><p className="print-section-title">Duygusal dengeniz</p><p>{emotionalReading(result)}</p></div>
    <div className="print-note print-growth"><p className="print-section-title">Dengenizi geliştiren yön</p><p>{growthReading(result)}</p></div>
    <footer><span>REALHOROSCOPE</span><span>Kişisel gökyüzü · Yorum</span></footer>
  </section>;
}

export function BirthCalculator() {
  const [birth, setBirth] = useState(initialBirth);
  const [result, setResult] = useState<BirthSkyResult | null>(null);
  const [locationLabel, setLocationLabel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareStatus,setShareStatus]=useState("");
  const [pdfOpen, setPdfOpen] = useState(false);

  async function calculate(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true); setError(""); setCopied(false);
    try {
      const resolved = resolveBirth(birth);
      setResult(resolved.result);
      setLocationLabel(resolved.label);
      setTimeout(() => document.getElementById("hesap-sonucu")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "Hesaplama tamamlanamadı.");
    } finally { setLoading(false); }
  }

  function summaryText() {
    if (!result) return "";
    return `Gökyüzümün hikâyesi · RealHoroscope\nGüneş ${result.sun.name} · Ay ${result.moon.name} · Yükselen ${result.ascendant.name}\n\n${socialReading(result)}`;
  }

  async function copySummary() {
    try { await navigator.clipboard.writeText(`${summaryText()}\n${window.location.origin}`); setCopied(true);setShareStatus("Sonucunuz kopyalandı."); }
    catch {setShareStatus("Panoya erişilemedi. Paylaşım kartını indirerek paylaşabilirsiniz.");}
  }

  function shareTo(network: "whatsapp" | "x" | "facebook") {
    const url = window.location.origin;
    const text = summaryText();
    const targets = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    };
    window.open(targets[network], "_blank", "noopener,noreferrer,width=720,height=640");
  }

  async function nativeShare() {
    if (!navigator.share) {await copySummary();return;}
    try {await navigator.share({ title: "Gökyüzümün hikâyesi", text: summaryText(), url: window.location.origin });setShareStatus("Paylaşım tamamlandı.");}
    catch(cause){setShareStatus(cause instanceof Error&&cause.name==="AbortError"?"Paylaşım iptal edildi.":"Paylaşım açılamadı. Kartı indirerek paylaşabilirsiniz.");}
  }

  return <section className="panel overflow-hidden" aria-labelledby="calculator-title">
    <div className="grid lg:grid-cols-[.86fr_1.14fr]">
      <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 text-cyan-200"><Sparkles size={17}/><span className="text-xs font-extrabold uppercase tracking-[.14em]">Doğum göğünü hesapla</span></div>
        <h2 id="calculator-title" className="display mt-3 text-3xl sm:text-4xl">Gerçek 13’lü zodyak hesabı</h2>
        <p className="mt-3 text-sm text-slate-300">Güneş, Ay ve ufuk noktanızı IAU takımyıldız bölgeleriyle eşleştirir. Şehir bulunamazsa sistem koordinat uydurmaz.</p>
        <form onSubmit={calculate} className="mt-6 grid gap-4">
          <BirthFields value={birth} onChange={value=>{setBirth(value);setResult(null);setError("");}}/>
          {error && <p role="alert" className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-3 text-sm text-rose-100">{error}</p>}
          <Button type="submit" size="lg" disabled={loading} className="mt-1 h-12 rounded-xl bg-violet-300 text-[#160b24] hover:bg-violet-200">{loading ? <><LoaderCircle className="animate-spin"/>Gökyüzü hesaplanıyor</> : <>Hesaplamayı başlat<Sparkles/></>}</Button>
        </form>
      </div>
      <div id="hesap-sonucu" className="scroll-mt-28 bg-[radial-gradient(circle_at_top_right,rgba(117,216,232,.1),transparent_45%)] p-5 sm:p-7">
        {!result ? <div className="flex min-h-[320px] flex-col items-center justify-center text-center"><div className="relative grid size-44 place-items-center rounded-full border border-violet-300/25 before:absolute before:inset-4 before:rounded-full before:border before:border-cyan-200/15 after:absolute after:inset-9 after:rounded-full after:border after:border-amber-200/20"><span className="text-5xl">⊕</span><span className="absolute -right-2 top-8 text-2xl text-amber-200">☀</span><span className="absolute bottom-7 left-1 text-xl text-cyan-100">☾</span></div><p className="display mt-7 text-2xl">Gökyüzü haritanız burada açılacak</p><p className="mt-2 max-w-sm text-sm text-slate-400">Sonuçlar hesaplama yöntemi, koordinatlar ve sembolik yorum ayrımıyla birlikte gösterilir.</p></div> : <div className="screen-result"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="eyebrow">Hesap tamamlandı</p><h2 className="display mt-2 text-3xl">Doğum göğünüz</h2><p className="mt-2 flex items-start gap-2 text-sm text-slate-400"><MapPin className="mt-1 size-4 shrink-0"/>{locationLabel}</p></div><div className="no-print flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" onClick={copySummary} className="border-white/15 bg-white/5"><Clipboard/>{copied ? "Kopyalandı" : "Kopyala"}</Button><Button type="button" variant="outline" size="sm" onClick={() => setPdfOpen(true)} className="border-white/15 bg-white/5"><Printer/>Tek sayfa PDF</Button><DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="outline" size="sm" className="border-white/15 bg-white/5"><Share2/>Paylaş</Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-52"><DropdownMenuLabel>Sonucunu paylaş</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem onClick={() => void nativeShare()}><Share2/>Telefon paylaşım menüsü</DropdownMenuItem><DropdownMenuItem onClick={() => shareTo("whatsapp")}><MessageCircle/>WhatsApp</DropdownMenuItem><DropdownMenuItem onClick={() => shareTo("x")}><span className="grid size-4 place-items-center font-black">X</span>X / Twitter</DropdownMenuItem><DropdownMenuItem onClick={() => shareTo("facebook")}><Users/>Facebook</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem onClick={() => void copySummary()}><Link2/>Metni ve bağlantıyı kopyala</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></div>
          <p role="status" className="mt-2 text-sm text-cyan-100">{shareStatus}</p><InstagramShare result={result}/><LunarDetails result={result}/><div className="mt-3 rounded-2xl border border-white/10 bg-black/10 p-3"><ZodiacDiagram compact result={result}/></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2"><ResultCard title="Güneş takımyıldızı" placement={result.sun} note={signByIau[result.sun.iau]?.sun ?? ""}/><ResultCard title="Ay takımyıldızı" placement={result.moon} note={signByIau[result.moon.iau]?.moon ?? ""}/><ResultCard title="Yükselen noktası" placement={result.ascendant} note={signByIau[result.ascendant.iau]?.ascendant ?? ""}/><article className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-cyan-200/70">Ay fazı</p><h3 className="display mt-2 text-2xl">{phaseLabel(result.moonPhase)}</h3><p className="mt-1 text-sm text-violet-200">Faz açısı {result.moonPhase.toFixed(1)}°</p><p className="mt-4 text-sm text-slate-300">Faz, Güneş ve Ay’ın açısal ilişkisini gösterir; Ay takımyıldızından farklı bir bilgidir.</p></article></div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2"><article className="rounded-2xl border border-violet-200/15 bg-violet-300/[.06] p-5"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-violet-200">Kök Aks · yükselenin karşısı</p><p className="display mt-2 text-xl">{result.descendant.name}</p><p className="mt-1 text-xs text-slate-400">Geçmiş deneyimlerinizle gelişen, yeniden keşfedilmeyi bekleyen yetenekleriniz.</p></article><article className="rounded-2xl border border-cyan-200/15 bg-cyan-300/[.05] p-5"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-cyan-200">Gölge Aks · Güneş’in karşısı</p><p className="display mt-2 text-xl">{result.sunOpposite.name}</p></article></div>
          <div className="mt-4 rounded-xl border border-white/8 bg-black/15 p-4 text-xs text-slate-400"><p><strong className="text-slate-200">Astronomik kayıt:</strong> {result.utc.replace("T", " ").replace(".000Z", " UTC")} · {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}</p><p className="mt-1"><strong className="text-slate-200">Tropikal karşılık:</strong> {tropicalSign(result.sun.longitude ?? 0)}. Bu değer mevsimsel 30° dilimdir.</p></div>
          <CombinationReading result={result}/>
          <Button type="button" variant="ghost" size="sm" onClick={() => setResult(null)} className="no-print mt-4 text-slate-400"><RotateCcw/>Yeni hesaplama</Button>
        </div>}
        {result && <PrintSheet result={result} locationLabel={locationLabel} localDate={birth.date} timeZone={birth.zone}/>}
        {result && <Dialog open={pdfOpen} onOpenChange={setPdfOpen}><DialogContent showCloseButton={false} className="pdf-dialog z-[100] !w-[min(96vw,820px)] !max-w-none max-h-[92dvh] overflow-y-auto border-white/15 bg-[#111427] p-3 sm:p-5"><DialogTitle>Gökyüzünüzün hikâyesi</DialogTitle><DialogDescription>Kısa kişisel yorumunuz · A4, tek sayfa</DialogDescription><div className="flex flex-wrap gap-2"><Button onClick={()=>window.print()}>Yazdır / PDF kaydet</Button><Button variant="outline" onClick={()=>setPdfOpen(false)}>Kapat</Button></div><div className="report-preview-wrap"><PrintSheet result={result} locationLabel={locationLabel} localDate={birth.date} timeZone={birth.zone} preview/></div></DialogContent></Dialog>}

      </div>
    </div>
  </section>;
}
