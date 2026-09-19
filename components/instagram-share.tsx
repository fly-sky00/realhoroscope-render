"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { socialReading } from "@/lib/interpretations";
import type { BirthSkyResult } from "@/lib/astro";
export function InstagramShare({result}:{result:BirthSkyResult}){
 const [status,setStatus]=useState(""),[busy,setBusy]=useState(false),[card,setCard]=useState<{url:string;story:boolean}|null>(null);
 async function create(story:boolean){
  setBusy(true);setStatus("");
  try{
   await document.fonts.ready;
   const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=story?1920:1080;
   const c=canvas.getContext("2d");if(!c)throw Error("Görsel oluşturulamadı.");
   const g=c.createLinearGradient(0,0,1080,canvas.height);g.addColorStop(0,"#241a3c");g.addColorStop(.55,"#101629");g.addColorStop(1,"#08232e");c.fillStyle=g;c.fillRect(0,0,1080,canvas.height);
   const top=story?250:70, gap=story?70:0;
   c.textAlign="left";c.fillStyle="#c2a9e5";c.font="bold 24px sans-serif";c.fillText("REALHOROSCOPE",72,top);
   c.fillStyle="#f8f3ff";c.font="58px Georgia";c.fillText("Gökyüzümün hikâyesi",72,top+83);
   c.strokeStyle="#756183";c.lineWidth=1;c.beginPath();c.moveTo(72,top+124);c.lineTo(1008,top+124);c.stroke();
   const tile=(x:number,y:number,w:number,label:string,value:string,color:string)=>{
    c.fillStyle="rgba(255,255,255,.045)";c.beginPath();c.roundRect(x,y,w,150,18);c.fill();c.strokeStyle="rgba(214,195,237,.2)";c.stroke();
    c.fillStyle=color;c.font="bold 21px sans-serif";c.fillText(label,x+24,y+43);
    let size=38;c.font=size+"px Georgia";while(c.measureText(value).width>w-48&&size>22){size--;c.font=size+"px Georgia";}
    c.fillStyle="#f8f3ff";c.fillText(value,x+24,y+101);
   };
   tile(72,top+164+gap,296,"GÜNEŞ",result.sun.name,"#efcb78");tile(392,top+164+gap,296,"AY",result.moon.name,"#92dce5");tile(712,top+164+gap,296,"YÜKSELEN",result.ascendant.name,"#cfb4ef");
   tile(72,top+337+gap,456,"KÖK AKS",result.descendant.name,"#cfb4ef");tile(552,top+337+gap,456,"GÖLGE AKS",result.sunOpposite.name,"#efcb78");
   const y=top+550+gap*2;c.fillStyle="#b8a4d0";c.font="bold 22px sans-serif";c.fillText("SİZİ ANLATAN NİTELİKLER",72,y);
   c.fillStyle="#e4e4ed";c.font=(story?34:29)+"px sans-serif";
   const lineHeight=story?51:43,maxWidth=936;let line="",lineY=y+55;
   for(const word of socialReading(result).split(" ")){const candidate=line?line+" "+word:word;if(c.measureText(candidate).width>maxWidth&&line){c.fillText(line,72,lineY);lineY+=lineHeight;line=word;}else line=candidate;}
   if(line)c.fillText(line,72,lineY);
   const footer=story?1640:1010;c.strokeStyle="#756183";c.beginPath();c.moveTo(72,footer-42);c.lineTo(1008,footer-42);c.stroke();
   c.fillStyle="#afa6bf";c.font="21px sans-serif";c.fillText("Kişisel gökyüzü · Yorum",72,footer);c.textAlign="right";c.fillText("RealHoroscope",1008,footer);
   setCard({url:canvas.toDataURL("image/png"),story});setStatus("Kartınız hazır. İndirebilir veya telefonunuzdan paylaşabilirsiniz.");
  }catch{setStatus("Kart hazırlanamadı. Lütfen yeniden deneyin.");}finally{setBusy(false);}
 }
 function download(){if(!card)return;const a=document.createElement('a');a.href=card.url;a.download=card.story?'realhoroscope-hikaye.png':'realhoroscope-gonderi.png';a.click();setStatus("Kart indirildi. Instagram veya diğer uygulamalarda yükleyebilirsiniz.");}
 async function share(){
  if(!card)return;
  try{const blob=await (await fetch(card.url)).blob();const file=new File([blob],card.story?'realhoroscope-hikaye.png':'realhoroscope-gonderi.png',{type:'image/png'});
   if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({files:[file],title:'Gökyüzümün hikâyesi'});setStatus("Paylaşım tamamlandı.");}else download();
  }catch(e){setStatus(e instanceof Error&&e.name==='AbortError'?'Paylaşım iptal edildi.':'Paylaşım açılamadı. Görseli indirip yükleyebilirsiniz.');}
 }
 return <details className="no-print mt-3 text-sm"><summary className="cursor-pointer text-violet-200 font-semibold">Instagram ve sosyal paylaşım kartı</summary><div className="mt-3 flex flex-wrap gap-2"><Button disabled={busy} type="button" variant="outline" onClick={()=>void create(false)}>Kare gönderi</Button><Button disabled={busy} type="button" variant="outline" onClick={()=>void create(true)}>Hikâye</Button></div>{card&&<div className="mt-4 space-y-3"><img src={card.url} alt="Kısa yorumunuz ve yerleşimlerinizle kişisel paylaşım kartı" className="mx-auto h-auto max-w-full rounded-2xl border border-white/15" style={{width:card.story?270:480}} width={1080} height={card.story?1920:1080}/><div className="flex flex-wrap justify-center gap-2"><Button onClick={download}>Görseli indir</Button><Button variant="outline" onClick={()=>void share()}>Kartı paylaş</Button></div></div>}<p className="mt-2 text-slate-400">Doğum tarihi ve konum paylaşım kartına eklenmez. Instagram’a indirdiğiniz kartı yükleyebilirsiniz.</p><p role="status" className="mt-2 text-cyan-100">{status}</p></details>;
}
