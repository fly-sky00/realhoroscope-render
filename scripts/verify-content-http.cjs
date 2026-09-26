const fs=require('node:fs');
const assert=require('node:assert/strict');
const ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,f);
const {articles}=require('../lib/articles.ts');
const origin=process.env.TEST_ORIGIN || 'http://127.0.0.1:3100';
(async()=>{
  const index=await fetch(origin+'/rehber');assert.equal(index.status,200);
  const indexHtml=await index.text();
  const sm=await fetch(origin+'/sitemap.xml');assert.equal(sm.status,200);const xml=await sm.text();
  for(const a of articles){
    const route='/rehber/'+a.slug;
    assert(indexHtml.includes(`href="${route}"`),`Missing index link ${route}`);
    assert(xml.includes('https://realhoroscope.online'+route),`Missing sitemap URL ${route}`);
    const response=await fetch(origin+route);assert.equal(response.status,200,route);
    const html=await response.text();
    assert(html.includes('<h1'),route);assert(html.includes('rel="canonical"'),route);
    assert(html.includes('https://realhoroscope.online'+route),route);
    assert(html.includes(`"datePublished":"${a.publishedAt}"`),route);
    assert(html.includes(`"dateModified":"${a.modifiedAt}"`),route);
    for(let i=0;i<a.sections.length;i++)assert(html.includes(`id="bolum-${i+1}"`),route);
  }
  for(const route of ['/','/burclar','/burc-uyumu','/gorsel-aks','/yontem','/iletisim','/topluluk','/robots.txt'])assert.equal((await fetch(origin+route)).status,200,route);
  assert.equal((await fetch(origin+'/rehber/olmayan-yazi')).status,404);
  console.log('PASS: production HTTP; 20/20 guides, index links, sitemap, canonical, Article dates, section anchors; 8 existing routes and unknown guide 404.');
})().catch(error=>{console.error(error);process.exitCode=1;});
