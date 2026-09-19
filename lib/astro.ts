import {
  AstroTime,
  Body,
  Constellation,
  Ecliptic, EquatorFromVector, GeoVector, RotateVector, Rotation_ECT_EQJ, Vector, e_tilt,
  MoonPhase,
  SiderealTime,
  SunPosition,
  Horizon, Observer, Rotation_ECT_EQD,
} from "astronomy-engine";
import { signByIau, zodiacSigns } from "./zodiac-data";

export type SkyPlacement = {
  name: string;
  latin: string;
  iau: string;
  glyph: string;
  emoji: string;
  longitude?: number;
};

export type BirthSkyResult = {
  utc: string;
  latitude: number;
  longitude: number;
  sun: SkyPlacement;
  moon: SkyPlacement;
  ascendant: SkyPlacement;
  descendant: SkyPlacement;
  sunOpposite: SkyPlacement;
  moonPhase: number;
};

const deg2rad = (deg: number) => (deg * Math.PI) / 180;
const rad2deg = (rad: number) => (rad * 180) / Math.PI;
export const wrap360 = (angle: number) => ((angle % 360) + 360) % 360;

function eclipticToEquatorial(lambdaDeg: number, betaDeg: number, date: Date) {
  const lambda = deg2rad(lambdaDeg);
  const beta = deg2rad(betaDeg);
  return EquatorFromVector(RotateVector(Rotation_ECT_EQJ(date),new Vector(Math.cos(lambda)*Math.cos(beta),Math.sin(lambda)*Math.cos(beta),Math.sin(beta),new AstroTime(date))));
}

function placement(iau: string, fallbackName: string, longitude?: number): SkyPlacement {
  const sign = signByIau[iau];
  return sign
    ? { name: sign.name, latin: sign.latin, iau, glyph: sign.glyph, emoji: sign.emoji, longitude }
    : { name: fallbackName, latin: fallbackName, iau, glyph: "✦", emoji: "✦", longitude };
}

export function calculateAscendant(date: Date, latitude: number, longitude: number) {
  const thetaL = wrap360(SiderealTime(date) * 15 + longitude);
  const epsilon = deg2rad(e_tilt(new AstroTime(date)).tobl);
  const theta = deg2rad(thetaL);
  const phi = deg2rad(latitude);
  let lambda = rad2deg(
    Math.atan2(
      -Math.cos(theta),
      Math.sin(theta) * Math.cos(epsilon) + Math.tan(phi) * Math.sin(epsilon),
    ),
  );
  lambda = wrap360(lambda + 180);
  // At polar latitudes the algebraic branch can point west. Select the
  // eastern horizon intersection explicitly in equator-of-date coordinates.
  const l = deg2rad(lambda);
  const eqd = EquatorFromVector(RotateVector(Rotation_ECT_EQD(date), new Vector(Math.cos(l), Math.sin(l), 0, new AstroTime(date))));
  const horizon = Horizon(date, new Observer(latitude, longitude, 0), eqd.ra, eqd.dec);
  if (Math.abs(Math.sin(deg2rad(horizon.azimuth))) < 1e-10) throw new Error('Bu anda doğu ufkunda tek bir yükselen yönü belirlenemiyor. Doğum saatinizi ve konumunuzu kontrol edin.');
  if (horizon.azimuth > 180) lambda = wrap360(lambda + 180);
  const eq = eclipticToEquatorial(lambda, 0, date);
  const constellation = Constellation(eq.ra, eq.dec);
  return { lambda, constellation };
}

export function calculateBirthSky(
  date: Date,
  latitude: number,
  longitude: number,
): BirthSkyResult {
  if (!Number.isFinite(date.getTime()) || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) >= 90 || Math.abs(longitude) > 180) throw new Error('Geçerli tarih ve koordinatlar gereklidir.');
  const time = new AstroTime(date);
  const sunEq = EquatorFromVector(GeoVector(Body.Sun,time,true));
  const sunConst = Constellation(sunEq.ra, sunEq.dec);
  const sunPos = Ecliptic(GeoVector(Body.Sun,time,true));

  const moonEq = EquatorFromVector(GeoVector(Body.Moon,time,true));
  const moonConst = Constellation(moonEq.ra, moonEq.dec);

  const asc = calculateAscendant(date, latitude, longitude);
  const descLongitude = wrap360(asc.lambda + 180);
  const descEq = eclipticToEquatorial(descLongitude, 0, date);
  const descConst = Constellation(descEq.ra, descEq.dec);

  const sunOppLongitude = wrap360(sunPos.elon + 180);
  const sunOppEq = eclipticToEquatorial(sunOppLongitude, -sunPos.elat, date);
  const sunOppConst = Constellation(sunOppEq.ra, sunOppEq.dec);

  return {
    utc: date.toISOString(),
    latitude,
    longitude,
    sun: placement(sunConst.symbol, sunConst.name, sunPos.elon),
    moon: placement(moonConst.symbol, moonConst.name, Ecliptic(GeoVector(Body.Moon,time,true)).elon),
    ascendant: placement(asc.constellation.symbol, asc.constellation.name, asc.lambda),
    descendant: placement(descConst.symbol, descConst.name, descLongitude),
    sunOpposite: placement(sunOppConst.symbol, sunOppConst.name, sunOppLongitude),
    moonPhase: MoonPhase(date),
  };
}

