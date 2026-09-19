import { eclipticPlacement } from './chart-sky';
import { signByIau } from './zodiac-data';
import type { BirthSkyResult } from './astro';

// Preserve the astronomical result. Only the editorial profile falls back to
// the ecliptic projection when the true direction lies outside our 13 profiles.
export function readingPlacement(p:{iau:string;name:string;longitude?:number},utc:string){
  if(signByIau[p.iau] || p.longitude===undefined)return {...p,projected:false};
  const flat=eclipticPlacement(new Date(utc),p.longitude,0);
  return {...flat,projected:true,actualName:p.name};
}
export function readingResult(result:BirthSkyResult):BirthSkyResult {
  return {...result,moon:{...result.moon,...readingPlacement(result.moon,result.utc)}};
}
export function projectionNote(p:{iau:string;name:string;longitude?:number},utc:string){
  const reading=readingPlacement(p,utc);
  return reading.projected?`Gerçek gökyüzü bölgesi ${p.name}. Bu bölge için geleneksel bir burç profili atamıyoruz; sembolik yorumda ekliptik izdüşümünün düştüğü ${reading.name} profilini kullanıyoruz.`:'';
}
