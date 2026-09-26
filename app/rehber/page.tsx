import type { Metadata } from 'next';
import { FullLink as Link } from '@/components/full-link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { articles } from '@/lib/articles';
export const metadata: Metadata = {
  title: "13'lü Zodyak, Akslar ve Astronomi Rehberi",
  description: 'Kök Aks, Gölge Aks, Ay Duygu Ekseni, burç uyumu ve doğum hesabını özgün Türkçe rehberlerle keşfedin. Saat, konum ve yorum farklarını öğrenin.',
  alternates: { canonical: '/rehber' },
};
const groups = [
  { id: 'baslangic', title: 'Temelden başlayın', categories: ['Başlangıç', 'Temel Kavramlar', 'Yılancı'], description: 'Takımyıldız, burç ve grafik arasındaki farkları öğrenin.' },
  { id: 'akslar', title: 'Akslar ve saklı potansiyel', categories: ['Akslar'], description: 'Kök, Gölge ve Karanlık Ay’ı birbirine karıştırmadan okuyun.' },
  { id: 'yorumlama', title: 'Yorum ve ilişkiler', categories: ['Yorumlama', 'İlişkiler'], description: 'Tekrarlanan yerleşimleri ve iki kişilik karşılaştırmaları anlamlandırın.' },
  { id: 'hesaplama', title: 'Doğru veri, anlaşılır hesap', categories: ['Hesaplama'], description: 'Doğum saati, yurt dışı konumları ve sınır sonuçları için kontrol rehberleri.' },
  { id: 'astronomi', title: 'Gökyüzünün geometrisi', categories: ['Astronomi', 'Ay'], description: 'Gökyüzü bölgelerini, presesyonu ve Ay’ın hareketini inceleyin.' },
];
export default function Guides() {
  return <main id="ana-icerik" className="page-main"><div className="site-shell">
    <header className="max-w-3xl"><p className="eyebrow">Öğrenme merkezi · {articles.length} rehber</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">Sonucu görmek kadar yöntemi anlamak da önemli.</h1>
      <p className="lede mt-5">Doğum haritanızı okumak, saklı potansiyelinizi anlamlandırmak ve hesaplamanın dayanaklarını öğrenmek için konuya göre ilerleyin.</p>
    </header>
    <nav aria-label="Rehber konuları" className="mt-6 flex flex-wrap gap-2">{groups.map(group => <a key={group.id} href={`#${group.id}`} className="focus-ring rounded-full border border-violet-200/20 px-4 py-2 text-sm text-violet-100 hover:bg-white/5">{group.title}</a>)}</nav>
    {groups.map(group => <section id={group.id} key={group.id} className="mt-9 scroll-mt-28">
      <h2 className="display text-2xl sm:text-3xl">{group.title}</h2><p className="mt-2 text-sm text-slate-400">{group.description}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{articles.filter(article => group.categories.includes(article.category)).map(article => <Link key={article.slug} href={`/rehber/${article.slug}`} className="panel group p-6 hover:border-violet-300/35">
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-xs font-bold text-cyan-200"><BookOpen size={15}/>{article.category}</span><span className="text-xs text-slate-400">{article.readTime}</span></div>
        <h3 className="mt-4 text-xl font-extrabold leading-snug">{article.title}</h3><p className="mt-3 text-sm text-slate-400">{article.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-200">Rehberi oku <ArrowRight className="transition group-hover:translate-x-1" size={16}/></span>
      </Link>)}</div>
    </section>)}
  </div></main>;
}
