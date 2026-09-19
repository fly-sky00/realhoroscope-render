import { rootReadings } from './root-readings';
import { signByIau } from './zodiac-data';
import { readingPlacement, readingResult } from './reading-placement';
import { chartSky } from './chart-sky';
import type { BirthSkyResult } from './astro';
type Profile={need:string;gift:string;risk:string;practice:string;pace:'hızlı'|'ölçülü'|'esnek'};
// Editorial symbolic profiles, not astronomical properties or measured personality traits.
const profiles:Record<string,Profile>={
 Ari:{need:'bağımsızlık ve girişim özgürlüğü',gift:'ilk adımı atmak',risk:'acele kararlarla karşı tarafın sözünü kesmek',practice:'Harekete geçmeden önce beklentinizi tek cümleyle söyleyin.',pace:'hızlı'},
 Tau:{need:'güven ve süreklilik',gift:'verilen sözü somut davranışla desteklemek',risk:'değişimi güvensizlik gibi okumak',practice:'Birlikte değiştirebileceğiniz küçük bir alışkanlık seçin.',pace:'ölçülü'},
 Gem:{need:'merak ve karşılıklı konuşma',gift:'bir soruna farklı yollar bulmak',risk:'duyguyu açıklarken hissetmeye yer bırakmamak',practice:'Çözüm önermeden önce duyduğunuz duyguyu tekrar edin.',pace:'esnek'},
 Cnc:{need:'yakınlık ve duygusal güven',gift:'incelikli ihtiyaçları fark etmek',risk:'beklentiyi söylemeden anlaşılmayı beklemek',practice:'İhtiyacınızı ima yerine açık bir rica olarak anlatın.',pace:'ölçülü'},
 Leo:{need:'görülme ve içten takdir',gift:'birlikte yapılan işe sıcaklık katmak',risk:'eleştiriyi değerinin reddi gibi duymak',practice:'Takdir beklediğiniz davranışı somutlaştırın ve karşı tarafı da dinleyin.',pace:'hızlı'},
 Vir:{need:'düzen ve işe yarama',gift:'karmaşık bir durumu uygulanabilir adımlara bölmek',risk:'yardım ederken sürekli düzeltmeye yönelmek',practice:'Öneri vermeden önce yardım istenip istenmediğini sorun.',pace:'ölçülü'},
 Lib:{need:'karşılıklılık ve adil anlaşma',gift:'iki tarafın bakışını aynı masaya getirmek',risk:'huzuru korumak için kendi isteğini ertelemek',practice:'Uzlaşmadan önce kendi tercihinizi açıkça belirtin.',pace:'esnek'},
 Sco:{need:'derinlik ve güvenilir bağ',gift:'yüzeyde kalmış bir konuyu dürüstçe ele almak',risk:'belirsizlikte karşı tarafı sınamaya başlamak',practice:'Şüpheyi gizli bir test yerine doğrudan soruya çevirin.',pace:'ölçülü'},
 Oph:{need:'anlamlı dönüşüm ve onarım',gift:'krizden öğrenilecek bir yol çıkarmak',risk:'her sorunu çözme sorumluluğunu üstlenmek',practice:'Destek sunarken size ait olmayan sorumluluğu geri bırakın.',pace:'esnek'},
 Sgr:{need:'özgürlük ve yeni ufuklar',gift:'daralan bir konuşmaya umut ve perspektif getirmek',risk:'özgürlük ararken verilen sözü hafife almak',practice:'Kendi alanınızla ortak sorumluluğunuzun sınırını birlikte belirleyin.',pace:'hızlı'},
 Cap:{need:'sorumluluk ve sağlam bir yön',gift:'uzun vadeli hedefe istikrarlı emek vermek',risk:'duygusal ihtiyacı görev listesine dönüştürmek',practice:'Bir görüşmeyi çözüm üretmeden yalnızca dinlemeye ayırın.',pace:'ölçülü'},
 Aqr:{need:'özgünlük ve kişisel alan',gift:'alışılmış düzenin dışında bir seçenek görmek',risk:'mesafe ihtiyacını açıklamadan geri çekilmek',practice:'Yalnız kalma ihtiyacınızı, yeniden görüşeceğiniz zamanı da söyleyerek anlatın.',pace:'esnek'},
 Psc:{need:'empati ve hayal kurma alanı',gift:'söylenmeyen duygulara şefkatle yaklaşmak',risk:'başkasının duygusuyla kendi sınırını karıştırmak',practice:'Neye evet, neye hayır diyebildiğinizi somutlaştırın.',pace:'esnek'},
};
export type Reading={title:string;text:string;practice?:string};
type PairContext='identity'|'emotion'|'approach'|'cross'|'root'|'shadow'|'dark'|'north'|'south';
type PracticeContext='overview'|'identity'|'emotion'|'approach'|'root'|'shadow'|'dark'|'nodes';
const contexts:Record<PairContext,{opening:string;focus:string}>={
 identity:{opening:'Birlikte kurduğunuz hayatın yönünü, neyi önemseyerek karar verdiğiniz belirler.',focus:'Ortak hedefi belirlerken her iki tarafın önceliğine de somut bir yer ayırın.'},
 emotion:{opening:'Duygusal yakınlık, iki kişinin aynı biçimde teselli aramasını gerektirmez.',focus:'Üzüldüğünüzde konuşmak mı, zaman mı, yakınlık mı istediğinizi birbirinize anlatın.'},
 approach:{opening:'İlk temasınız ve karar alma temponuz, birlikte hareket etme biçiminizi etkiler.',focus:'Plan yaparken kararın hızını, sorumluluğu ve kişisel alanı açıkça paylaşın.'},
 cross:{opening:'Birinin yaşam yönü, diğerinin duygusal ihtiyacına her zaman kendiliğinden karşılık vermez.',focus:'Ortak bir hedefi ilerletirken diğer kişinin kendini güvende hissedip hissetmediğini de konuşun.'},
 root:{opening:'Kök Aks karşılaştırması, geçmiş deneyimlerinizle gelişmiş fakat geri planda kalmış yeteneklerinizi birlikte ele alır.',focus:'Birbirinizin unutulmuş becerilerini fark etmek, bu potansiyeli yeniden kullanmanız için cesaret verebilir.'},
 shadow:{opening:'Gölge Aks karşılaştırmasında, birbirinizde güçlü tepki uyandıran nitelikler öne çıkar.',focus:'Eleştirdiğiniz davranışın ölçülü hâline kendi hayatınızda ne kadar yer verdiğinizi düşünün.'},
 dark:{opening:'Karanlık Ay karşılaştırması, duygusal savunmalarınızın birbirine dokunduğu alanı anlatır.',focus:'İncinme anında karşı tarafı sınamak yerine duygunun altındaki ihtiyacı adlandırın.'},
 north:{opening:'Kuzey düğümleri, yeni bir yaklaşım geliştirirken birbirinize nasıl alan açabileceğinizi anlatır.',focus:'Değişimi birbirinizi yönetmek için değil, karşılıklı destek sunmak için kullanın.'},
 south:{opening:'Güney düğümleri, tanıdık tepkilerin ve alışılmış becerilerin ilişkinizdeki yerini anlatır.',focus:'Kolay gelen bir alışkanlığın artık ikinize de iyi gelip gelmediğini birlikte değerlendirin.'},
};
function rhythm(first:string,second:string){
 const a=profiles[first],b=profiles[second];
 if(first===second)return 'Benzer ihtiyaçlar birbirinizi anlamayı kolaylaştırır. Aynı hassasiyete sahip olduğunuz için gerilim anında aynı savunmaya çekilmeniz de mümkündür.';
 if(a.pace===b.pace)return 'Karar alma temponuz birbirine yakındır; farklı önceliklerinizi konuşabildiğinizde bu benzerlik ortak hareket etmeyi kolaylaştırır.';
 if(a.pace==='hızlı')return `İlk adımı genellikle ${signByIau[first].name} tarafı atmak ister; ${signByIau[second].name} tarafı ise kararın kendi ihtiyacına da karşılık gelmesini bekler.`;
 if(b.pace==='hızlı')return `${signByIau[second].name} tarafının hızlanma isteğiyle ${signByIau[first].name} tarafının kendi temposunu koruma ihtiyacı arasında anlaşmanız gerekir.`;
 return 'Biriniz sürekliliği korurken diğeriniz seçenekleri açık tutmak ister. İkinize de alan bırakan bir plan bu farkı tamamlayıcı hâle getirir.';
}

