// Run: node scripts/verify-calculations.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, file);
const A = require('astronomy-engine');
const { calculateBirthSky, calculateAscendant, wrap360, zonedLocalToUtc } = require('../lib/astro.ts');
const { chartSky } = require('../lib/chart-sky.ts');
const { pairReading, birthReading, printReading } = require('../lib/interpretations.ts');
const { zodiacSigns } = require('../lib/zodiac-data.ts');
const cities = require('../lib/turkey-cities.json');
let horizonChecks = 0;
for (const year of [1900, 1950, 2000, 2026, 2100]) for (const lat of [-85, -70, -34, 0, 41, 70, 85]) for (let hour = 0; hour < 24; hour++) {
  const date = new Date(Date.UTC(year, 5, 21, hour));
  const asc = calculateAscendant(date, lat, 29);
  const angle = asc.lambda * Math.PI / 180;
  const eq = A.EquatorFromVector(A.RotateVector(A.Rotation_ECT_EQD(date), new A.Vector(Math.cos(angle), Math.sin(angle), 0, new A.AstroTime(date))));
  const horizon = A.Horizon(date, new A.Observer(lat, 29, 0), eq.ra, eq.dec);
  assert(horizon.azimuth <= 180, `Expected eastern horizon: ${year}, ${lat}, ${hour}`);
  assert(Math.abs(horizon.altitude) < 1e-8, 'Ascendant must lie on geometric horizon');
  horizonChecks++;
}
for (const stamp of ['2000-01-01T12:00Z', '2024-04-08T18:00Z', '2026-09-13T12:00Z']) {
  const date = new Date(stamp), result = calculateBirthSky(date, 41, 29), sky = chartSky(result);
  for (const [placement, chart] of [[result.sun, sky.sun], [result.moon, sky.moon], [result.descendant, sky.desc], [result.sunOpposite, sky.shadow]]) assert.equal(placement.iau, chart.iau);
  assert(Math.abs(wrap360(sky.desc.longitude - sky.asc.longitude) - 180) < 1e-9, 'Kök Aks is opposite ascendant');
  assert(Math.abs(wrap360(sky.dark.longitude - sky.moon.longitude) - 180) < 1e-9);
  assert(Math.abs(wrap360(sky.north.longitude - sky.south.longitude) - 180) < 1e-9);
  const otherCity = calculateBirthSky(date, -33.86, 151.2);
  assert.equal(result.sun.iau, otherCity.sun.iau);
  assert.equal(result.moon.iau, otherCity.moon.iau);
  assert.notEqual(result.ascendant.longitude, otherCity.ascendant.longitude);
  assert.equal(birthReading(result).length, 7);
  assert(printReading(result).length < 950, 'Keep print summary bounded');
}
for (const [local, zone, utc] of [
  ['2000-01-01T12:00', 'Europe/Berlin', '2000-01-01T11:00:00.000Z'],
  ['2000-07-01T12:00', 'Europe/Berlin', '2000-07-01T10:00:00.000Z'],
  ['2000-01-01T12:00', 'Asia/Kathmandu', '2000-01-01T06:15:00.000Z'],
  ['2000-01-01T12:00', 'Australia/Sydney', '2000-01-01T01:00:00.000Z'],
  ['2000-07-01T12:00', 'America/New_York', '2000-07-01T16:00:00.000Z'],
  ['2000-01-01T12:00', 'America/Sao_Paulo', '2000-01-01T14:00:00.000Z'],
  ['2000-01-01T12:00', 'Africa/Johannesburg', '2000-01-01T10:00:00.000Z'],
  ['2000-01-01T12:00', 'Asia/Tokyo', '2000-01-01T03:00:00.000Z'],
  ['2024-11-03T01:30', 'UTC-04:00', '2024-11-03T05:30:00.000Z'],
  ['2024-11-03T01:30', 'UTC-05:00', '2024-11-03T06:30:00.000Z'],
]) assert.equal(zonedLocalToUtc(local, zone).toISOString(), utc);
assert.throws(() => zonedLocalToUtc('2024-03-10T02:30', 'America/New_York'));
assert.throws(() => zonedLocalToUtc('2024-11-03T01:30', 'America/New_York'));
assert.throws(() => zonedLocalToUtc('2000-02-30T12:00', 'Europe/Istanbul'));
assert.throws(() => calculateBirthSky(new Date(), 90, 0));
assert.equal(cities.length, 81);
assert.equal(new Set(cities.map(city => city.id)).size, 81);
for (const a of zodiacSigns) for (const b of zodiacSigns) { const reading = pairReading(a.iau, b.iau); assert(reading.practice); assert(!reading.text.includes('undefined')); }
const root = path.resolve(__dirname, '..');
for (const directory of ['app', 'components', 'lib']) for (const file of fs.readdirSync(path.join(root, directory), { recursive: true })) {
  if (!/\.(ts|tsx)$/.test(file)) continue;
  const source = fs.readFileSync(path.join(root, directory, file), 'utf8');
  assert(!/alçalan|Kök Aks’ın karşı ucu|Kök Aks karşı ucu/i.test(source), `Obsolete label in ${file}`);
}
console.log(`PASS: ${horizonChecks} horizon cases, UTC/DST, opposite axes, 81 cities, 169 pairs, print summaries and terminology.`);
const {bodyRegionArc,eclipticPlacement}=require('../lib/chart-sky.ts');
const {readingPlacement}=require('../lib/reading-placement.ts');
const {growthReading,socialReading,compatibilityReading}=require('../lib/interpretations.ts');
for(const stamp of ['2026-01-27T12:00Z','2026-02-08T12:00Z','2026-02-26T12:00Z','2026-12-01T12:00Z']){
 const r=calculateBirthSky(new Date(stamp),41.0082,28.9784), sky=chartSky(r);
 for(const p of [sky.moon,sky.dark]){const arc=bodyRegionArc(new Date(stamp),p.longitude,p.latitude);assert.equal(arc.iau,p.iau);assert(arc.start<p.longitude&&arc.end>p.longitude);assert.notEqual(eclipticPlacement(new Date(stamp),arc.end+.001,p.latitude).iau,p.iau);assert(zodiacSigns.some(s=>s.iau===readingPlacement(p,r.utc).iau));}
 assert(!birthReading(r).some(p=>p.text.includes('özel bir yorum profili bulunmuyor')));
 const practices=birthReading(r).map(item=>item.practice).filter(Boolean);assert.equal(new Set(practices).size,practices.length,'Every birth-reading action must be context-specific');
 assert(printReading(r).length<950);assert(growthReading(r).length<650);assert(socialReading(r).length<450);
 assert.equal(r.moon.iau,sky.moon.iau,'Interpretation must not mutate the astronomical result');
 assert.equal(compatibilityReading(r,r).length,10);
}
const sameBase=calculateBirthSky(new Date('1990-07-15T12:30:00Z'),48.8566,2.3522);
const sameSunAsc={...sameBase,ascendant:{...sameBase.sun}};
const sameActions=birthReading(sameSunAsc).map(item=>item.practice).filter(Boolean);
assert.equal(new Set(sameActions).size,sameActions.length,'Sun and ascendant repetition must still produce different actions');
// Verify that the PostgreSQL migration and atomic upsert remain present.
const migration=fs.readFileSync(path.join(root,'drizzle/0000_sharp_lady_ursula.sql'),'utf8');
const guard=fs.readFileSync(path.join(root,'lib/form-guard.ts'),'utf8');
assert(migration.includes('CREATE TABLE "form_limits"'));
assert(migration.includes('timestamp with time zone'));
assert(guard.includes('ON CONFLICT (key) DO UPDATE SET'));
assert(guard.includes('RETURNING count, window_start'));
console.log('PASS: lunar latitude arcs, out-of-zodiac interpretation, bounded sharing text, context-specific compatibility and atomic rate counter.');