export function phaseLabel(angle: number) {
  if (angle < 11.25 || angle >= 348.75) return "Yeni Ay";
  if (angle < 78.75) return "Büyüyen Hilal";
  if (angle < 101.25) return "İlk Dördün";
  if (angle < 168.75) return "Büyüyen Şişkin Ay";
  if (angle < 191.25) return "Dolunay";
  if (angle < 258.75) return "Küçülen Şişkin Ay";
  if (angle < 281.25) return "Son Dördün";
  return "Küçülen Hilal";
}

export function tropicalSign(longitude: number) {
  const names = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
  return names[Math.floor(wrap360(longitude) / 30)];
}

export function currentSky(date = new Date()) {
  const time = new AstroTime(date);
  const sunEq = EquatorFromVector(GeoVector(Body.Sun,time,true));
  const moonEq = EquatorFromVector(GeoVector(Body.Moon,time,true));
  const sunConst = Constellation(sunEq.ra, sunEq.dec);
  const moonConst = Constellation(moonEq.ra, moonEq.dec);
  const sunLongitude = SunPosition(time).elon;
  const phase = MoonPhase(time);
  return {
    date,
    sun: placement(sunConst.symbol, sunConst.name, sunLongitude),
    moon: placement(moonConst.symbol, moonConst.name),
    phase,
    phaseName: phaseLabel(phase),
    tropical: tropicalSign(sunLongitude),
  };
}

export function sunTransitions(year: number) {
  const transitions: { date: Date; from: SkyPlacement; to: SkyPlacement }[] = [];
  let cursor = new Date(Date.UTC(year, 0, 1, 12));
  let previous = currentSky(cursor).sun;
  for (let day = 1; day <= 366; day += 1) {
    const next = new Date(Date.UTC(year, 0, 1 + day, 12));
    if (next.getUTCFullYear() > year) break;
    const active = currentSky(next).sun;
    if (active.iau !== previous.iau && zodiacSigns.some((sign) => sign.iau === active.iau)) {
      let low = cursor.getTime();
      let high = next.getTime();
      for (let i = 0; i < 18; i += 1) {
        const mid = new Date((low + high) / 2);
        if (currentSky(mid).sun.iau === previous.iau) low = mid.getTime();
        else high = mid.getTime();
      }
      transitions.push({ date: new Date(high), from: previous, to: active });
      previous = active;
    }
    cursor = next;
  }
  return transitions;
}

export function zonedLocalToUtc(localValue: string, timeZone: string, repeat: 'reject'|'earlier'|'later' = 'reject') {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(localValue)) throw new Error('Doğum tarihi ve saatini girin.');
  const target=Date.parse(localValue+':00Z');
  if(!Number.isFinite(target)||new Date(target).toISOString().slice(0,16)!==localValue) throw new Error('Geçerli bir tarih girin.');
  const fixed=/^UTC([+-])(\d{2}):(\d{2})$/.exec(timeZone);
  if(fixed){const minutes=Number(fixed[2])*60+Number(fixed[3]);if(Number(fixed[3])>59||minutes>840)throw new Error('Geçerli bir UTC farkı seçin.');return new Date(target-(fixed[1]==='-'?-minutes:minutes)*60000);}
  let format: Intl.DateTimeFormat;
  try { format=new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}); }
  catch { throw new Error('Geçerli bir IANA saat dilimi seçin (ör. Europe/Paris).'); }
  const rendered=(stamp:number)=>{const p=Object.fromEntries(format.formatToParts(new Date(stamp)).map(p=>[p.type,p.value]));return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);};
  const offsets=new Set<number>();
  for(let hour=-48;hour<=48;hour+=6){const stamp=target+hour*3600000;offsets.add(rendered(stamp)-stamp);}
  const matches=[...offsets].map(offset=>target-offset).filter(stamp=>rendered(stamp)===target).sort((a,b)=>a-b);
  if(!matches.length) throw new Error('Bu yerel saat, saatlerin ileri alınması nedeniyle yaşanmamış. Doğum kaydındaki saati kontrol edin.');
  if(matches.length>1&&repeat==='reject') throw new Error('Bu doğum saatinde iki farklı UTC karşılığı var. Kesin hesap için doğum kaydındaki UTC farkını saat dilimi listesinden seçin.');
  return new Date(repeat==='later'?matches[matches.length-1]:matches[0]);
}
