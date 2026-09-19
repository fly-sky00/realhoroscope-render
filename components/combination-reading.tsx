"use client";
import { useMemo } from 'react';
import type { BirthSkyResult } from '@/lib/astro';
import { birthReading, type Reading } from '@/lib/interpretations';
export function ReadingCards({readings}:{readings:Reading[]}){return <div className="mt-3 space-y-2">{readings.map((r,i)=><details key={r.title} open={i===0} className="rounded-xl border border-white/10 bg-white/[.025] p-4"><summary className="cursor-pointer text-sm font-semibold text-violet-100">{r.title}</summary><p className="mt-3 text-sm leading-relaxed text-slate-300">{r.text}</p>{r.practice&&<p className="mt-3 border-l-2 border-cyan-200/40 pl-3 text-sm text-cyan-100"><b>Deneyebileceğiniz adım:</b> {r.practice}</p>}</details>)}</div>;}
export function CombinationReading({result}:{result:BirthSkyResult}){const readings=useMemo(()=>birthReading(result),[result]);return <section className="mt-5"><h3 className="display text-2xl">Yerleşimleriniz birlikte ne anlatıyor?</h3><p className="mt-2 text-xs text-slate-400">Hesaplanan yerleşimlere göre otomatik seçilen sembolik yorumlar. Kişilik ölçümü değildir; aynı yerleşimler aynı açıklamayı üretir.</p><ReadingCards readings={readings}/></section>;}
