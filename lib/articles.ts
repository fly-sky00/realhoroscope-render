export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  updated: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

const articleDrafts: GuideArticle[] = [
  {
    slug: "burc-ve-takimyildiz-farki",
    title: "Burç ile takımyıldız aynı şey mi?",
    description: "Astrolojik burç dilimleri ile astronomideki IAU takımyıldız bölgelerini karıştırmadan anlamanın açık yolu.",
    category: "Temel Kavramlar", readTime: "7 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "İki farklı harita dili", paragraphs: ["Burç ve takımyıldız günlük dilde birbirinin yerine kullanılsa da aynı kavram değildir. Klasik tropikal astroloji, ekliptiği ilkbahar ekinoksundan başlayarak on iki eşit 30 derecelik parçaya ayırır. Bu dilimler mevsimlere bağlıdır ve adlarını tarihsel takımyıldızlardan alır.", "Takımyıldız ise gök küre üzerinde sınırları tanımlanmış bir bölgedir. Modern astronomide gökyüzünün tamamı 88 takımyıldız bölgesine ayrılır. Şekli oluşturan parlak yıldızlar yalnızca bir desen verir; resmî sınır, o desenin çevresindeki gökyüzü alanını da kapsar."] },
      { heading: "Neden sonuçlar farklı çıkar?", paragraphs: ["Dünya'nın dönme ekseni uzun dönemli bir salınım yapar. Presesyon adı verilen bu hareket, ekinoks doğrultusunun arka plan yıldızlarına göre yavaşça kaymasına neden olur. Tropikal burçlar mevsimlere bağlı kaldığı için kaymaz; takımyıldızlar ise gökyüzündeki gerçek yönlerdir.", "RealHoroscope hesaplayıcısı bir kişinin tropikal burcunu yeniden adlandırmaz. Güneş, Ay ve doğu ufku noktasının doğum anında hangi IAU bölgesinde bulunduğunu ayrıca gösterir."] },
      { heading: "Sonucu nasıl okumalı?", paragraphs: ["Sonuç ekranındaki astronomik bölüm ölçülebilir gökyüzü konumunu anlatır. Kişilik ve ilişki açıklamaları ise bu konuma eklenen sembolik yorum katmanıdır. İki katmanı ayırmak, hem hesabı denetlenebilir kılar hem de astrolojik yorumu kesin bilimsel sonuç gibi sunmaktan kaçınır."], bullets: ["Konum: astronomik hesap", "Takımyıldız adı: IAU bölgesi", "Kişilik açıklaması: kültürel ve sembolik yorum"] }
    ]
  },
  {
    slug: "yilanci-neden-on-ucuncu",
    title: "Yılancı neden 13. takımyıldız olarak anılıyor?",
    description: "Ophiuchus'un ekliptiği nasıl kestiğini ve '13. burç' ifadesinin nerede dikkatle kullanılması gerektiğini inceleyin.",
    category: "Yılancı", readTime: "8 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Güneş gerçekten Yılancı'dan geçiyor", paragraphs: ["Güneş'in gökyüzündeki yıllık yolu ekliptik olarak adlandırılır. Ophiuchus takımyıldızının ayak kısmı bu yolu keser. Bu nedenle Güneş, kasım sonundan aralık ortasına uzanan yaklaşık dönemde resmî Yılancı sınırları içinde görünür.", "Bu astronomik durum yeni keşfedilmiş değildir. Tartışma, astronomik takımyıldız bölgeleri ile astrolojinin on iki eşit burç sisteminin aynı şey sanılmasından doğar."] },
      { heading: "13. burç demek ne kadar doğru?", paragraphs: ["'13. burç' popüler ve anlaşılır bir ifadedir; ancak teknik olarak Ophiuchus bir takımyıldızdır. Tropikal astroloji on iki mevsimsel dilim kullanmaya devam edebilir ve kendi sistemi içinde Yılancı'yı eklemek zorunda değildir.", "RealHoroscope, on iki burçlu geleneği geçersiz ilan etmek yerine başka bir soruya cevap verir: Doğum anında gök cismi hangi gerçek takımyıldız bölgesindeydi?"] },
      { heading: "Sembolik yorumun sınırı", paragraphs: ["Yılancı için şifa ve dönüşüm temaları tarihsel yılan taşıyan figürden türetilir. Buradaki şifa sözcüğü tıbbi iddia değildir. Sağlıkla ilgili kararlar astrolojik yorumlara göre verilmemelidir."] }
    ]
  },
  {
    slug: "dogum-saati-yukseleni-nasil-etkiler",
    title: "Doğum saati yükseleni nasıl etkiler?",
    description: "Ufuk geometrisi, konum ve saat dilimi yükselen hesabını neden Güneş burcundan daha hassas hâle getirir?",
    category: "Hesaplama", readTime: "9 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Yükselen bir takvim etiketi değildir", paragraphs: ["Yükselen, doğum anında ekliptiğin doğu ufkuyla kesiştiği noktadır. Dünya döndüğü için bu nokta gün boyunca hızla hareket eder. Aynı şehirde birkaç saat arayla doğan iki kişinin yükselen noktası farklı takımyıldız bölgelerine düşebilir.", "Bu hesap yalnız tarihe bakılarak güvenilir biçimde yapılamaz. Yerel saat, doğum yeri, enlem-boylam ve o tarihte geçerli olan saat dilimi birlikte ele alınmalıdır."] },
      { heading: "Saat dilimi neden kritik?", paragraphs: ["Doğum belgesindeki saat yerel sivil saattir; efemeris hesapları ise UTC ile çalışır. Türkiye'nin 2016 öncesindeki yaz-kış saati uygulamaları veya başka ülkelerin tarihsel değişiklikleri sabit UTC seçeneğiyle doğru temsil edilemez.", "Yeni hesaplayıcı bu nedenle IANA saat dilimi adlarını kullanır. Europe/Istanbul gibi bir bölge adı, tarayıcının tarihsel saat dilimi veritabanıyla seçilen tarihin gerçek UTC karşılığını bulmaya yardımcı olur."] },
      { heading: "Saat bilinmiyorsa ne yapılmalı?", paragraphs: ["Doğum saati bilinmiyorsa Güneş ve çoğu gün için Ay takımyıldızı yine hesaplanabilir; fakat yükselen sonucu güvenilir kabul edilmemelidir. Yaklaşık saat girmek yerine sonucu 'tahmini' olarak açıkça işaretlemek daha dürüsttür."], bullets: ["Doğum belgesini veya hastane kaydını kontrol edin", "Saat yaklaşık ise bunu sonuç notunda belirtin", "Sınır yakınında farklı saatlerle sonucu karşılaştırın"] }
    ]
  },
  {
    slug: "iau-takimyildiz-sinirlari",
    title: "IAU takımyıldız sınırları neyi gösterir?",
    description: "Gökyüzünün 88 resmî bölgeye nasıl ayrıldığını ve hesaplayıcının bu sınırları nasıl kullandığını öğrenin.",
    category: "Astronomi", readTime: "8 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Yıldız resmi değil, gökyüzü adresi", paragraphs: ["Bir takımyıldız dendiğinde akla yıldızları birleştiren çizimler gelir. Modern kullanımda takımyıldız aynı zamanda gökyüzünde koordinat sınırları belirlenmiş bir bölgedir. Böylece herhangi bir gök noktasının hangi takımyıldıza ait olduğu tek anlamlı biçimde söylenebilir.", "Bugün kullanılan sınırlar Uluslararası Astronomi Birliği sistemi içinde standartlaşmıştır. Sınırlar eşit alanlı değildir ve astrolojik 30 derecelik burç dilimleriyle örtüşmek zorunda değildir."] },
      { heading: "Ekliptikle kesişim", paragraphs: ["Güneş'in merkezi yıl boyunca ekliptik üzerinde ilerler. Ay ve gezegenler de bu yolun yakınında hareket eder. Ekliptiğin geçtiği IAU bölgeleri aynı uzunlukta olmadığı için Güneş bazı takımyıldızlarda daha uzun, bazılarında daha kısa süre kalır.", "Akrep'in kısa, Başak'ın uzun görünmesi hesap hatası değil; sınır geometrisinin doğal sonucudur."] },
      { heading: "Hesaplayıcıdaki kullanım", paragraphs: ["Astronomy Engine önce seçilen anda Güneş veya Ay için ekvatoryal koordinat üretir. Ardından sağ açıklık ve dik açıklık değerlerinden gökyüzü bölgesi sorgulanır. Sonuç sayfasında IAU kısaltmasını göstermemizin nedeni işlemi denetlenebilir kılmaktır."] }
    ]
  },
  {
    slug: "presesyon-ve-koc-noktasi",
    title: "Presesyon ve Koç noktası: Gökyüzü neden kaymış görünüyor?",
    description: "Dünya ekseninin uzun dönemli hareketinin tropikal burçlarla takımyıldızları nasıl ayırdığını anlayın.",
    category: "Astronomi", readTime: "7 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Dönen bir topacın yavaş salınımı", paragraphs: ["Dünya yalnız kendi ekseni çevresinde dönmez; dönme ekseninin yönü de çok uzun bir döngü boyunca yavaşça değişir. Bu harekete eksen presesyonu denir. Sonuç, gök ekvatoru ile ekliptiğin kesişim doğrultularının arka plan yıldızlarına göre yer değiştirmesidir.", "İlkbahar ekinoksu tropikal astrolojide her zaman 0 derece Koç kabul edilir. Ancak bu yönün arkasındaki takımyıldız tarih boyunca değişir."] },
      { heading: "Tropikal sistem yanlış mı?", paragraphs: ["Hayır; iki sistem farklı referans kullanır. Tropikal zodyak mevsimsel döngüyü on iki eşit parçaya böler. Takımyıldız tabanlı yaklaşım ise gökyüzündeki resmî bölgeleri sorar. Birinin cevabı diğerinin hesap hatası değildir.", "Karışıklık, iki yöntemin de aynı Türkçe burç adlarını kullanmasından kaynaklanır. Bu sitede sonuç başlıklarında 'IAU takımyıldızı' ifadesini özellikle koruyoruz."] },
      { heading: "Pratik sonuç", paragraphs: ["Doğum anındaki Güneş'in tropikal burcu ile bulunduğu takımyıldız çoğu kullanıcıda farklı ad taşır. Karşılaştırma aracı iki sonucu yan yana göstererek yöntemi görünür hâle getirir."] }
    ]
  },
  {
    slug: "ay-burcu-neden-hizli-degisir",
    title: "Ay takımyıldızı neden hızlı değişir?",
    description: "Ay'ın yaklaşık aylık gökyüzü turu, doğum saati hassasiyeti ve faz açısı arasındaki farklar.",
    category: "Ay", readTime: "6 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Ay'ın hızlı gökyüzü hareketi", paragraphs: ["Ay, arka plan yıldızlarına göre yaklaşık 27,3 günde bir gökyüzü turu tamamlar. Bu nedenle bir takımyıldız bölgesinden diğerine Güneş'ten çok daha hızlı geçer. Sınır günlerinde birkaç saatlik fark bile bölge adını değiştirebilir.", "Ay fazı ise ayrı bir ölçüdür. Faz, Güneş ile Ay'ın Dünya'dan görülen açısal ilişkisini anlatır; Ay'ın hangi takımyıldızda olduğunu söylemez."] },
      { heading: "Doğum haritasında iki farklı bilgi", paragraphs: ["Sonuç ekranında Ay için hem takımyıldız adı hem de faz bilgisi gösterilir. Takımyıldız gökyüzü adresi, faz ise aydınlık görünüm döngüsüdür. Yeni Ay yaklaşık 0 derece, Dolunay yaklaşık 180 derece faz açısına karşılık gelir."] },
      { heading: "Sembolik okuma", paragraphs: ["Astrolojik gelenekte Ay duygusal refleksler ve güven ihtiyacıyla ilişkilendirilir. Bu yorum kültürel bir sembol dilidir; astronomik hesap yalnız Ay'ın konumu ve fazıyla ilgilidir."] }
    ]
  },
  {
    slug: "efemeris-nedir",
    title: "Efemeris nedir ve neden sabit tarih tablosundan daha iyidir?",
    description: "Gök cisimlerinin belirli bir andaki konumlarını hesaplayan modellerin, sınır günlerinde sağladığı fark.",
    category: "Hesaplama", readTime: "8 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Zamana bağlı gökyüzü tablosu", paragraphs: ["Efemeris, bir gök cisminin belirli tarihlerdeki konumunu veren veri veya hesaplama sistemidir. Basılı efemerisler tablolar hâlindeyken modern yazılımlar seçilen an için koordinatları doğrudan hesaplar.", "Sabit 'şu tarihler arasında bu burç' listesi yaklaşık bilgi sağlar. Güneş'in sınırı geçtiği kesin an her yıl aynı yerel saate denk gelmediğinden, sınırda doğanlar için efemeris gerekir."] },
      { heading: "RealHoroscope hangi aracı kullanıyor?", paragraphs: ["Platform, açık kaynak Astronomy Engine kütüphanesini kullanır. Kütüphane Güneş ve Ay konumları, koordinat dönüşümleri, Ay fazı ve takımyıldız sorgusu gibi işlemler sunar. Proje, sonuç ekranında kullanılan zamanı UTC olarak da göstererek hesabın tekrar edilebilmesini amaçlar.", "Konum aramasından elde edilen enlem-boylam özellikle yükselen hesabında kullanılır. Aynı UTC anında Güneş ve Ay’ın Dünya merkezinden hesaplanan konumu şehir değişince değişmez. Şehir, yerel saatin UTC’ye çevrilmesini ve yükselenin ufuk geometrisini etkiler."] },
      { heading: "Doğruluk ne demek?", paragraphs: ["Astronomik koordinatın yüksek doğrulukla hesaplanması, bu koordinata eklenen kişilik yorumunun bilimsel olarak kanıtlandığı anlamına gelmez. Platform iki katmanı açıkça ayırır ve yorumları farkındalık/eğlence çerçevesinde sunar."] }
    ]
  },
  {
    slug: "sonucumu-nasil-okurum",
    title: "Güneş, Ay, yükselen ve aks sonucumu nasıl okurum?",
    description: "Hesaplama ekranındaki dört katmanı karıştırmadan, adım adım ve sınırlarını bilerek okuyun.",
    category: "Başlangıç", readTime: "10 dk", updated: "19 Eylül 2026",
    sections: [
      { heading: "Önce astronomik satırı okuyun", paragraphs: ["Her sonuç kartında Türkçe sembolik adın yanında Latince IAU adı ve üç harfli kısaltma bulunur. Önce bu satıra bakın: Bu, seçilen anda hesaplanan gökyüzü bölgesidir. Ardından sembolik açıklamayı ayrı bir yorum katmanı olarak değerlendirin."] },
      { heading: "Güneş ve Ay", paragraphs: ["Güneş kartı kimlik ve görünür yön için kullanılan sembolik temayı; Ay kartı duygusal ritim ve güven dili için kullanılan temayı verir. Astronomik olarak ikisi farklı hızlarla hareket ettiği için aynı takımyıldızda olmak zorunda değildir."] },
      { heading: "Yükselen ve Kök Aks", paragraphs: ["Yükselen, doğu ufkunda hesaplanan ekliptik noktadır. Bu noktanın tam karşısında Kök Aks bulunur. İkisi yükselen–Kök Aks hattını oluşturur. Bu platformda yükselen, dış dünyaya giriş biçimini; Kök Aks ise geçmiş deneyimlerden kazanılmış, yeterince fark edilmemiş veya kullanılmadığı için sönük kalmış yetenek ve potansiyeli temsil eder."] },
      { heading: "Güneş ekseni ve Gölge Aks", paragraphs: ["Güneş’in 180 derece karşısındaki nokta Gölge Aks olarak adlandırılır. Sonuç kartında yalnızca bu karşıt noktanın takımyıldızı yazılır; iki noktayı birleştiren çizgi Güneş–Gölge Aks hattıdır. Bu ad standart astronomi terimi değil, RealHoroscope'un yorum modelidir. Sonuç ekranındaki yöntem bağlantısı bu ayrımı açıklar."] },
      { heading: "Sonuç kesin hüküm değildir", paragraphs: ["Doğum saati belirsizliği yükseleni değiştirebilir. Konum bulunamazsa sistem varsayılan şehir uydurmaz; yükselen hesabını durdurur. Sembolik açıklamalar kişilik testi, sağlık önerisi veya gelecek tahmini değildir."], bullets: ["UTC zamanını kontrol edin", "Şehir ve ülke sonucunu doğrulayın", "Saat yaklaşık ise farklı olasılıkları deneyin", "Yöntem sayfasındaki sınırlamaları okuyun"] }
    ]
  }
];

