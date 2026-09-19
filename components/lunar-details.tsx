"use client";
import { useMemo } from "react";
import { chartSky } from "@/lib/chart-sky";
import { signByIau } from "@/lib/zodiac-data";
import type { BirthSkyResult } from "@/lib/astro";
import { projectionNote } from '@/lib/reading-placement';
export function LunarDetails({result}:{result:BirthSkyResult}){
  const sky=useMemo(()=>chartSky(result),[result]);
  return <details className="mt-3 rounded-xl border border-cyan-200/15 bg-cyan-200/[.035] p-4">
    <summary className="cursor-pointer font-semibold text-cyan-100">Ay Duygu Ekseni ve Ay düğümleri</summary>
    <div className="mt-3 space-y-3 text-sm text-slate-300">
      <p><b>Ay: {sky.moon.name}</b> · {sky.moon.longitude.toFixed(2)}°<br/>{signByIau[sky.moon.iau]?.moon??"Ay bu IAU bölgesinde bulunuyor."}</p>
      <p><b>Karanlık Ay: {sky.dark.name}</b> · {sky.dark.longitude.toFixed(2)}°<br/>Ay'ın tam karşıt yönü; bu sitedeki sembolik modelde alışılmış duygusal yapının zıddını, yüzleşme ve gelişim sınavını temsil eder. {signByIau[sky.dark.iau]?.moon??""}</p>
      <p><b>☊ Kuzey Ay Düğümü: {sky.north.name}</b> · {sky.north.longitude.toFixed(2)}°<br/><b>☋ Güney Ay Düğümü: {sky.south.name}</b> · {sky.south.longitude.toFixed(2)}°</p>
      <p>Ay düğümleri, anlık Ay yörünge düzlemi ile ekliptiğin kesişimidir; ortalama düğüm değil anlık yörünge düğümü kullanılır. Karanlık Ay ise Ay'ın karşıt noktasıdır: Lilith/Ay apojesi, yeniay veya Ay düğümü değildir.</p>
      <p className="text-slate-400">Karanlık Ay ve sınav anlatımı RealHoroscope'un sembolik yorumudur; gelecekte yaşanacak olayların bilimsel tahmini değildir.</p>
      {[sky.moon,sky.dark].map(p=>projectionNote(p,result.utc)).filter(Boolean).map(note=><p key={note} className="text-cyan-100">{note}</p>)}
    </div>
  </details>;
}