const cap=(value:string)=>value.charAt(0).toLocaleUpperCase('tr-TR')+value.slice(1);

function practiceFor(iau:string,context:PracticeContext,otherIau?:string){
 const profile=profiles[iau],name=signByIau[iau]?.name??iau,other=otherIau?profiles[otherIau]:undefined;
 if(!profile)return undefined;
 const prompts:Record<PracticeContext,string>={
  overview:`Önünüzdeki bir kararı iki başlıkta yazın: gerçekten istediğiniz sonuç ve kendinizi güvende hissetmek için gereken koşul. Ardından ${profile.gift} gücünüzle bugün atabileceğiniz en küçük adımı seçin.`,
  identity:`Bu hafta yalnız alışkanlıkla sürdürdüğünüz bir hedefi seçin. “Bu hedef ${profile.need} ihtiyacımı gerçekten besliyor mu?” diye sorun; cevabınız evetse ${profile.gift} yönünüzü görünür bir eyleme dönüştürün.`,
  emotion:`Duygunuz yükseldiğinde hemen çözüm üretmeyin. Önce “Şu anda ${profile.need} ihtiyacım var” diye adlandırın; sonra bunu karşı tarafın tahmin etmesini beklemeden tek, açık bir ricaya dönüştürün.`,
  approach:`Yeni bir görüşmede ilk tepkinizi vermeden önce bir soru sorun. ${cap(profile.gift)} gücünüzü korurken karşınızdakinin temposunu da anlamanız, ilk izleniminizi daha dengeli kılar.`,
  root:`Uzun süredir kullanmadığınız fakat geçmişte size doğal gelen bir beceriyi seçin. Bu hafta ona yirmi dakika ayırın; sonucu mükemmelleştirmek yerine hâlâ size ait olup olmadığını gözlemleyin.`,
  shadow:`Sizi güçlü biçimde rahatsız eden bir davranışı yazın. Davranışın zarar veren hâliyle altındaki sağlıklı “${profile.need}” ihtiyacını ayırın; bu niteliğin ölçülü bir biçimine kendi hayatınızda nerede yer açabileceğinizi bulun.`,
  dark:`Savunmaya geçtiğinizi fark ettiğiniz anda konuşmayı kesmek yerine bedensel tepkinizi adlandırın. “Korktuğum şey ne, ${profile.need} ihtiyacımı nasıl daha açık anlatabilirim?” sorularını ayrı ayrı yanıtlayın; sonra yalnız ihtiyacınızı paylaşın.`,
  nodes:`Size çok tanıdık geldiği için otomatikleşen bir tepkiyi seçin. Bir sonraki benzer durumda aynı sonucu üretmeden önce “${profile.gift}” becerisini farklı ve küçük bir davranışla deneyin.`,
 };
 if(context==='overview'&&other){return `Bir kararı iki sütuna ayırın: ${name} tarafınızın aradığı “${profile.need}” ve diğer yerleşiminizin aradığı “${other.need}”. İki ihtiyaca da cevap veren tek bir küçük adım yazın; yalnızca birini seçmek zorunda olmadığınızı görün.`;}
 return prompts[context];
}
export function pairReading(first:string,second:string,context:PairContext='identity'):Reading{
 const a=profiles[first],b=profiles[second],an=signByIau[first]?.name??first,bn=signByIau[second]?.name??second,c=contexts[context];
 if(!a||!b)return {title:`${an} · ${bn}`,text:'Bu yerleşim için yorum profili belirlenemedi. Gökyüzü konumu sonuç kartında korunur.'};
 if(context==='root')return {title:`${an} · ${bn}`,text:first===second?`İkinizin Kök Aks’ı da ${an}. ${rootReadings[first].short} Birbirinizde kolayca gördüğünüz bu yeteneği kendinizde küçümsüyor olabilirsiniz. Benzer birikiminiz, yarım kalmış bir ilgiye yeniden dönmek için karşılıklı cesaret verebilir. Bunu birbirinizden beklenen bir görev hâline getirmeden paylaşmanız önemlidir.`:`${an} Kök Aks’ına sahip kişi için: ${rootReadings[first].short} ${bn} Kök Aks’ına sahip kişi için: ${rootReadings[second].short} Bu birliktelikte değerli olan, birbirinize eksik bir özellik kazandırmaktan çok, zaten taşıdığınız birikimi görünür kılmaktır. Birinizin kendinde sıradan bulduğu beceri, diğerinin gözünde kıymetli olabilir. Birbirinize alan açmanız, uzun süredir kullanılmayan yeteneklerin yeniden hayata katılmasını destekler.`};
 return {title:`${an} · ${bn}`,text:`${c.opening} ${first===second?`İkiniz için de ${a.need} önemlidir. Ortak gücünüz: ${a.gift}.`:`${an} tarafı için ${a.need}, ${bn} tarafı için ${b.need} önceliklidir. Birinizin katkısı ${a.gift}; diğerininki ${b.gift}.`} ${rhythm(first,second)} ${first===second?`Dikkat etmeniz gereken ortak eğilim, ${a.risk}.`:`Zorlandığınızda ${an} tarafında ${a.risk}; ${bn} tarafında ${b.risk} belirginleşir.`} ${c.focus}`,practice:first===second?a.practice:`${an}: ${a.practice} ${bn}: ${b.practice}`};
}
function axis(title:string,first:{iau:string;name:string;longitude?:number},second:{iau:string;name:string;longitude?:number},meaning:string,utc:string,practiceContext:'shadow'|'dark'|'nodes'):Reading{
 const f=readingPlacement(first,utc),s=readingPlacement(second,utc),a=profiles[f.iau],b=profiles[s.iau];
 const note=[f,s].some(p=>p.projected)?' Bu bölümde 13 bölge dışındaki nokta için ekliptik izdüşüm profili kullanılmıştır.':'';
 return {title:`${title} · ${f.name} ↔ ${s.name}`,text:`${meaning} ${a&&b?`Size tanıdık gelen ihtiyaç, ${a.need}. Karşı uç ise ${b.need} temasını hayatınıza bilinçli biçimde çağırır. Baskı altında ${a.risk} eğilimi belirginleştiğinde, ${b.gift} niteliği denge kurmanıza yardım eder. Buradaki amaç ${f.name} tarafınızı bastırmak değil; ${s.name} niteliğini de kullanılabilir hâle getirerek tepki alanınızı genişletmektir.`:'Bu noktanın konumu gösteriliyor; özel bir yorum profili bulunmuyor.'}${note}`,practice:practiceFor(s.iau,practiceContext)};
}
export function printReading(raw:BirthSkyResult):string{
 const result=readingResult(raw),s=profiles[result.sun.iau],m=profiles[result.moon.iau],a=profiles[result.ascendant.iau];
 if(!s||!m||!a)return 'Kişisel yorum için doğum bilgilerinizi ve hesaplanan yerleşimleri sitede inceleyebilirsiniz.';
 const sunSign=signByIau[result.sun.iau],moonSign=signByIau[result.moon.iau],ascSign=signByIau[result.ascendant.iau];
 const sameSunMoon=result.sun.iau===result.moon.iau;
 const sameSunAsc=result.sun.iau===result.ascendant.iau;
 return `Yaşam yönünüzü ${s.need} besler. En güçlü yanınız, ${s.gift}. Duygusal dünyanızda ${m.need} ararsınız ve baskı altında ${m.risk} eğilimi hassas noktanız olabilir. İnsanların sizde ilk fark ettiği güç, ${a.gift}. ${sameSunMoon?`${sunSign.name} vurgusunun Güneş ve Ay’da tekrarlanması, isteğinizle duygusal refleksinizin aynı yöne akmasını sağlar. Bu bütünlük kararlılık verir; fakat kendi ihtiyacınızı herkes için geçerli saymamaya dikkat etmelisiniz.`:`${sunSign.name} Güneş’inizin hedefi ile ${moonSign.name} Ay’ınızın güven ihtiyacı farklı çalışır. Sağlıklı denge, birini susturmak değil; karar verirken ikisine de ayrı söz hakkı tanımaktır.`} ${sameSunAsc?`${sunSign.name} vurgusu yükselende de tekrarlandığı için iç yönünüz dış tavrınızda kolayca görünür; niyetiniz güçlü anlaşılır, ancak ilk tepkinizin bütün kişiliğiniz sanılmasına izin vermemek önemlidir.`:`${ascSign.name} yükseleniniz, bu iç yapıyı dış dünyaya farklı bir üslupla taşır. Göründüğünüz hâlle hissettiğiniz hâli açıkça bağladığınızda ilişkileriniz daha anlaşılır olur.`}`;
}
export function emotionalReading(raw:BirthSkyResult):string{
 const result=readingResult(raw),sky=chartSky(raw),moon=profiles[result.moon.iau],darkPlacement=readingPlacement(sky.dark,raw.utc),dark=profiles[darkPlacement.iau];
 if(!moon||!dark)return 'Duygusal denge, alışılmış tepkinizi fark edip karşıt ihtiyaca da yer açmanızla güçlenir.';
 return `${result.moon.name} Ay’ınız ${moon.need} arayarak sakinleşir. Bu ihtiyaç karşılanmadığında ${moon.risk} eğilimi devreye girebilir. Karanlık Ay hattının ${darkPlacement.name} ucu ise ${dark.need} temasını görmezden gelmemenizi ister. Duygusal sınavınız, tanıdık tepkinizi terk etmek değil; ${dark.gift} niteliğini de kullanarak daha geniş bir cevap verebilmektir.`;
}
export function growthReading(raw:BirthSkyResult):string{
 const sky=chartSky(raw),rootPlacement=readingPlacement(sky.desc,raw.utc),root=rootReadings[rootPlacement.iau],shadowPlacement=readingPlacement(sky.shadow,raw.utc),shadow=profiles[shadowPlacement.iau],dark=profiles[readingPlacement(sky.dark,raw.utc).iau],northPlacement=readingPlacement(sky.north,raw.utc),north=profiles[northPlacement.iau];
 return `${root?.short??'Kök Aks, geçmiş deneyimlerle gelişen saklı potansiyelinizi anlatır.'} ${rootPlacement.name} Kök Aks’ınız, bir zamanlar geliştirdiğiniz fakat bugün sıradan gördüğünüz bu beceriyi yeniden sahiplenmeye çağırır. ${shadowPlacement.name} Gölge Aks’ınızda ${shadow?.need??'farklı bir ihtiyaca yer açmak'} teması, kendinize yakıştırmadığınız yönü daha olgun bir biçimde kullanma dersidir. Duygusal yüzleşmelerde ${dark?.gift??'ihtiyacınızı açıkça ifade etmek'} size yeni bir cevap alanı açar. İlerlerken ${north?.gift??'alışılmış tepkinin dışına çıkmak'} niteliğini küçük fakat düzenli seçimlerle geliştirmeniz önemlidir.`;
}
export function socialReading(raw:BirthSkyResult):string{
 const root=rootReadings[readingPlacement(chartSky(raw).desc,raw.utc).iau];
 const r=readingResult(raw),s=profiles[r.sun.iau],m=profiles[r.moon.iau],a=profiles[r.ascendant.iau];
 return s&&m&&a?`Yolunuzu ${s.need} belirler. İç dünyanızda ${m.need} ararsınız. İnsanlara kattığınız güç: ${a.gift}. ${root?.short??''}`:'Gökyüzü yerleşimlerinizi ve kişisel yorumunuzu RealHoroscope’ta keşfedin.';
}
export function birthReading(raw:BirthSkyResult):Reading[]{
 const result=readingResult(raw),sky=chartSky(raw),s=profiles[result.sun.iau],m=profiles[result.moon.iau],a=profiles[result.ascendant.iau];
 const projected=readingPlacement(raw.moon,raw.utc).projected;
 return [
 {title:'Haritanızın ana hikâyesi',text:printReading(raw)+(projected?` Ay yorumu, gerçek ${raw.moon.name} konumu korunarak ${result.moon.name} ekliptik izdüşüm profiliyle hazırlanmıştır.`:''),practice:practiceFor(result.sun.iau,'overview',result.moon.iau)},
 {title:`İstekleriniz ve duygularınız · ${result.sun.name} · ${result.moon.name}`,text:s&&m?`Güneş tarafınız “Nereye yöneliyorum?” sorusuna ${s.need} üzerinden cevap verir; Ay tarafınız ise “Nerede güvendeyim?” sorusunda ${m.need} arar. ${result.sun.iau===result.moon.iau?`Aynı ${result.sun.name} niteliği iki alanda da çalıştığı için kararınıza duygusal olarak hızla bağlanabilirsiniz. Güçlü tarafınız ${s.gift}; dikkat etmeniz gereken nokta ise ${m.risk} eğiliminin hem isteğinizi hem duygunuzu aynı anda yönetmesidir.`:`Bu iki yerleşim farklı şeyler istediğinde iç gerilim yaşayabilirsiniz. ${s.gift} gücünüz hedefi ilerletirken, Ay’ınızın ${m.need} ihtiyacını ertelememeniz gerekir. Duygusal baskıda ${m.risk} eğilimini fark etmek, isteğinizle ihtiyacınızı karşı karşıya getirmek yerine uzlaştırmanızı sağlar.`}`:printReading(raw),practice:practiceFor(result.moon.iau,'emotion')},
 {title:`İlk izlenim ve iç dünyanız · ${result.ascendant.name} · ${result.moon.name}`,text:a&&m?`Yükseleniniz yeni bir ortama ${a.gift} gücüyle girer; Ay’ınız yakınlık kurulduğunda ${m.need} arar. ${result.ascendant.iau===result.moon.iau?`${result.ascendant.name} vurgusu, dışarıdaki tavrınızla duygusal refleksinizi birbirine yaklaştırır. İnsanlar sizi kolay okuyabilir; buna karşılık ilk tepkinizin bütün ihtiyacınızı temsil ettiğini sanabilirsiniz. Duygunuzu bir adım daha ayrıntılı anlatmanız bu yoğun benzerliği dengeler.`:`İlk izleniminiz duygusal ihtiyacınızı bütünüyle göstermeyebilir. ${result.ascendant.name} tarafınızın yaklaşımı ile ${result.moon.name} tarafınızın güven arayışını açıkça bağlamak, “Böyle görünüyorsun ama başka hissediyorsun” türü yanlış anlamaları azaltır.`}`:printReading(raw),practice:practiceFor(result.ascendant.iau,'approach')},
 {title:`Kök Aks · ${sky.desc.name}`,text:rootReadings[readingPlacement(sky.desc,raw.utc).iau]?.text??'Kök Aks, geçmiş deneyimlerle gelişmiş, henüz yeterince fark edilmemiş potansiyeli anlatır.',practice:practiceFor(readingPlacement(sky.desc,raw.utc).iau,'root')},
 axis('Güneş–Gölge Aks hattı',sky.sun,sky.shadow,'Gölge Aks, kendinize yakıştırmadığınız veya başkalarında görünce güçlü tepki verdiğiniz yönleri tanımaya çağırır.',raw.utc,'shadow'),
 axis('Ay–Karanlık Ay Aksı · Duygu Ekseni',sky.moon,sky.dark,'Karanlık Ay Aksı, duygusal zıddınızı ve yüzleşme sınavınızı anlatır. Tanıdık savunmanızı fark etmek, karşıt ihtiyacı da anlayabilmenizin başlangıcıdır.',raw.utc,'dark'),
 axis('Ay düğümleri · Güneyden Kuzeye',sky.south,sky.north,'Güney düğüm alışılmış becerileri, Kuzey düğüm geliştirilecek yaklaşımı temsil eder.',raw.utc,'nodes'),
 ];
}
export function compatibilityReading(a:BirthSkyResult,b:BirthSkyResult):Reading[]{
 const sa=chartSky(a),sb=chartSky(b);
 const pairs:[string,PairContext,keyof Pick<typeof sa,'sun'|'moon'|'asc'|'desc'|'shadow'|'dark'|'north'|'south'>][]=[
 ['Ortak yön ve amaç','identity','sun'],['Duygusal ihtiyaçlar','emotion','moon'],['İlk temas ve gündelik yaklaşım','approach','asc'],['Kök Aks · saklı yetenekleriniz','root','desc'],['Gölge Aks · kabulü zor nitelikler','shadow','shadow'],['Karanlık Ay · duygusal yüzleşmeler','dark','dark'],['Kuzey düğümler · gelişim yönleri','north','north'],['Güney düğümler · alışılmış tepkiler','south','south']];
 const read=(title:string,context:PairContext,x:typeof sa.sun,y:typeof sb.sun)=>{const px=readingPlacement(x,a.utc),py=readingPlacement(y,b.utc),r=pairReading(px.iau,py.iau,context);return {...r,title:`${title} · ${r.title}`,text:r.text+([px,py].some(p=>p.projected)?' 13 bölge dışındaki nokta için ekliptik izdüşüm profili kullanılmıştır.':'')};};
 const list=pairs.map(([t,c,k])=>read(t,c,sa[k],sb[k]));
 list.splice(3,0,read('Birinci kişinin yönü · ikinci kişinin duygusu','cross',sa.sun,sb.moon),read('Birinci kişinin duygusu · ikinci kişinin yönü','cross',sa.moon,sb.sun));
 return list;
}
