import { AstroTime, Body, Constellation, Ecliptic, EquatorFromVector, GeoVector, GeoMoonState, RotateVector, Rotation_EQJ_ECT, Rotation_ECT_EQJ, Vector } from "astronomy-engine";
import { wrap360, type BirthSkyResult } from "./astro";
import { signByIau } from "./zodiac-data";
export function eclipticPlacement(date: Date, longitude: number, latitude = 0) {
  const l=longitude*Math.PI/180,b=latitude*Math.PI/180;
  const v=new Vector(Math.cos(l)*Math.cos(b),Math.sin(l)*Math.cos(b),Math.sin(b),new AstroTime(date));
  const eq=EquatorFromVector(RotateVector(Rotation_ECT_EQJ(date),v));
  const c=Constellation(eq.ra,eq.dec);
  return {longitude:wrap360(longitude),latitude,iau:c.symbol,name:signByIau[c.symbol]?.name??c.name};
}
// The lunar track follows the body's actual ecliptic latitude, not beta=0.
export function bodyRegionArc(date: Date, longitude: number, latitude: number) {
  const current=eclipticPlacement(date,longitude,latitude);
  const edge=(direction:number)=>{
    let inside=longitude, outside=longitude;
    for(let step=1;step<=360;step++) {outside=longitude+direction*step;if(eclipticPlacement(date,outside,latitude).iau!==current.iau)break;inside=outside;}
    for(let i=0;i<18;i++){const mid=(inside+outside)/2;if(eclipticPlacement(date,mid,latitude).iau===current.iau)inside=mid;else outside=mid;}
    return (inside+outside)/2;
  };
  return {...current,start:edge(-1),end:edge(1)};
}
export function chartSky(result?: BirthSkyResult) {
  const date=new Date(result?.utc??"2026-09-13T12:00:00Z");
  const sun=Ecliptic(GeoVector(Body.Sun,date,true)),moon=Ecliptic(GeoVector(Body.Moon,date,true));
  // Instantaneous orbital plane n=r×v; ascending node k×n.
  const s=GeoMoonState(date),rot=Rotation_EQJ_ECT(date);
  const r=RotateVector(rot,new Vector(s.x,s.y,s.z,s.t)),v=RotateVector(rot,new Vector(s.vx,s.vy,s.vz,s.t));
  const nx=r.y*v.z-r.z*v.y,ny=r.z*v.x-r.x*v.z;
  const north=wrap360(Math.atan2(nx,-ny)*180/Math.PI),asc=result?.ascendant.longitude??280;
  const segments:{start:number;end:number;iau:string;name:string}[]=[];
  let previous=eclipticPlacement(date,0),start=0;
  for(let angle=1;angle<=360;angle++){
    const p=eclipticPlacement(date,angle===360?359.999999:angle);
    if(p.iau!==previous.iau){
      let lo=angle-1,hi=angle;
      for(let i=0;i<18;i++){const mid=(lo+hi)/2;if(eclipticPlacement(date,mid).iau===previous.iau)lo=mid;else hi=mid;}
      segments.push({start,end:hi,iau:previous.iau,name:previous.name});start=hi;previous=p;
    }
  }
  segments.push({start,end:360,iau:previous.iau,name:previous.name});
  if(segments.length>1&&segments[0].iau===segments[segments.length-1].iau){
    const first=segments.shift()!,last=segments.pop()!;
    segments.push({...last,end:first.end+360});
  }
  return {sun:eclipticPlacement(date,sun.elon,sun.elat),moon:eclipticPlacement(date,moon.elon,moon.elat),
    dark:eclipticPlacement(date,moon.elon+180,-moon.elat),asc:eclipticPlacement(date,asc),desc:eclipticPlacement(date,asc+180),
    shadow:eclipticPlacement(date,sun.elon+180,-sun.elat),north:eclipticPlacement(date,north),south:eclipticPlacement(date,north+180),segments};
}
