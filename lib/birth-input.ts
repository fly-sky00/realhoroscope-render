import cities from './turkey-cities.json';
import { calculateBirthSky, zonedLocalToUtc } from './astro';
export { cities };
export type BirthInput = { date: string; mode: 'tr'|'world'; city: string; country: string; zone: string; lat: string; lon: string; label: string; repeat: 'reject'|'earlier'|'later' };
export function initialBirth(): BirthInput { return {date:'',mode:'tr',city:'34',country:'',zone:'Europe/Istanbul',lat:'',lon:'',label:'',repeat:'reject'}; }
export function resolveBirth(input: BirthInput) {
  const city=input.mode==='tr'?cities.find(c=>c.id===input.city):null;
  const lat=city?.lat??Number(input.lat),lon=city?.lon??Number(input.lon);
  if(!city && (!input.lat.trim()||!input.lon.trim())) throw new Error('Doğum yerinin koordinatlarını girin veya şehir aramasından seçin.');
  if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>=90||Math.abs(lon)>180) throw new Error('Enlem −90 ile 90 arasında, boylam −180 ile 180 arasında olmalıdır.');
  if(!input.zone) throw new Error('Doğum yerinin saat dilimini seçin.');
  const utc=zonedLocalToUtc(input.date,input.zone,input.repeat);
  return {result:calculateBirthSky(utc,lat,lon),label:city?`${city.name}, Türkiye · il merkezi`:input.label||`${lat.toFixed(4)}, ${lon.toFixed(4)}`};
}
