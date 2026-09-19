export type ZodiacSign = {
  slug: string;
  name: string;
  latin: string;
  iau: string;
  glyph: string;
  emoji: string;
  dates: string;
  accent: string;
  keywords: string[];
  stars: string[];
  astronomy: string;
  history: string;
  interpretation: string;
  characterAnalysis: string[];
  sun: string;
  moon: string;
  ascendant: string;
  balance: string;
  questions: { q: string; a: string }[];
};

export const zodiacSigns: ZodiacSign[] = [
  {
    slug: "koc", name: "Koç", latin: "Aries", iau: "Ari", glyph: "♈", emoji: "🔥", dates: "yaklaşık 19 Nisan – 14 Mayıs", accent: "#ff8066",
    keywords: ["başlangıç", "cesaret", "hareket"], stars: ["Hamal", "Sheratan", "Mesarthim"],
    astronomy: "Koç, ekliptiğin kuzeyinde kalan görece küçük bir takımyıldızdır. Güneş'in görünen yıllık yolu bu bölgeden ilkbaharın ortalarında geçer. Tarihler sabit bir astroloji takvimi değil, Güneş'in IAU sınırlarını geçtiği yaklaşık dönemdir.",
    history: "Koç figürü Mezopotamya ve Helenistik gök anlatılarında baharın, sürünün ve öncülüğün simgesi olarak işlendi. Bugün ilkbahar ekinoksu presesyon nedeniyle Balık yönünde olsa da 'Koç noktası' adı gök koordinatlarında tarihsel bir iz olarak yaşamayı sürdürür.",
    interpretation: "Bu platformun sembolik okumasında Koç, beklemek yerine ilk adımı atan dürtüyü anlatır. En verimli hâlinde cesaret ve açıklık; zorlandığında acelecilik ve gereksiz mücadele üretebilir.",
    characterAnalysis: [
      "Koç karakteri genel olarak doğrudan, girişken ve harekete dönüktür. Bir durumun uzun süre belirsiz kalması yerine ilk adımı atmayı, sonucu yaşayarak görmeyi tercih eder. Cesareti yalnız fiziksel atılganlık değildir; başkalarının tereddüt ettiği yerde sorumluluk üstlenebilmesi ve yeni bir başlangıca enerji verebilmesi de bu yapının güçlü tarafıdır.",
      "İlişkilerde niyetinin açık olmasını ister ve dolaylı mesajlardan çabuk yorulabilir. Sabırsızlaştığında karşı tarafın hazırlanma süresini küçümsemesi veya her anlaşmazlığı mücadele gibi görmesi mümkündür. Koç’un olgun hâli hızını kaybetmez; ancak hangi savaşın gerçekten kendisine ait olduğunu seçer, başlattığı işi sürdürmeyi ve başkasının iradesine de alan bırakmayı öğrenir."
    ],
    sun: "Güneş Koç bölgesindeyse kimlik, doğrudan deneyim ve inisiyatif üzerinden kurulabilir. Kişi hareket ederken kendisini daha canlı hissedebilir.",
    moon: "Ay Koç bölgesindeyse duygusal tepki hızlıdır. İhtiyaçlar gecikmeden fark edilir; sakinleşmek için bedensel hareket ve açık iletişim yardımcı olabilir.",
    ascendant: "Yükselen Koç bölgesindeyse ilk izlenim kararlı, hızlı ve bağımsız olabilir. Bu bir karakter hükmü değil, doğu ufkundaki noktanın sembolik yorumudur.",
    balance: "Başlatma gücünü sürdürme sabrıyla dengelemek; dürtü ile yön arasına kısa bir düşünme payı koymak.",
    questions: [{q:"Koç tarihleri neden nisanda başlıyor?",a:"Burada mevsimsel 12 eşit burç değil, Güneş'in gerçek Koç takımyıldızı önündeki yaklaşık geçişi ele alınır."},{q:"Sınır gününde sonuç değişebilir mi?",a:"Evet. Yıl, saat ve kullanılan koordinatlar sınır günlerinde sonucu etkileyebilir; hesaplayıcı bu nedenle anlık efemeris kullanır."}]
  },
  {
    slug: "boga", name: "Boğa", latin: "Taurus", iau: "Tau", glyph: "♉", emoji: "🌿", dates: "yaklaşık 14 Mayıs – 21 Haziran", accent: "#79d89b",
    keywords: ["istikrar", "duyu", "üretim"], stars: ["Aldebaran", "Elnath", "Alcyone"],
    astronomy: "Boğa, ekliptik üzerinde belirgin yıldız desenleri barındırır. Aldebaran, Hyades doğrultusunda parlak görünür; Pleiades açık yıldız kümesi de aynı gökyüzü bölgesinin en tanınan hedeflerindendir.",
    history: "Boğa biçimi çok eski tarım toplumlarının gök anlatılarında güç, bereket ve mevsim döngüsüyle ilişkilendirildi. Farklı kültürlerde ayrıntılar değişse de boynuzlu figür kalıcı oldu.",
    interpretation: "Boğa sembolü, bir şeyi elle tutulur hâle getirme ve koruma becerisini temsil eder. Güvenli yapı kurmak güçlü yanıyken değişimi yalnızca risk olarak görmek hareket alanını daraltabilir.",
    characterAnalysis: [
      "Boğa karakteri genel olarak sakin, dayanıklı ve somut sonuçlara odaklıdır. Güven duygusunu sözlerden çok tutarlılık, emek ve günlük hayatın düzeni üzerinden kurar. Bir işi zamana yayarak büyütme, kaynakları koruma ve başkalarının geçici hevesle bıraktığı yerde devam edebilme becerisi bu profilin en belirgin gücüdür.",
      "Yakın ilişkilerde sadakat ve öngörülebilirlik arar; sık değişen tavırlar güvenini zorlayabilir. Baskı altında alıştığı düzene gereğinden fazla tutunabilir ve gerekli değişimi tehdit gibi algılayabilir. Boğa’nın gelişmiş hâli sağlamlığını korurken durağanlaşmaz: neyin gerçekten değerli olduğunu ayırt eder, sahip olmakla bağlanmak arasındaki farkı görür ve değişimi kendi ritmi içinde kalıcı bir yapıya dönüştürür."
    ],
    sun: "Güneş Boğa bölgesindeyse kimlik süreklilik, somut sonuç ve kişisel değerler çevresinde güçlenebilir.",
    moon: "Ay Boğa bölgesindeyse duygusal güven düzen, temas, tanıdık ortam ve ihtiyaçların somut karşılanmasıyla desteklenebilir.",
    ascendant: "Yükselen Boğa bölgesindeyse dışarıdan sakin, ölçülü ve güvenilir bir ritim algılanabilir.",
    balance: "Koruduğun şeyin gerçekten değerli olup olmadığını ara sıra yeniden değerlendirmek; istikrarı durağanlığa dönüştürmemek.",
    questions: [{q:"Pleiades Boğa'nın içinde mi?",a:"Gökyüzündeki görünür doğrultusu Boğa takımyıldızı bölgesindedir ve amatör gözlem için tanınmış bir açık yıldız kümesidir."},{q:"Boğa sonucu yalnız doğum gününe mi bağlı?",a:"Güneş için gün çoğu zaman yeterli yaklaşımı verir; kesin sınır anlarında saat de belirleyicidir."}]
  },
  {
    slug: "ikizler", name: "İkizler", latin: "Gemini", iau: "Gem", glyph: "♊", emoji: "✦", dates: "yaklaşık 21 Haziran – 21 Temmuz", accent: "#f2c96d",
    keywords: ["merak", "bağlantı", "dil"], stars: ["Castor", "Pollux", "Alhena"],
    astronomy: "İkizler, Castor ve Pollux ile kolay tanınan bir ekliptik takımyıldızıdır. Güneş bu bölgede bulunduğunda takımyıldız gündüz göğünde kaldığı için çıplak gözle gözlenemez.",
    history: "İkiz figürü farklı geleneklerde kardeşlik, eşlik ve ikilik temalarıyla anlatıldı. Castor ve Pollux adları Greko-Romen anlatının en bilinen katmanıdır.",
    interpretation: "İkizler sembolü bilgi parçaları arasında bağ kuran zihni temsil eder. Merak öğrenmeyi hızlandırır; dağınıklık ise bilgiyi deneyime dönüştürmeyi zorlaştırabilir.",
    characterAnalysis: [
      "İkizler karakteri genel olarak meraklı, hızlı düşünen ve bağlantı kurmaya yatkındır. Yeni bir ortamı sorular sorarak, insanlarla konuşarak ve farklı görüşleri karşılaştırarak tanır. Gücü yalnız çok şey bilmesinde değil; karmaşık bir konuyu anlaşılır dile çevirmesinde, bir fikrin başka bir alandaki karşılığını görmesinde ve iletişim tıkandığında yeni bir yol bulmasındadır.",
      "Tekdüzelik zihinsel enerjisini düşürebilir; seçeneklerin artması ise kararını ertelemesine yol açabilir. Duyguları hemen açıklamaya çalışırken onları gerçekten yaşamaya yeterince zaman ayırmayabilir. İkizler’in olgun hâli merakını dağıtmaz, yönlendirir: her bilgiyi toplamak yerine önemli soruyu seçer, söylediği sözü takip eder ve zihinsel çevikliğini güvenilir bir iletişim biçimine dönüştürür."
    ],
    sun: "Güneş İkizler bölgesindeyse kişi kendisini soru sorarken, anlatırken ve farklı çevreler arasında köprü kurarken daha görünür hissedebilir.",
    moon: "Ay İkizler bölgesindeyse duyguları adlandırmak ve konuşmak rahatlatıcı olabilir; zihinsel hareket bazen duygunun kendisinden kaçışa da dönüşebilir.",
    ascendant: "Yükselen İkizler bölgesindeyse ilk temas meraklı, çevik ve iletişime açık görünebilir.",
    balance: "Her yeni sorunun peşinden gitmek yerine önemli olanı seçmek; bilgiyi uygulamayla tamamlamak.",
    questions: [{q:"Castor ve Pollux gerçekten ikiz yıldızlar mı?",a:"Bunlar gökyüzünde birbirine yakın görünen iki ayrı parlak yıldız sistemidir; 'ikiz' adı mitolojik desenle ilgilidir."},{q:"İkizler burcu ile takımyıldız aynı mı?",a:"Hayır. Burç, astrolojik bir bölümlendirme; takımyıldız ise IAU sınırları belirlenmiş gökyüzü bölgesidir."}]
  },
  {
    slug: "yengec", name: "Yengeç", latin: "Cancer", iau: "Cnc", glyph: "♋", emoji: "☾", dates: "yaklaşık 21 Temmuz – 10 Ağustos", accent: "#8cc9ff",
    keywords: ["koruma", "aidiyet", "hafıza"], stars: ["Tarf", "Asellus Australis", "Acubens"],
    astronomy: "Yengeç parlak yıldızları az olan, karanlık bir gökte daha iyi seçilen takımyıldızdır. Beehive ya da Praesepe adıyla bilinen açık yıldız kümesi bu bölgede dikkat çeker.",
    history: "Yengeç figürü klasik anlatılarda daha büyük kahramanlık öykülerinin küçük fakat kalıcı bir parçası olarak yer aldı. Sembol daha sonra korunma, kabuk ve iç alan temalarıyla genişledi.",
    interpretation: "Yengeç sembolü güvenli bir iç alan kurma, geçmişi taşıma ve yakınlarını gözetme biçimini anlatır. Koruma sağlıklı sınırlarla birleşmediğinde aşırı savunmaya dönüşebilir.",
    characterAnalysis: [
      "Yengeç karakteri genel olarak duyarlı, koruyucu ve güçlü bir duygusal hafızaya sahiptir. İnsanların söylediklerinden çok ortamın tonunu, yakınlığın samimiyetini ve küçük davranışlardaki değişimi fark edebilir. Aidiyet kurduğu kişilere karşı özenli davranır; güvenli bir ev, ekip veya ilişki ortamı oluşturmak onun sessiz fakat etkili gücüdür.",
      "Kırıldığında doğrudan konuşmak yerine kabuğuna çekilmesi, geçmişteki bir deneyimi bugünkü olayın üzerine taşıması veya anlaşılmayı bekleyip ihtiyacını söylememesi mümkündür. Yengeç’in olgun hâli şefkatini yalnız başkalarına yöneltmez; kendi sınırlarını da korur. Geçmişi inkâr etmeden bugünü görür ve bakım vermeyi karşılıklı, sürdürülebilir bir bağ hâline getirir."
    ],
    sun: "Güneş Yengeç bölgesindeyse kimlik aidiyet, bakım verme ve duygusal süreklilik üzerinden gelişebilir.",
    moon: "Ay Yengeç bölgesindeyse duygu ve hafıza güçlü bağ kurabilir; ortamın güvenli ve tanıdık olması önem kazanır.",
    ascendant: "Yükselen Yengeç bölgesindeyse ilk izlenim duyarlı, gözlemci ve ölçülü olabilir; yakınlık zamanla açılır.",
    balance: "Başkalarını korurken kendi ihtiyacını görünmez kılmamak; geçmiş bilgisini bugünün kararına dönüştürmek.",
    questions: [{q:"Yengeç neden kısa bir geçiş dönemine sahip?",a:"IAU takımyıldızlarının ekliptik boyunca kapladıkları uzunluklar eşit değildir."},{q:"Ay Yengeç yorumu bilimsel midir?",a:"Ay'ın konumu astronomik olarak hesaplanır; psikolojik anlamlandırma ise sembolik astroloji yorumudur."}]
  },
  {
    slug: "aslan", name: "Aslan", latin: "Leo", iau: "Leo", glyph: "♌", emoji: "☀", dates: "yaklaşık 10 Ağustos – 16 Eylül", accent: "#ffb84f",
    keywords: ["yaratıcılık", "görünürlük", "yürek"], stars: ["Regulus", "Denebola", "Algieba"],
    astronomy: "Aslan'ın ters soru işaretini andıran yıldız dizisi ve Regulus'u, ilkbahar göğünde kuzey yarımküreden ayırt edilebilir. Ekliptik Regulus'un yakınından geçer.",
    history: "Aslan, krallık ve güç simgesi olarak Mezopotamya'dan Akdeniz'e uzanan çok sayıda anlatıda görüldü. Herakles'in Nemea Aslanı öyküsü Batı geleneğindeki tanınmış örnektir.",
    interpretation: "Aslan sembolü üretimi görünür kılma ve yaşam enerjisini paylaşma cesaretidir. Kendini ifade etme sağlıklı olduğunda ilham verir; yalnız onaya bağlandığında kırılganlaşır.",
    characterAnalysis: [
      "Aslan karakteri genel olarak sıcak, yaratıcı ve kendisini ortaya koymaktan çekinmeyen bir yapıya sahiptir. Bir işe kişisel imzasını katmak, çevresine moral vermek ve değer verdiği insanları yüreklendirmek ister. Doğal liderliği yalnız önde durmasından değil; grubun enerjisini yükseltmesi ve insanların kendi yeteneklerini görünür kılmalarına yardım etmesinden doğar.",
      "Takdir edilmediğini düşündüğünde eleştiriyi kişisel reddedilme gibi algılayabilir veya gururu nedeniyle kırılganlığını göstermekte zorlanabilir. Aslan’ın olgun hâli ışığını kısmadan başkasının ışığına da yer açar. Değerini sürekli alkışla ölçmek yerine ürettiği şeyle bağ kurar; cömertliğini gösteriye değil gerçek bir sorumluluk ve kalpten bağlılık duygusuna dayandırır."
    ],
    sun: "Güneş Aslan bölgesindeyse kişi yaratıcı imza bırakmak, sorumluluk almak ve kalpten ortaya koyduğu şeyle tanınmak isteyebilir.",
    moon: "Ay Aslan bölgesindeyse sıcaklık, sadakat ve görülmek duygusal beslenmenin parçası olabilir.",
    ascendant: "Yükselen Aslan bölgesindeyse ilk izlenim canlı, kendinden emin veya sahneye hazır görünebilir.",
    balance: "Görünür olma arzusunu başkalarının ışığına alan açmakla dengelemek; takdiri tek ölçü yapmamak.",
    questions: [{q:"Regulus neden önemlidir?",a:"Regulus Aslan'ın en parlak yıldızıdır ve ekliptiğe yakın konumu nedeniyle gökyüzü anlatılarında öne çıkar."},{q:"Aslan dönemi her yıl aynı gün mü başlar?",a:"Yaklaşık aralık benzerdir; sınırın kesin UTC anı yıldan yıla bir miktar değişebilir."}]
  },
  {
    slug: "basak", name: "Başak", latin: "Virgo", iau: "Vir", glyph: "♍", emoji: "✧", dates: "yaklaşık 16 Eylül – 31 Ekim", accent: "#b7dc8b",
    keywords: ["ayırt etme", "düzen", "ustalık"], stars: ["Spica", "Porrima", "Vindemiatrix"],
    astronomy: "Başak, ekliptik üzerindeki en geniş takımyıldız bölgelerinden biridir. Bu nedenle Güneş'in IAU sınırları içindeki geçişi klasik burçların eşit süre anlayışından belirgin biçimde uzundur.",
    history: "Başak figürü hasat, bereket, adalet ve mevsimsel düzenle ilişkilendirilen çeşitli tanrıça anlatılarıyla birleşti. Spica adı da başak tanesi imgesini taşır.",
    interpretation: "Başak sembolü karmaşık bir şeyi işleyen, iyileştiren ve kullanışlı hâle getiren dikkat gücüdür. İncelik üretkenliğe hizmet ettiğinde ustalık; kusursuzluk baskısına dönüştüğünde yorulma yaratır.",
    characterAnalysis: [
      "Başak karakteri genel olarak gözlemci, ölçülü ve işleyen bir düzen kurmaya yatkındır. Başkalarının gözden kaçırdığı ayrıntıları fark eder; büyük bir problemi küçük ve uygulanabilir adımlara bölerek çözebilir. Fayda üretmek, bir işi özenle tamamlamak ve bilgisini somut bir katkıya dönüştürmek bu profilin kendisini değerli hissettiği alanlardır.",
      "Zorlandığında eksik olana fazla odaklanabilir, kendi emeğini yeterli görmeyebilir veya yardım ederken karşısındakini sürekli düzeltmeye başlayabilir. Başak’ın olgun hâli kusuru görme yeteneğini şefkatle kullanır. Her ayrıntının aynı önemde olmadığını bilir, tamamlanan işi takdir eder ve titizliğini hem kendisine hem çevresine nefes aldıran sade bir ustalığa dönüştürür."
    ],
    sun: "Güneş Başak bölgesindeyse kimlik, yararlı olmak, sistemi anlamak ve işi özenle tamamlamak üzerinden güçlenebilir.",
    moon: "Ay Başak bölgesindeyse duygusal güven düzen kurmak, küçük sorunları çözmek ve somut katkı sunmakla desteklenebilir.",
    ascendant: "Yükselen Başak bölgesindeyse kişi ilk bakışta dikkatli, sade, gözlemci ve çözüm odaklı algılanabilir.",
    balance: "İyileştirme isteğini kendine ve başkalarına karşı şefkatle yürütmek; tamamlanmış olanı görebilmek.",
    questions: [{q:"Başak neden yaklaşık 45 gün sürüyor?",a:"Takımyıldız sınırları eşit 30 derecelik burç dilimleri değildir; ekliptiğin Başak içindeki yolu daha uzundur."},{q:"Spica nedir?",a:"Spica, Başak takımyıldızının en parlak yıldızıdır ve gökyüzünde kolay kullanılan bir yön bulma hedefidir."}]
  },
  {
    slug: "terazi", name: "Terazi", latin: "Libra", iau: "Lib", glyph: "♎", emoji: "⚖", dates: "yaklaşık 31 Ekim – 23 Kasım", accent: "#d6a8ff",
    keywords: ["denge", "karşılıklılık", "ölçü"], stars: ["Zubeneschamali", "Zubenelgenubi", "Brachium"],
    astronomy: "Terazi, Akrep ile Başak arasında ekliptik üzerinde bulunur. Yıldız adlarındaki 'kuzey ve güney kıskaç' izleri, bölgenin tarihsel olarak Akrep'le birlikte düşünüldüğünü gösterir.",
    history: "Terazi, zodyak dizisinde cansız bir nesneyle gösterilen tek klasik figürdür. Roma geleneğinde ölçü, hukuk ve sonbahar dengesiyle kuvvetli bağ kurmuştur.",
    interpretation: "Terazi sembolü farklı ihtiyaçlar arasında adil bir düzen kurma yeteneğidir. Uyum arayışı gerçek müzakereye dayandığında bağ güçlendirir; çatışmadan kaçışa dönüştüğünde kararı geciktirir.",
    characterAnalysis: [
      "Terazi karakteri genel olarak ilişkileri, karşılıklılığı ve ölçüyü önemser. Bir anlaşmazlıkta iki tarafın da ne söylemeye çalıştığını görebilir; sertleşen ortamı yeniden konuşulabilir hâle getirme konusunda doğal bir yeteneğe sahiptir. Estetik duyarlılığı yalnız görünüşle sınırlı değildir; davranışta, dilde ve ortak yaşamda dengeli bir düzen arar.",
      "Huzuru kaybetmemek için kendi tercihlerini ertelemesi veya herkesin memnun olacağı kusursuz kararı ararken hareketsiz kalması mümkündür. Terazi’nin olgun hâli uyumu suskunlukla karıştırmaz. Kendi isteğini açıkça masaya koyar, gerektiğinde anlaşmazlığa dayanır ve adaleti yalnız eşit paylaşım değil, her tarafın gerçek ihtiyacını gözeten canlı bir müzakere olarak kurar."
    ],
    sun: "Güneş Terazi bölgesindeyse kişi kendisini ilişkiler, estetik ölçü ve karşılıklı anlaşma alanlarında daha belirgin yaşayabilir.",
    moon: "Ay Terazi bölgesindeyse duygusal atmosferde nezaket, eşitlik ve konuşulabilirlik ihtiyacı artabilir.",
    ascendant: "Yükselen Terazi bölgesindeyse ilk izlenim uyumlu, sosyal, ölçülü veya zarif olabilir.",
    balance: "Herkesi gözetirken kendi ölçünü kaybetmemek; huzur ile dürüstlük arasında sahici bir denge kurmak.",
    questions: [{q:"Terazi yıldızlarının adları neden Akrep'i çağrıştırıyor?",a:"Bu adlar, gökyüzü bölgesinin tarih boyunca komşu Akrep figürünün kıskaçlarıyla ilişkilendirilmesinin izlerini taşır."},{q:"Gerçek gökyüzü Terazi tarihi klasik tarihten neden farklı?",a:"Klasik tropikal burçlar mevsimsel 30 derecelik dilimlerdir; burada IAU takımyıldız sınırları kullanılır."}]
  },
  {
    slug: "akrep", name: "Akrep", latin: "Scorpius", iau: "Sco", glyph: "♏", emoji: "◆", dates: "yaklaşık 23 – 29 Kasım", accent: "#ff668c",
    keywords: ["yoğunluk", "dönüşüm", "bağ"], stars: ["Antares", "Shaula", "Sargas"],
    astronomy: "Akrep, Antares ve kıvrılan kuyruğuyla gökyüzünün en belirgin desenlerinden biridir. Buna karşın ekliptiğin resmî Akrep sınırları içindeki yolu kısadır; Güneş yaklaşık bir hafta sonra Yılancı bölgesine geçer.",
    history: "Akrep figürü tehlike, koruma ve ölüm-yenilenme temalarıyla birçok eski kültürde görüldü. Orion anlatısındaki akrep, gökyüzündeki karşıt mevsimsel konumları açıklayan tanınmış bir öyküdür.",
    interpretation: "Akrep sembolü yüzeyin altındaki motivasyonu görme ve krizden değişerek çıkma kapasitesidir. Yoğunluk dürüstlüğe hizmet ettiğinde iyileştirici; kontrol arzusuna dönüştüğünde yıpratıcı olabilir.",
    characterAnalysis: [
      "Akrep karakteri genel olarak yoğun, sezgisel ve kolay güvenmeyen bir yapıya sahiptir. İnsanların sözleriyle davranışları arasındaki farkı çabuk fark eder; yüzeysel açıklamalar yerine asıl motivasyonu anlamak ister. Kriz anında soğukkanlı kalabilmesi, zor gerçeklerle yüzleşmesi ve kayıptan sonra yeniden güç toplayabilmesi bu profilin belirgin dayanıklılığıdır.",
      "Belirsizlik uzadığında kontrol etme, duygusunu saklayarak karşı tarafı sınama veya incinmemek için mesafeyi sertleştirme eğilimi gösterebilir. Akrep’in olgun hâli derinliğini kuşkuya teslim etmez. Güveni gizli testlerle değil açık sınırlarla kurar, savunmasızlığın zayıflık olmadığını kabul eder ve güçlü sezgisini hem kendisini hem ilişkilerini dönüştüren dürüst bir kavrayışa dönüştürür."
    ],
    sun: "Güneş Akrep bölgesindeyse kimlik güven, mahremiyet, sadakat ve dönüşüm deneyimleri çevresinde derinleşebilir.",
    moon: "Ay Akrep bölgesindeyse duygular güçlü, seçici ve uzun hafızalı yaşanabilir; güvenin açık sınırlarla kurulması önemlidir.",
    ascendant: "Yükselen Akrep bölgesindeyse ilk izlenim odaklı, güçlü, mesafeli veya sezgisel olabilir.",
    balance: "Derinliği her durumda kriz aramadan yaşamak; güveni sınama yerine açık anlaşmalarla kurmak.",
    questions: [{q:"Akrep neden yalnız birkaç gün sürüyor?",a:"Güneş'in görünen yolu IAU tarafından çizilmiş Akrep bölgesinin dar bir kısmından geçer."},{q:"Antares ekliptik üzerinde mi?",a:"Antares ekliptiğe yakın parlak bir yıldızdır; adı Mars'a benzeyen kızıl görünümüne gönderme yapar."}]
  },
  {
    slug: "yilanci", name: "Yılancı", latin: "Ophiuchus", iau: "Oph", glyph: "⛎", emoji: "🐍", dates: "yaklaşık 29 Kasım – 18 Aralık", accent: "#67e0c3",
    keywords: ["şifa", "bilgi", "yenilenme"], stars: ["Rasalhague", "Sabik", "Yed Prior"],
    astronomy: "Yılancı'nın büyük bölümü gök ekvatorunun kuzeyindedir; ancak ayak kısmı ekliptiği keser. Bu nedenle Güneş, Akrep'ten sonra yaklaşık üç hafta boyunca IAU'nun Ophiuchus sınırları içinde görünür.",
    history: "Figür çoğunlukla yılan taşıyan şifacı Asklepios ile ilişkilendirilir. Bununla birlikte '13. burç' modern popüler anlatımı, takımyıldız ile astrolojik burç kavramlarının aynı olmadığını unutmadan ele alınmalıdır.",
    interpretation: "Bu platformun sembolik dilinde Yılancı, deneyimden bilgi çıkarma, yarayı anlamlandırma ve dönüşümün sorumluluğunu alma temasıdır. Şifa iddiası tıbbi değil, metaforiktir.",
    characterAnalysis: [
      "Yılancı karakteri genel olarak araştırmacı, dönüştürücü ve karmaşık sorunların kökenine inmeye yatkındır. Yaşadığı deneyimi yalnız geride bırakmak yerine ondan bir yöntem, anlam veya bilgi çıkarmak ister. Kriz ile iyileşme arasındaki bağı görebilmesi, başkalarının kaçındığı bir konuyu sakinlikle incelemesi ve dağılmış parçaları yeniden bir araya getirmesi güçlü tarafıdır.",
      "Zorlandığında her sorunu çözmek, herkesi onarmak veya yükün tamamını kendi bilgisiyle taşımak zorunda olduğunu düşünebilir. Yılancı’nın olgun hâli dönüşümle kontrolü birbirinden ayırır. Yardımın sınırını bilir, çözülemeyen şeylere de saygı duyar ve bilgisini üstünlük kurmak yerine daha bilinçli seçimler oluşturmak için kullanır. Onun gerçek gücü, yarayı kimliğe dönüştürmeden deneyimi bilgeliğe çevirebilmesidir."
    ],
    sun: "Güneş Yılancı bölgesindeyse kişi araştırma, kriz çözme ve öğrendiğini dönüştürücü biçimde kullanma alanlarında kimlik geliştirebilir.",
    moon: "Ay Yılancı bölgesindeyse zor duyguları çözümleme ve anlamlandırma ihtiyacı belirginleşebilir; her şeyi tek başına onarma yüküne dikkat gerekir.",
    ascendant: "Yükselen Yılancı bölgesindeyse ilk izlenim merak uyandıran, gözlemci, sakin fakat dönüştürücü olabilir.",
    balance: "Başkalarını iyileştirme sorumluluğunu üstlenmeden önce kendi sınırını tanımak; sembolik şifayı profesyonel sağlık hizmetiyle karıştırmamak.",
    questions: [{q:"Yılancı gerçekten 13. burç mu?",a:"Yılancı, Güneş'in önünden geçtiği 13 IAU takımyıldızından biridir. Astrolojinin 12 burçlu sistemi ise farklı bir bölümlendirme yöntemidir."},{q:"Neden bazı siteler farklı tarih veriyor?",a:"Yaklaşık tarihler yöntem, yıl ve kullanılan sınır tanımına göre bir gün kadar değişebilir; hesaplayıcı anlık koordinatı kullanır."}]
  },
  {
    slug: "yay", name: "Yay", latin: "Sagittarius", iau: "Sgr", glyph: "♐", emoji: "➶", dates: "yaklaşık 18 Aralık – 20 Ocak", accent: "#c28cff",
    keywords: ["ufuk", "anlam", "keşif"], stars: ["Kaus Australis", "Nunki", "Ascella"],
    astronomy: "Yay doğrultusu Samanyolu'nun yoğun merkez bölgelerine bakar. Çaydanlık olarak bilinen yıldız deseni, karanlık gökyüzünde bu zengin alanı bulmayı kolaylaştırır.",
    history: "Okçu ya da sentor figürü, uzak hedef, eğitim ve yolculuk temalarıyla ilişkilendirildi. Kültürler arasında figür değişse de gökyüzü bölgesi uzun süredir yön ve hedef anlatıları taşır.",
    interpretation: "Yay sembolü deneyimi daha geniş bir anlam çerçevesine yerleştirme eğilimidir. Keşif merakı vizyon kazandırır; kesin inançlara tutunmak ayrıntıyı gözden kaçırabilir.",
    characterAnalysis: [
      "Yay karakteri genel olarak açık fikirli, hareketli ve ufkunu genişletmeye istekli bir yapıya sahiptir. Yeni yerler, bilgiler ve düşünce sistemleri ona yalnız heyecan değil, hayatını anlamlandıracağı daha geniş bir çerçeve sunar. Umut verme, zor bir durumun içindeki olasılığı görme ve çevresindekileri daha büyük düşünmeye teşvik etme becerisi bu profilin doğal katkısıdır.",
      "Kısıtlandığını hissettiğinde sorumluluktan uzaklaşabilir, ayrıntıları önemsiz sayabilir veya kendi doğrusunu evrensel gerçek gibi anlatabilir. Yay’ın olgun hâli özgürlüğü sözsüzlükle karıştırmaz. Verdiği sözlerin sınırını bilir, büyük fikrini uygulanabilir adımlarla destekler ve dürüstlüğünü karşısındakinin deneyimini küçümsemeden ifade eder. Böylece keşif arzusu kaçışa değil gelişime dönüşür."
    ],
    sun: "Güneş Yay bölgesindeyse kimlik öğrenme, yolculuk, fikir geliştirme ve ufku genişletme üzerinden güçlenebilir.",
    moon: "Ay Yay bölgesindeyse duygusal ferahlık için hareket alanı, umut ve dürüst bir gelecek duygusu gerekebilir.",
    ascendant: "Yükselen Yay bölgesindeyse ilk izlenim açık, meraklı, hareketli veya doğrudan olabilir.",
    balance: "Büyük resmi somut adımlarla birleştirmek; özgürlük ihtiyacını verilen sözlerle uyumlu yaşamak.",
    questions: [{q:"Samanyolu merkezi Yay yönünde mi?",a:"Dünya'dan bakıldığında galaktik merkez doğrultusu Yay bölgesindedir; bu yüzden alan yıldız ve bulutsu bakımından zengindir."},{q:"Yay sonucu ocak ayına uzayabilir mi?",a:"IAU sınırlarına dayalı yaklaşık geçiş, tropikal takvimden farklı olarak ocak ortalarına kadar uzanır."}]
  },
  {
    slug: "oglak", name: "Oğlak", latin: "Capricornus", iau: "Cap", glyph: "♑", emoji: "△", dates: "yaklaşık 20 Ocak – 16 Şubat", accent: "#a9b7c9",
    keywords: ["yapı", "sorumluluk", "zaman"], stars: ["Deneb Algedi", "Dabih", "Nashira"],
    astronomy: "Oğlak görece sönük bir ekliptik takımyıldızıdır. Şehir ışıklarından uzakta üçgenimsi deseni daha rahat seçilir; Güneş kış ortasında bu bölgede görünür.",
    history: "Keçi-balık birleşimi Mezopotamya kökenli çok eski bir figürdür. Kara ile suyu birleştiren biçim, zamanla dayanıklılık ve düzen kurma sembolleriyle yorumlandı.",
    interpretation: "Oğlak sembolü uzun vadeli yapı, sorumluluk ve sınırların bilinçli kullanımıdır. Disiplin güvenilir sonuç verir; değeri yalnız başarıyla ölçmek iç dünyayı ihmal edebilir.",
    characterAnalysis: [
      "Oğlak karakteri genel olarak ciddi, dayanıklı ve uzun vadeli düşünmeye yatkındır. Bir hedefin yalnız heyecanla değil zaman, emek ve sorumlulukla gerçekleşeceğini bilir. Zor koşullarda düzen kurabilmesi, kaynakları planlaması ve başkalarının güvenebileceği bir yapı oluşturması onu doğal olarak yetki ve sorumluluk üstlenen kişi hâline getirebilir.",
      "Baskı altında duygularını erteleyebilir, her yükü tek başına taşıyabilir veya kendisini yalnız başarısıyla değerlendirebilir. Oğlak’ın olgun hâli disiplinle katılığı birbirinden ayırır. Yardım istemenin yetersizlik olmadığını kabul eder, dinlenmeyi planın bir parçası sayar ve hedeflerini iç tatminle birlikte değerlendirir. Böylece otoritesi korkudan değil deneyim, tutarlılık ve güvenilirlikten doğar."
    ],
    sun: "Güneş Oğlak bölgesindeyse kişi kimliğini ustalık, süreklilik ve somut bir yapı bırakma üzerinden kurabilir.",
    moon: "Ay Oğlak bölgesindeyse duygusal güven yeterlilik, düzen ve sorumluluk paylaşımıyla desteklenebilir; ihtiyaçları ertelememek önemlidir.",
    ascendant: "Yükselen Oğlak bölgesindeyse ilk izlenim ciddi, temkinli, güvenilir veya hedef odaklı olabilir.",
    balance: "Başarı ölçüsünü dinlenme, bağ ve iç tatminle genişletmek; her yükü tek başına taşımamak.",
    questions: [{q:"Capricornus neden keçi-balık olarak çizilir?",a:"Figür, Mezopotamya gök geleneğinde kara ve su özelliklerini birleştiren eski bir simgedir."},{q:"Oğlak takımyıldızını görmek kolay mı?",a:"Parlak yıldızları azdır; karanlık gökyüzü ve uygun mevsim gözlemi kolaylaştırır."}]
  },
  {
    slug: "kova", name: "Kova", latin: "Aquarius", iau: "Aqr", glyph: "♒", emoji: "≈", dates: "yaklaşık 16 Şubat – 12 Mart", accent: "#65d6ef",
    keywords: ["sistem", "yenilik", "topluluk"], stars: ["Sadalsuud", "Sadalmelik", "Skat"],
    astronomy: "Kova geniş fakat çoğunlukla sönük yıldızlardan oluşan ekliptik takımyıldızıdır. Gökyüzünün 'su' temalı Balık, Balina ve Güney Balığı bölgelerine komşudur.",
    history: "Su taşıyan insan figürü, taşkınlar ve mevsimsel su döngüleriyle ilişkilendirilen çok eski bir gök motifidir. Daha sonraki yorumlar topluma dağıtılan bilgi ve yaşam kaynağı anlamını ekledi.",
    interpretation: "Kova sembolü bireysel fikri daha geniş bir sisteme bağlama ve alışılmış düzeni yeniden düşünme kapasitesidir. Yenilik paylaşılabilir olduğunda değerlidir; yalnız karşı çıkmak için karşı çıkmak bağları zayıflatır.",
    characterAnalysis: [
      "Kova karakteri genel olarak bağımsız düşünen, özgün ve sistemlerin nasıl çalıştığını merak eden bir yapıya sahiptir. Alışılmış yöntemin dışında bir seçenek görebilir; kişisel fikrini daha geniş bir toplumsal faydayla birleştirmek ister. Farklı insanları ortak bir düşünce çevresinde buluşturması ve gelecekte işe yarayabilecek modeli bugünden tasarlaması bu profilin güçlü tarafıdır.",
      "Duygusal baskıda mesafe koyabilir, anlaşılmadığını düşündüğünde bağını açıklamadan geri çekebilir veya yalnız farklı olmak uğruna mevcut olanı reddedebilir. Kova’nın olgun hâli bağımsızlığını ilişkisizlikle karıştırmaz. Fikrini insanların gerçek ihtiyaçlarıyla sınar, yakınlığa alan açarken kişisel sınırını korur ve yeniliği yalnız düşüncede değil, uygulanabilir ve paylaşılabilir bir düzende somutlaştırır."
    ],
    sun: "Güneş Kova bölgesindeyse kimlik özgün fikir, toplumsal katkı ve bağımsız düşünme çevresinde belirginleşebilir.",
    moon: "Ay Kova bölgesindeyse duyguları anlamak için mesafe ve zihinsel çerçeve gerekebilir; aidiyet özgür alanla birlikte istenir.",
    ascendant: "Yükselen Kova bölgesindeyse ilk izlenim özgün, mesafeli, arkadaşça veya beklenmedik olabilir.",
    balance: "Fikri insan deneyimiyle temas ettirmek; bağımsızlık ile karşılıklı sorumluluk arasında işleyen bir düzen kurmak.",
    questions: [{q:"Kova bir su burcu mu?",a:"Klasik astrolojide Kova hava elementiyle ilişkilendirilir; figürün su taşıması tarihsel simgedir. Takımyıldızın kendisinin elementi yoktur."},{q:"Kova takımyıldızı neden zor görülür?",a:"Geniş alana yayılmış yıldızlarının çoğu parlak değildir; ışık kirliliği deseni seçmeyi güçleştirir."}]
  },
  {
    slug: "balik", name: "Balık", latin: "Pisces", iau: "Psc", glyph: "♓", emoji: "◇", dates: "yaklaşık 12 Mart – 19 Nisan", accent: "#77a6ff",
    keywords: ["sezgi", "bağlantı", "akış"], stars: ["Alpherg", "Alrescha", "Fumalsamakah"],
    astronomy: "Balık, ekliptik üzerinde geniş ve sönük bir takımyıldızdır. Günümüzde ilkbahar ekinoksu doğrultusu bu bölgede bulunur; presesyonun klasik burç-takımyıldız ayrımındaki rolünü anlamak için iyi bir örnektir.",
    history: "Bir iple bağlı iki balık figürü, Mezopotamya ve Helenistik anlatı katmanlarında farklı biçimlerde görüldü. Bağ, kaçış, su ve döngü imgeleri zamanla sembole eklendi.",
    interpretation: "Balık sembolü sınırlar arasındaki geçişi, empatiyi ve görünmeyen bağlantıları sezme eğilimini anlatır. Duyarlılık yaratıcılık üretir; sınırların belirsizleşmesi tükenmeye yol açabilir.",
    characterAnalysis: [
      "Balık karakteri genel olarak duyarlı, sezgisel ve hayal gücü yüksek bir yapıya sahiptir. İnsanların açıkça söylemediği duyguları, ortamın değişen havasını ve farklı deneyimler arasındaki görünmez bağı fark edebilir. Sanat, merhamet ve anlam arayışı onun için kaçış olmak zorunda değildir; karmaşık bir duyguyu başkalarının da hissedebileceği bir biçime dönüştürme gücüdür.",
      "Sınırlar belirsizleştiğinde başkasının yükünü kendi duygusu sanabilir, karar vermeyi erteleyebilir veya rahatsız edici gerçeklerden uzaklaşmak için hayal dünyasına çekilebilir. Balık’ın olgun hâli duyarlılığını korurken yönünü kaybetmez. Sezgisini doğrulanabilir bilgiyle destekler, neye evet ve hayır dediğini açıklaştırır ve şefkatini kendisini tüketmeden sürdürebileceği somut bir davranışa dönüştürür."
    ],
    sun: "Güneş Balık bölgesindeyse kimlik hayal gücü, anlam, merhamet veya yaratıcı ifade üzerinden akış kazanabilir.",
    moon: "Ay Balık bölgesindeyse ortamın duygusal tonu güçlü hissedilebilir; yalnız kalma, sanat ve dinlenme duyguları işlemeye yardımcı olabilir.",
    ascendant: "Yükselen Balık bölgesindeyse ilk izlenim yumuşak, sezgisel, uyarlanabilir veya anlaşılması güç olabilir.",
    balance: "Empatiyi açık sınırlarla korumak; sezgiyi doğrulanabilir bilgi ve somut eylemle birlikte kullanmak.",
    questions: [{q:"Ekinoks neden artık Koç'ta değil?",a:"Dünya'nın dönme eksenindeki presesyon nedeniyle ekinoks doğrultusu yüzyıllar içinde arka plan yıldızlarına göre kayar."},{q:"Balık tarihleri neden klasik sistemden farklı?",a:"Klasik sistem mevsimlere sabit 30 derecelik burçlar kullanır; bu site IAU takımyıldız bölgesini hesaplar."}]
  }
];

export const signByIau = Object.fromEntries(zodiacSigns.map((sign) => [sign.iau, sign]));
export const signBySlug = Object.fromEntries(zodiacSigns.map((sign) => [sign.slug, sign]));

export const sources = [
  { name: "Astronomy Engine", href: "https://github.com/cosinekitty/astronomy", note: "Güneş, Ay, koordinat dönüşümleri, Ay fazı ve takımyıldız sorguları" },
  { name: "International Astronomical Union", href: "https://iauarchive.eso.org/public/themes/constellations/", note: "88 modern takımyıldız ve resmî gökyüzü sınırları" },
  { name: "OpenStreetMap Nominatim", href: "https://nominatim.org/", note: "Kullanıcının yazdığı yer adını enlem ve boylama dönüştürme" },
  { name: "JPL Horizons", href: "https://ssd.jpl.nasa.gov/horizons/", note: "Bağımsız efemeris karşılaştırmaları için başvuru kaynağı" }
];
