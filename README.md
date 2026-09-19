# RealHoroscope

RealHoroscope; Güneş, Ay, yükselen ve ilgili aksları 13 IAU takımyıldız bölgesiyle eşleştiren Türkçe bir gökyüzü atlası ve yorum platformudur. Bu sürüm standart **Next.js 16 + Node.js + PostgreSQL** uygulamasıdır ve Render üzerinde çalışmak için hazırlanmıştır.

## Gereksinimler

- Node.js `22.13.0` veya üstü (Render ayarı: `22.22.0`)
- pnpm `11.25.0`
- PostgreSQL

## Yerel geliştirme

1. `.env.example` dosyasını `.env.local` adıyla kopyalayın.
2. `DATABASE_URL`, `ADMIN_PASSWORD` ve `NEXT_PUBLIC_SITE_URL` değerlerini düzenleyin.
3. Aşağıdaki komutları çalıştırın:

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde açılır.

## Production komutları

```bash
pnpm install --frozen-lockfile
pnpm db:migrate
pnpm build
pnpm start
```

`pnpm start`, standart Next.js production sunucusunu `0.0.0.0` üzerinde başlatır. Next.js, Render tarafından sağlanan `PORT` değerini otomatik kullanır.

## Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
| --- | --- | --- |
| `DATABASE_URL` | Evet | PostgreSQL bağlantı adresi. Render veritabanından otomatik bağlanabilir. |
| `ADMIN_PASSWORD` | Evet | `/yonetim` ekranı için en az 12 karakterli, uzun ve benzersiz parola. Sunucu sırrıdır. |
| `NEXT_PUBLIC_SITE_URL` | Evet | Canonical adres. Production değeri `https://realhoroscope.online` olmalıdır. |

Gerçek parolaları veya veritabanı bağlantı adresini GitHub'a yüklemeyin.

## PostgreSQL ve migration

Şema üç işlevi korur:

- `comments`: topluluk yorumları ve moderasyon durumu
- `messages`: iletişim formu kayıtları
- `form_limits`: iletişim, yorum ve yönetim girişi için kalıcı hız sınırı

Migration dosyaları `drizzle/` klasöründedir. Veritabanı oluşturulduktan ve `DATABASE_URL` tanımlandıktan sonra çalıştırın:

```bash
pnpm db:migrate
```

Yeni bir şema değişikliğinde:

```bash
pnpm db:generate
pnpm db:migrate
```

## Render'a kurulum — en kolay yol

Kök dizindeki `render.yaml`, web servisini ve PostgreSQL veritabanını birlikte oluşturur.

1. Bu klasörün içeriğini GitHub repository'nizin köküne yükleyin.
2. Render panelinde **New → Blueprint** seçin.
3. GitHub repository'nizi bağlayın.
4. Render, `realhoroscope` web servisini ve `realhoroscope-db` PostgreSQL veritabanını gösterecektir.
5. İstendiğinde `ADMIN_PASSWORD` için uzun ve benzersiz bir parola girin.
6. **Apply** ile kurulumu başlatın.
7. Pre-deploy aşamasında `pnpm db:migrate` otomatik çalışır.

## Render'a elle kurulum

Blueprint kullanmak istemezseniz:

1. Render → **New → PostgreSQL** ile bir veritabanı oluşturun.
2. Render → **New → Web Service** seçin ve GitHub repository'nizi bağlayın.
3. Runtime olarak **Node** seçin.
4. Aşağıdaki değerleri aynen girin:

```text
Build Command:
pnpm install --frozen-lockfile && pnpm build

Pre-Deploy Command:
pnpm db:migrate

Start Command:
pnpm start

Health Check Path:
/
```

5. Environment bölümüne şunları ekleyin:

```text
NODE_VERSION=22.22.0
DATABASE_URL=<Render PostgreSQL Internal Database URL>
ADMIN_PASSWORD=<uzun-ve-benzersiz-bir-parola>
NEXT_PUBLIC_SITE_URL=https://realhoroscope.online
```

6. `DATABASE_URL` için Render PostgreSQL sayfasındaki **Internal Database URL** değerini kullanın.
7. Deploy'u başlatın. Her deploy'da migration, yeni sürüm başlamadan önce güvenli biçimde uygulanır.

## Custom domain

1. Web Service → **Settings → Custom Domains** bölümünü açın.
2. `realhoroscope.online` alan adını ekleyin.
3. Render'ın gösterdiği DNS kayıtlarını alan adı sağlayıcınızda aynen oluşturun.
4. DNS doğrulaması tamamlanınca Render TLS/HTTPS sertifikasını otomatik hazırlar.
5. `NEXT_PUBLIC_SITE_URL` değerinin `https://realhoroscope.online` olduğunu kontrol edip yeniden deploy edin.
6. Eski hosting adresinizdeki yönlendirmeleri ve daha sonra Search Console/sitemap ayarını yeni domaine taşıyın.

## Yönetim ve güvenlik

- `/yonetim`, `ADMIN_PASSWORD` ile açılır.
- Başarılı giriş yalnızca HttpOnly, SameSite=Strict ve production ortamında Secure cookie oluşturur.
- Parola tarayıcı paketine veya repository'ye yazılmaz.
- İletişim, yorum ve yönetim girişi istekleri PostgreSQL destekli hız sınırına tabidir.
- Formlar aynı-origin kontrolü, gölge alan (honeypot), boyut sınırı ve Zod doğrulaması kullanır.
- Geocoding isteği sunucu üzerinden OpenStreetMap Nominatim'e gönderilir; bir API anahtarı istemciye açılmaz.

## SEO

Canonical, sitemap ve robots adresleri `NEXT_PUBLIC_SITE_URL` temeliyle production domainine yönelir. İçerik, hukuk, kaynak, yöntem, editör ilkeleri ve AdSense hazırlık sayfaları korunmuştur.

## GitHub'a yüklenmeyecekler

`.gitignore`; `node_modules`, `.next`, `.env`, `.env.local`, `.env.production`, loglar ve eski runtime çıktılarını dışarıda bırakır. ZIP içinde gerçek secret bulunmaz.
