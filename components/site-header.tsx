/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { Menu, Telescope, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["/", "Hesapla"], ["/burclar", "13 Takımyıldız"], ["/gokyuzu", "Bugünün Göğü"], ["/burc-uyumu", "Uyum"], ["/gorsel-aks", "Aks Nedir?"], ["/rehber", "Rehber"], ["/yontem", "Yöntem"], ["/hakkimizda", "Hakkımızda"]];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[#080a15]/90 backdrop-blur-xl"><div className="site-shell flex min-h-18 items-center justify-between gap-5"><a href="/" className="focus-ring flex items-center gap-3 rounded-lg" onClick={() => setOpen(false)}><span className="grid size-10 place-items-center rounded-full border border-violet-300/30 bg-violet-300/10 text-violet-200"><Telescope size={20}/></span><span><strong className="display block text-[1.05rem] font-normal">RealHoroscope</strong><span className="block text-[.65rem] font-bold tracking-[.17em] text-cyan-200/75">13’LÜ GÖKYÜZÜ ATLASI</span></span></a><button type="button" className="focus-ring rounded-lg border border-white/15 p-2.5 xl:hidden" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button><nav aria-label="Ana menü" className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[72px] flex-col gap-1 border-b border-white/10 bg-[#0b0d1b] p-4 xl:static xl:flex xl:flex-row xl:border-0 xl:bg-transparent xl:p-0`}>{links.map(([href, label]) => { const active = href === "/" ? pathname === "/" : pathname.startsWith(href); return <a key={href} href={href} onClick={() => setOpen(false)} className={`focus-ring rounded-full px-3 py-2 text-sm font-semibold transition ${active ? "bg-violet-300/14 text-violet-100" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>{label}</a>; })}</nav></div></header>;
}