const articleExpansions:Record<string,GuideArticle['sections']>={
  'burc-ve-takimyildiz-farki':[
    {heading:'Aynı doğum bilgisiyle iki doğru sonuç nasıl çıkar?',paragraphs:["Örneğin tropikal sistemde Koç kabul edilen bir tarih, gerçek gökyüzü sınırlarıyla hesaplandığında Balık takımyıldızına düşebilir. Burada iki programın aynı soruya farklı cevap vermesi söz konusu değildir: biri mevsimsel dilimi, diğeri gök cisminin arkasındaki IAU bölgesini söyler.","Sonucunuzu karşılaştırırken önce yöntemin adını kontrol edin. ‘Tropikal’, ‘sidereal’ ve ‘IAU takımyıldızı’ aynı hesap değildir. RealHoroscope’un ekranda tropikal karşılığı ayrıca göstermesi, farkın kaynağını görünür kılmak içindir."]},
    {heading:'Hızlı kontrol listesi',paragraphs:["Bir sonuç size beklenmedik geldiyse doğum tarihini, yerel saati, doğum yerini ve saat dilimini sırayla kontrol edin. Ardından aynı UTC anını güvenilir bir efemerisle karşılaştırın. Yalnız burç adı üzerinden doğrulama yapmak, kullanılan referans sistemini gözden kaçırmanıza neden olabilir."],bullets:['Mevsimsel dilim mi, IAU bölgesi mi?','Saat yerel saat mi, UTC mi?','Sınır gününde saat ve yıl doğru mu?','Ay ve yükselen için doğum yeri girilmiş mi?']},
    {heading:'En sık yapılan yorum hatası',paragraphs:["Takımyıldız sonucunu, alışılmış burcun yerine geçen daha ‘gerçek’ bir kişilik etiketi saymak iki yöntemi yine birbirine karıştırır. Astronomik doğruluk konum hesabına aittir; kişilik anlamı yorum geleneğinin parçasıdır. Bu nedenle bir IAU sonucunu okurken önce gökyüzü adresini, sonra o adrese eklenen kültürel temayı ayrı değerlendirin.","İki sistemden hangisinin size daha çok benzediğini seçmek bilimsel bir doğrulama yöntemi değildir. Daha yararlı yaklaşım, her sistemin hangi referansla çalıştığını bilmek ve yorumları kesin hüküm yerine düşünme aracı olarak kullanmaktır."]}
  ],
  'yilanci-neden-on-ucuncu':[
    {heading:'Neden her gezegen için aynı sıklıkta görünmez?',paragraphs:["Güneş ekliptik üzerinde ilerlediği için Yılancı sınırlarından düzenli olarak geçer. Ay ve gezegenler ekliptiğin biraz kuzeyine ya da güneyine çıkabildiğinden gerçek IAU bölgeleri daha karmaşık olabilir. Bir noktanın Yılancı çıkması, otomatik olarak klasik astrolojide yeni bir burç eklendiği anlamına gelmez.","Hesaplayıcı önce astronomik bölgeyi korur. Yorum katmanında ise yalnız tanımlanmış 13 ekliptik profil kullanılır; komşu bir bölgeye düşen Ay noktası varsa bu durum sonuçta ayrıca açıklanır."]},
    {heading:'Yılancı sonucunu nasıl okumalı?',paragraphs:["Yılancı vurgusunu ‘özel’ veya ‘üstün’ bir kimlik etiketi gibi değil; araştırma, onarım ve deneyimden anlam çıkarma teması olarak ele alıyoruz. Bu tema, kişinin başkalarının yükünü üstlenmesi gerektiğini söylemez. Tam tersine, dönüşüm isteğinin sınır ve sorumluluk duygusuyla dengelenmesi gerekir."]},
    {heading:'Sınır tarihleri neden yaklaşık verilir?',paragraphs:["Güneş’in Ophiuchus sınırına girdiği UTC anı her yıl aynı yerel saate düşmez. Saat dilimi de tarihi takvimde bir önceki ya da sonraki güne taşıyabilir. Bu yüzden 29 Kasım veya 18 Aralık gibi tarihler kesin kişilik sınırı değil, genel gözlem aralığıdır.","Sınır gününde doğan bir kişi için yalnız doğum gününe bakmak yeterli değildir. Yıl, saat ve saat dilimiyle hesaplanan Güneş koordinatı kullanılmalı; sonuç başka bir bölge çıkarsa takvim tablosu değil anlık hesap esas alınmalıdır."]}
  ],
  'dogum-saati-yukseleni-nasil-etkiler':[
    {heading:'Yurt dışında doğanlar için doğru sıra',paragraphs:["Önce doğum belgesindeki şehir ve ülkeyi bulun, ardından o şehre ait enlem-boylamı seçin. Saat diliminde bugün yaşadığınız yeri değil, doğum yerinin bölgesini seçin. Örneğin New York için America/New_York, Paris için Europe/Paris kullanılmalıdır.","IANA bölge adları tarihsel yaz-kış saati değişikliklerini tarihe göre uygular. Doğum kaydında UTC farkı açıkça yazıyorsa sabit fark seçeneği kullanılabilir; aksi hâlde yalnız boylama bakarak UTC farkı tahmin etmek doğru değildir."]},
    {heading:'On beş dakika neyi değiştirebilir?',paragraphs:["Yükselen noktası gün boyunca hızlı ilerler, fakat takımyıldız sınırları eşit genişlikte değildir. Bu nedenle on beş dakikalık fark bazen etiketi değiştirmezken sınır yakınında sonucu değiştirebilir. En sağlıklı yöntem, belirsiz saati kesinmiş gibi sunmak yerine olası aralığın başı ve sonuyla iki ayrı hesap yapmaktır."]},
    {heading:'Ülke adı neden tek başına yetmez?',paragraphs:["Geniş ülkelerde aynı anda birden fazla saat dilimi kullanılır. Amerika Birleşik Devletleri, Kanada, Avustralya ve Rusya gibi ülkelerde yalnız ülke seçmek UTC dönüşümü için yeterli değildir. Şehir veya bölge adı mutlaka doğum yeriyle eşleşmelidir.","Aynı şehir zaman içinde saat dilimi kuralını değiştirmiş olabilir. IANA bölge adı, sabit UTC farkından farklı olarak tarihsel kuralı seçilen doğum tarihine uygular. Bu nedenle bugünkü saat farkını geçmiş doğuma doğrudan taşımamak gerekir."]}
  ],
  'iau-takimyildiz-sinirlari':[
    {heading:'Sınırlar neden eğri veya basamaklı görünür?',paragraphs:["IAU sınırları tarihsel yıldız atlaslarından devralınan bölgeleri standartlaştırmak için gök koordinatlarına göre çizildi. Küre üzerindeki bu çizgiler modern koordinat dönüşümleriyle görüntülendiğinde harita projeksiyonuna bağlı olarak eğri ya da basamaklı görünebilir.","Bir yıldız figürünün tanıdık çizimi sınırın tamamını göstermez. Gök cisminin parlak yıldızlara görsel olarak uzak görünmesi, başka bir IAU bölgesinde olduğu anlamına gelmeyebilir; karar koordinatın resmî sınır içinde kalıp kalmadığına göre verilir."]},
    {heading:'Sonuç nasıl doğrulanır?',paragraphs:["Aynı UTC anı için gök cisminin sağ açıklık ve dik açıklık değerleri alınır; ardından IAU bölge sorgusuyla karşılaştırılır. Yükselen için önce doğu ufku kesişimi bulunur. Bu yüzden yükselen doğrulaması yalnız Güneş ve Ay tablosuna bakılarak yapılamaz."]},
    {heading:'Sınırda bulunan bir nokta nasıl ele alınır?',paragraphs:["Koordinat tam sınıra çok yakınsa birkaç dakikalık zaman veya küçük konum farkı bölge adını değiştirebilir. Böyle bir sonuçta iki olasılığı da görmek, tek etiketi kesinleştirmekten daha açıklayıcıdır. Hesap kaydındaki UTC ve koordinatlar bu kontrolün tekrarlanmasını sağlar.","IAU bölgesi değişse bile gök cisminin konumu bir anda büyük bir sıçrama yapmaz; değişen, koordinatın hangi adlandırılmış alan içinde kaldığıdır. Bu ayrım sınır sonuçlarını dramatikleştirmeden okumaya yardımcı olur."]}
  ],
  'presesyon-ve-koc-noktasi':[
    {heading:'Kayma neden her yıl fark edilmiyor?',paragraphs:["Presesyon insan ömrüne göre çok yavaştır; ekinoks doğrultusu yılda yaklaşık 50 yay saniyesi ilerler. Günlük kullanımda tarihlerin bir anda değiştiği görülmez. Fark, yüzyıllar boyunca biriktiğinde tarihsel takımyıldız adıyla bugünkü arka plan bölgesi ayrışır.","Bu hareket yıldızların kısa sürede yer değiştirmesi değildir. Değişen, Dünya’nın dönme ekseninin uzaydaki yönüdür. Dolayısıyla mevsimlerin başlangıcı korunurken o doğrultunun arkasında görülen yıldız alanı yavaşça değişir."]},
    {heading:'Haritanız açısından anlamı',paragraphs:["IAU tabanlı sonuç, presesyonu ayrıca bir düzeltme düğmesiyle eklemez; hesaplanan güncel koordinat zaten gök cisminin gerçek doğrultusunu verir. Tropikal karşılık ise karşılaştırma amacıyla mevsimsel 30 derecelik dilim olarak ayrı gösterilir."]},
    {heading:'Presesyon yıldızların hareketi midir?',paragraphs:["Yıldızların kendi uzay hareketleri vardır, ancak zodyak tartışmasındaki büyük tarihsel kaymanın ana nedeni bu değildir. Presesyon, Dünya ekseninin yön değiştirmesiyle koordinat başlangıç noktasının arka plan göğüne göre ilerlemesidir.","Bu nedenle ‘burçlar kaydı’ ifadesi gündelik anlatımda kullanılabilse de teknik olarak eksik kalır. Tropikal dilimler mevsimlere sabit tutulur; arka plandaki IAU takımyıldızlarıyla örtüşme değişir. RealHoroscope iki referansı aynı başlık altında eritmek yerine ayrı gösterir."]}
  ],
  'ay-burcu-neden-hizli-degisir':[
    {heading:'Ay neden bazen 13 bölgenin dışına çıkar?',paragraphs:["Ay’ın yörüngesi ekliptiğe yaklaşık beş derece eğiktir. Bu nedenle Ay’ın merkezi her zaman ekliptik çizgisinin tam üzerinde değildir ve zaman zaman 13 ekliptik takımyıldızın komşu bölgelerine düşebilir. Bu, hesap hatası değil gerçek gök enleminin sonucudur.","RealHoroscope astronomik kartta gerçek IAU bölgesini korur. Kişisel yorum için ekliptik üzerindeki aynı boylamın düştüğü 13 profilden biri kullanılırsa sonuç ekranı bu izdüşümü açıkça belirtir."]},
    {heading:'Saat hassasiyetini nasıl kontrol edebilirsiniz?',paragraphs:["Ay sınırına yakın bir doğumda yarım saatlik aralıklarla iki hesap yapın. Bölge adı değişmiyorsa küçük saat belirsizliği Ay sonucunu etkilememiştir. Değişiyorsa doğum belgesindeki saati doğrulamadan tek yoruma kesinlik vermemek gerekir."]},
    {heading:'Ay boylamı, enlemi ve fazı birlikte ne söyler?',paragraphs:["Ekliptik boylam Ay’ın zodyak boyunca ilerlediği yönü, ekliptik enlem bu çizginin ne kadar kuzeyinde veya güneyinde olduğunu gösterir. IAU bölgesi her iki koordinatın gökyüzündeki ortak sonucudur. Faz açısı ise Güneş’le geometrik ilişkiyi anlatır.","Aynı takımyıldızdaki iki Ay farklı fazlarda olabilir; aynı fazdaki iki Ay da farklı takımyıldızlarda bulunabilir. Sonuç ekranında bu bilgilerin ayrı kartlarda verilmesi, duygusal yorumla aydınlanma döngüsünü birbirine karıştırmamak içindir."]}
  ],
  'efemeris-nedir':[
    {heading:'Efemeris ile uygulama sonucu nasıl karşılaştırılır?',paragraphs:["Karşılaştırmada aynı zaman ölçeğini kullanmak gerekir. Doğum kaydındaki yerel saati doğrudan UTC sanmak birkaç saatlik fark yaratır. Önce şehir saat dilimiyle UTC anını bulun; ardından aynı an için Güneş ve Ay koordinatlarını karşılaştırın.","Farklı yazılımlar koordinatı ekliptik boylam, sağ açıklık veya takımyıldız adı olarak gösterebilir. Bu değerler birbirinin doğrudan kopyası değildir; uygun koordinat dönüşümü ve aynı referans tarihi kullanılmalıdır."]},
    {heading:'Sabit tarih tablosu ne zaman yeterlidir?',paragraphs:["Genel bilgi ve takımyıldız geçişlerinin yaklaşık dönemini anlatmak için tablo kullanışlıdır. Sınır günleri, Ay yerleşimi, yükselen ve tarihsel saat dilimi içeren kişisel hesaplarda ise tablo yeterli değildir. Bu ayrım, her kullanıcı için gereksiz kesinlik üretmeden doğru aracı seçmeye yardım eder."]},
    {heading:'İki efemeris neden küçük fark gösterebilir?',paragraphs:["Yazılımlar farklı sayısal modeller, referans düzlemleri veya yuvarlama tercihleri kullanabilir. Birkaç yay saniyelik koordinat farkı çoğu durumda takımyıldız adını değiştirmez; ancak nokta tam sınıra yakınsa küçük fark görünür hâle gelebilir.","Karşılaştırmada yazılım sürümü, zaman ölçeği, Dünya merkezli veya gözlemci merkezli hesap tercihi ve koordinat dönemi not edilmelidir. Yöntem sayfasında kullanılan kütüphane ve sürümün belirtilmesi, bir sonucun neden farklı göründüğünü araştırmayı kolaylaştırır."]}
  ],
  'sonucumu-nasil-okurum':[
    {heading:'Yorumları hangi sırayla birleştirmelisiniz?',paragraphs:["Önce Güneş bölümünü yaşam yönünüz, Ay bölümünü duygusal güven diliniz, yükseleni yeni durumlara giriş biçiminiz olarak okuyun. Aynı ad iki yerde görünüyorsa tema güçlenir fakat iki yerleşimin görevi aynı olmaz: Güneş hedefi, Ay refleksi, yükselen dış tavrı anlatır.","Sonra Kök Aks ile zaten taşıdığınız fakat geri planda kalmış beceriye bakın. Gölge Aks, kendinize yakıştırmadığınız karşıt niteliği; Karanlık Ay ise duygusal savunmanızın karşı ucunu görünür kılar. Ay düğümleri bu tablonun alışılmış ve geliştirilecek yönlerini tamamlar."]},
    {heading:'Tek bir cümleye nasıl indirgenir?',paragraphs:["Sonucunuzu özetlerken ‘Ben buyum’ demek yerine üç parçalı bir cümle kurun: ‘Şuna yöneliyorum, güvende hissetmek için buna ihtiyaç duyuyorum ve dışarıda şöyle görünüyorum.’ Ardından akslardan bir gelişim cümlesi ekleyin. Bu yöntem, etiketleri kesin hükme dönüştürmeden yorumun parçalarını birbirine bağlar."]},
    {heading:'Aksları ceza veya eksiklik gibi okumayın',paragraphs:["Gölge ve Karanlık Ay anlatıları, kişide kötü ya da eksik bir taraf bulunduğunu söylemez. Karşıt uç, tanıdık davranışın tek seçeneğe dönüşmesini engelleyen bir denge olasılığıdır. Kök Aks da geçmişte kalınması gereken bir yük değil, yeniden fark edilebilecek bir beceri alanıdır.","Yorumun yararlı ölçüsü korkutucu olması değil, davranışı daha anlaşılır hâle getirmesidir. Bir açıklama sizi kesin kadere, suçluluğa veya başkası hakkında değişmez hükme götürüyorsa onu kişisel kararlarınızın temeli yapmamak gerekir."]}
  ]
};

export const articles: GuideArticle[] = articleDrafts.map(article => {const sections=[...article.sections,...(articleExpansions[article.slug]??[])];return {...article,sections,readTime:`${Math.max(1,Math.ceil(sections.flatMap(section=>[section.heading,...section.paragraphs,...(section.bullets??[])]).join(" ").split(/\s+/).length/180))} dk`};});

export const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]));
