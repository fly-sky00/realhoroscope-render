"use client";
import { useId,useMemo,useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { chartSky, bodyRegionArc } from "@/lib/chart-sky";
import type { BirthSkyResult } from "@/lib/astro";
import { signByIau } from "@/lib/zodiac-data";
const point=(angle:number,r=218)=>({x:Number((300+Math.cos((angle-90)*Math.PI/180)*r).toFixed(5)),y:Number((300+Math.sin((angle-90)*Math.PI/180)*r).toFixed(5))});
export function ZodiacDiagram({compact=false,result,print=false}:{compact?:boolean;result?:BirthSkyResult;print?:boolean}){
  const sky=useMemo(()=>chartSky(result),[result]);
  const moonArcs=useMemo(()=>{const date=new Date(result?.utc??'2026-09-13T12:00:00Z');return [bodyRegionArc(date,sky.moon.longitude,sky.moon.latitude),bodyRegionArc(date,sky.dark.longitude,sky.dark.latitude)];},[result,sky]);
  const [axes,setAxes]=useState(true),[lunar,setLunar]=useState(false),[nodes,setNodes]=useState(false);
  const id=useId().replace(/:/g,"");
  const line=(angle:number,color:string,dashed=false)=>{const a=point(angle),b=point(angle+180);return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth="1.8" strokeDasharray={dashed?"5 6":undefined}/>;};
  const ray=(angle:number,color:string)=>{const p=point(angle);return <line x1="300" y1="300" x2={p.x} y2={p.y} stroke={color} strokeWidth="1.8"/>;};
  const marker=(angle:number,r:number,label:string,color:string,size=15)=>{const p=point(angle,r);return <g><circle cx={p.x} cy={p.y} r={size} fill="#11182b" stroke={color} strokeWidth="2"/><text x={p.x} y={p.y+5} textAnchor="middle" fill={color} fontSize="15" fontFamily="Arial, sans-serif">{label}</text></g>;};
  const lunarRay=(opposite=false)=>{const arc=moonArcs[opposite?1:0],p=point(arc.longitude,178),a=point(arc.start,178),b=point(arc.end,178);return <g aria-label={`${opposite?'Karanlık Ay':'Ay'}: ${arc.name} · gerçek enlemindeki bölge`}><path d={`M ${a.x} ${a.y} A 178 178 0 ${arc.end-arc.start>180?1:0} 1 ${b.x} ${b.y}`} fill="none" stroke={signByIau[arc.iau]?.accent??'#75d8e8'} strokeWidth="5" opacity=".8"/><line x1="300" y1="300" x2={p.x} y2={p.y} stroke="#75d8e8" strokeWidth="1.8" strokeDasharray={opposite?'4 5':undefined}/><circle cx={p.x} cy={p.y} r="4" fill="#d7f8ff"/></g>;};
  const entries=[
    {label:'Güneş',body:sky.sun,color:'#efcb78',radius:218},
    {label:'Ay',body:sky.moon,color:'#75d8e8',radius:178},
    {label:'Yükselen',body:sky.asc,color:'#c4a5ed',radius:218},
    ...(axes&&!print?[{label:'Gölge Aks',body:sky.shadow,color:'#efcb78',radius:218},{label:'Kök Aks',body:sky.desc,color:'#c4a5ed',radius:218}]:[]),
    ...(lunar&&!print?[{label:'Karanlık Ay',body:sky.dark,color:'#75d8e8',radius:178}]:[]),
    ...(nodes&&!print?[{label:'Kuzey düğüm',body:sky.north,color:'#a7c6a1',radius:218},{label:'Güney düğüm',body:sky.south,color:'#a7c6a1',radius:218}]:[]),
  ];
  const labels=[false,true].flatMap(right=>{
    const side=entries.map(e=>({...e,p:point(e.body.longitude,e.radius)})).filter(e=>(e.p.x>=300)===right).sort((a,b)=>a.p.y-b.p.y);
    const ys=side.map((e,i)=>Math.max(80+i*62,Math.min(520-(side.length-1-i)*62,e.p.y)));
    for(let i=1;i<ys.length;i++)ys[i]=Math.max(ys[i],ys[i-1]+62);
    return side.map((e,i)=>({...e,right,y:ys[i]}));
  });
  return <figure className={`zodiac-figure mx-auto w-full ${compact?"max-w-lg":"max-w-2xl"}`}>
    {!print&&<div className="no-print mb-2 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">{[["Akslar",axes,setAxes],["Ay Duygu Ekseni",lunar,setLunar],["Ay düğümleri",nodes,setNodes]].map(([label,value,set])=><label key={String(label)} className="flex cursor-pointer items-center gap-2"><Checkbox checked={Boolean(value)} onCheckedChange={v=>(set as (v:boolean)=>void)(v===true)}/>{String(label)}</label>)}</div>}
    <svg viewBox={print?"0 0 600 600":"-130 0 860 600"} role="img" aria-labelledby={id+"title"} className="h-auto w-full">
      <title id={id+"title"}>Dünya merkezli ekliptik haritası — gerçek dereceler ve karşıt eksenler</title>
      <defs><radialGradient id={id+"bg"}><stop stopColor="#202b47"/><stop offset="1" stopColor="#0c1020"/></radialGradient></defs>
      <circle cx="300" cy="300" r="286" fill={`url(#${id}bg)`} stroke="#a690bd" strokeOpacity=".18"/>
      {sky.segments.map((s,i)=>{const a=point(s.start),b=point(s.end),mid=(s.start+s.end)/2,label=point(mid,254),edge=point(s.start,232);return <g key={i}>
        <path d={`M ${a.x} ${a.y} A 218 218 0 ${s.end-s.start>180?1:0} 1 ${b.x} ${b.y}`} fill="none" stroke={signByIau[s.iau]?.accent??"#aaa"} strokeWidth="7" opacity={entries.some(e=>e.body.iau===s.iau)?".95":".28"}/>
        <line x1={a.x} y1={a.y} x2={edge.x} y2={edge.y} stroke="#c6cbe0" strokeOpacity=".45"/>
        {s.end-s.start>5&&<text x={label.x} y={label.y+4} textAnchor="middle" fill="#d4d9e9" fontSize="13">{s.name}</text>}
      </g>;})}

      {(axes&&!print)?<>{line(sky.sun.longitude,"#efcb78")}{line(sky.asc.longitude,"#c4a5ed")}</>:<>{ray(sky.sun.longitude,"#efcb78")}{ray(sky.asc.longitude,"#c4a5ed")}</>}
      {lunarRay()}{lunar&&!print&&lunarRay(true)}
      {nodes&&!print&&<>{line(sky.north.longitude,"#a7c6a1",true)}{marker(sky.north.longitude,218,"☊","#a7c6a1")}{marker(sky.south.longitude,218,"☋","#a7c6a1")}</>}
      {marker(sky.sun.longitude,143,"☀","#efcb78",19)}
      {marker(sky.moon.longitude,96,"☾","#75d8e8",16)}
      {print&&marker(sky.asc.longitude,202,"↑","#c4a5ed",13)}
      <circle cx="300" cy="300" r="30" fill="#12344b" stroke="#75d8e8" strokeWidth="1.5"/>
      <path d="M283 281 Q295 275 303 287 L300 298 292 303 289 314 281 305 277 291Z M308 300 Q322 294 324 306 L316 322 308 315 305 306Z" fill="#93cbb5"/>
      <text x="300" y="345" textAnchor="middle" fill="#b8ccdb" fontSize="12">DÜNYA</text>
      {!print&&labels.map(e=><g key={e.label} aria-label={`${e.label}: ${e.body.name}`}>
        <path d={`M ${e.p.x} ${e.p.y} L ${e.right?566:34} ${e.y} L ${e.right?582:18} ${e.y}`} fill="none" stroke={e.color} strokeWidth="1" opacity=".5"/>
        <circle cx={e.p.x} cy={e.p.y} r="4" fill={e.color}/>
        <text x={e.right?590:10} y={e.y-7} textAnchor={e.right?'start':'end'} fill={e.color} fontSize="16">{e.label}</text>
        <text x={e.right?590:10} y={e.y+17} textAnchor={e.right?'start':'end'} fill="#f1edf8" fontSize="20" fontWeight="600">{e.body.name}</text>
      </g>)}
    </svg>
    {!print&&<figcaption className="space-y-2 text-center text-sm text-slate-300">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left text-sm sm:grid-cols-3">{entries.map(e=><p key={e.label} className="border-l-2 pl-2" style={{borderColor:e.color}}><span className="block text-slate-400">{e.label}</span><strong className="font-medium text-slate-100">{e.body.name}</strong></p>)}</div>
      <p className="text-xs text-slate-500">{!result?"Örnek harita · ":""}Ekliptik izdüşüm · Uzaklık ve boyutlar ölçekli değildir.</p>
      <p className="text-xs text-slate-400">İçteki kısa yaylar Ay ve açıldığında Karanlık Ay’ın bölgelerini gösterir. İnce bağlantılar noktanın tam adını ve sonucunu gösterir.</p>
    </figcaption>}
  </figure>;
}
