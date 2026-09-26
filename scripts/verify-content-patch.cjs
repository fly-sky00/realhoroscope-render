// Run independently; no database or secrets required.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,file);
const { articles, articleBySlug } = require('../lib/articles.ts');
const { additionalArticles } = require('../lib/articles-expanded.ts');
const { rootIntegration } = require('../lib/root-integration.ts');
const { zodiacSigns } = require('../lib/zodiac-data.ts');
const { calculateBirthSky } = require('../lib/astro.ts');
const { readingPlacement } = require('../lib/reading-placement.ts');
const { birthReading, growthReading, socialReading, printReading } = require('../lib/interpretations.ts');
assert(articles.length >= 20);
assert.equal(additionalArticles.length,12);
assert.equal(new Set(articles.map(a=>a.slug)).size,articles.length);
assert.equal(new Set(articles.map(a=>a.title)).size,articles.length);
const paragraphs = new Set();
for(const a of additionalArticles) {
  const words=a.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length;
  assert(words>=250, `${a.slug}: ${words} words`);
  assert(a.sections.length>=4);
  assert(a.sources?.length && a.related?.length);
  for(const slug of a.related) assert(articleBySlug[slug],`Broken relation ${slug}`);
  for(const s of a.sections) for(const p of s.paragraphs){assert(!paragraphs.has(p),`Duplicate paragraph: ${a.slug}`);paragraphs.add(p);}
  assert.equal(articleBySlug[a.slug].publishedAt,'2026-09-26');
  assert.equal(articleBySlug[a.slug].modifiedAt,'2026-09-26');
}
const texts = new Set(), practices = new Set();
for(const sign of zodiacSigns) {
  const special=rootIntegration(sign.iau,sign.iau);
  const other=zodiacSigns.find(s=>s.iau!==sign.iau);
  assert(special.same);
  assert(special.text.includes('Güneşiniz ile Kök Aks’ınız aynı burçta'));
  assert(special.text.includes('bilinçli'));
  assert(!rootIntegration(sign.iau,other.iau).same);
  assert(!rootIntegration(sign.iau,other.iau).text.includes('Güneşiniz ile Kök Aks’ınız aynı'));
  texts.add(special.text);practices.add(special.practice);
}
assert.equal(texts.size,13);assert.equal(practices.size,13);
let matched=0, unmatched=0;
for(let month=0;month<12;month++) for(let hour=0;hour<24;hour++) {
  const raw=calculateBirthSky(new Date(Date.UTC(2026,month,15,hour)),41.0082,28.9784);
  const snapshot=JSON.stringify(raw);
  const same=readingPlacement(raw.descendant,raw.utc).iau===raw.sun.iau;
  const cards=birthReading(raw),root=cards.find(c=>c.title.startsWith('Kök Aks'));
  assert.equal(root.text.includes('Güneşiniz ile Kök Aks’ınız aynı'),same);
  assert.equal(growthReading(raw).includes('Güneş ve Kök Aks aynı'),same);
  assert.equal(socialReading(raw).includes('Güneş ve Kök Aks aynı'),same);
  assert(growthReading(raw).length<650,'PDF growth summary length');
  assert(socialReading(raw).length<450,'Social summary length');
  assert(printReading(raw).length<950,'PDF summary length');
  assert.equal(JSON.stringify(raw),snapshot,'Do not mutate calculation');
  if(same)matched++;else unmatched++;
}
assert(matched>0 && unmatched>0);
assert(!rootIntegration('UNKNOWN','UNKNOWN').same);
console.log(`PASS: ${articles.length} guides, unique paragraphs, valid links/dates; 13 unique root interpretations/actions; 288 charts (${matched} Sun/root matches, ${unmatched} nonmatches); unchanged calculations and bounded PDF/social text.`);
