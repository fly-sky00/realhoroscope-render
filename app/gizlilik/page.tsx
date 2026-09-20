import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik ve Çerezler",
  description:
    "RealHoroscope'un hesaplama verileri, iletişim kayıtları, çerez tercihleri ve reklam hizmetleri için gizlilik açıklaması.",
  alternates: {
    canonical: "/gizlilik",
  },
};

export default function PrivacyPage() {
  return (
    <main id="ana-icerik" className="page-main">
      <article className="page-narrow prose">
        <p className="eyebrow">Son güncelleme: 20 Eylül 2026</p>

        <h1 className="display !mt-3 text-4xl sm:text-6xl">
          Gizlilik ve çerezler
        </h1>

        <p className="lede">
          Veri toplamayı hizmet için gerekli en düşük düzeyde tutmayı
          amaçlıyoruz. Bu açıklama RealHoroscope üzerinde kullanılan hesaplama,
          iletişim, topluluk, çerez ve reklam hizmetlerinin nasıl çalıştığını
          açıklar.
        </p>

        <h2>Hesaplama verileri</h2>

        <p>
          Doğum tarihi, saat, zaman dilimi ve koordinatlar hesaplama amacıyla
          kullanılır. Kişisel hesap sonucu veritabanına kaydedilmez. Yer
          aramasında yazdığınız şehir ve ülke, koordinat bulmak amacıyla
          OpenStreetMap Nominatim hizmetine iletilebilir; bu hizmetin kendi
          gizlilik ve kayıt politikaları geçerlidir.
        </p>

        <h2>İletişim formu</h2>

        <p>
          Ad, e-posta, konu, mesaj ve gönderim zamanı, iletişim talebinizi
          incelemek ve yanıtlamak amacıyla saklanabilir. Bu bilgiler pazarlama
          listesine otomatik olarak eklenmez. Verilerinizle ilgili erişim veya
          silme talebinizi iletişim formu üzerinden bize iletebilirsiniz.
        </p>

        <h2>Çerezler ve tercihlerin yönetimi</h2>

        <p>
          Site, gerekli teknik işlevlerin yanı sıra reklam ve kullanıcı
          tercihlerinin yönetilmesi amacıyla çerezler ve benzeri teknolojiler
          kullanabilir. Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre'deki
          ziyaretçiler için Google'ın sertifikalı izin yönetimi platformu
          (CMP) kullanılmaktadır.
        </p>

        <p>
          Kullanıcılar izin tercihlerini sunulan mesaj üzerinden belirleyebilir
          ve daha sonra sitenin alt kısmındaki “Çerez tercihlerini değiştir”
          seçeneği üzerinden tercihlerini yeniden yönetebilir.
        </p>

        <h2>Google AdSense ve reklam hizmetleri</h2>

        <p>
          Google AdSense reklam hizmeti kullanılmaktadır. Google ve reklam iş
          ortakları; reklamların sunulması, ölçülmesi, sahtekârlığın önlenmesi
          ve izin verilmesi halinde kişiselleştirilmesi amacıyla çerezler,
          cihaz tanımlayıcıları ve benzeri teknolojiler kullanabilir.
        </p>

        <p>
          Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre'deki
          ziyaretçiler için Google'ın sertifikalı izin yönetimi platformu
          (CMP) kullanılmaktadır. Reklam ve veri işleme tercihleri, kullanıcının
          verdiği izin ve seçtiği gizlilik tercihlerine göre uygulanır.
        </p>

        <h2>Topluluk yorumları</h2>

        <p>
          Görünen adınız, yorumunuz ve gönderim zamanınız moderasyon amacıyla
          saklanır. Onaylanan yorumlar görünen adınızla birlikte herkese açık
          olarak yayımlanabilir. Yorumlarınıza kişisel doğum bilgileri,
          iletişim bilgileri veya başka hassas bilgiler eklememenizi öneririz.
        </p>

        <h2>Gönderim koruması</h2>

        <p>
          Otomatik ve tekrarlayan gönderimleri sınırlandırmak amacıyla kısa
          ömürlü, özetlenmiş istemci anahtarları tutulabilir. Bu koruma
          kayıtlarında ham IP adresinin saklanmaması hedeflenir. Geçici sayaç
          kayıtları belirlenen süre sonunda temizlenir.
        </p>

        <h2>Güvenlik ve saklama</h2>

        <p>
          Form ve topluluk kayıtlarına yalnızca hizmetin işletilmesi,
          moderasyon, güvenlik ve hata incelemesi gibi gerekli amaçlarla
          erişilir. Hukuki bir zorunluluk bulunmadığında artık gerekli olmayan
          kayıtlar makul saklama süresinin ardından silinebilir. İnternet
          üzerinden gerçekleştirilen hiçbir veri aktarımının mutlak güvenliği
          garanti edilemez.
        </p>

        <h2>Üçüncü taraf hizmetleri</h2>

        <p>
          RealHoroscope; barındırma, konum araması, reklam sunumu ve izin
          yönetimi gibi işlevler için üçüncü taraf hizmet sağlayıcılarından
          yararlanabilir. Bu sağlayıcıların kendi gizlilik politikaları ve veri
          işleme koşulları geçerlidir.
        </p>

        <h2>Değişiklikler</h2>

        <p>
          Kullanılan hizmetlerde, reklam sistemlerinde, hesap özelliklerinde
          veya veri işleme yöntemlerinde önemli bir değişiklik olduğunda bu
          gizlilik açıklaması güncellenir. Önemli değişikliklerde sayfanın
          üstündeki son güncelleme tarihi yenilenir.
        </p>
      </article>
    </main>
  );
}