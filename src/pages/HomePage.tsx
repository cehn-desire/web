import HeroSection from '../components/HeroSection'
import CategoryCard from '../components/CategoryCard'
import ArticleCard from '../components/ArticleCard'
import { getRecentArticles } from '../data/articles'

const categories = [
  {
    title: '专业学习',
    description: '记录技术学习、知识管理、效率提升等方面的思考与实践，构建个人成长的知识体系。',
    icon: '📚',
    link: '/learning',
    colorClass: 'text-blue-600',
    bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200',
    count: 2,
  },
  {
    title: '摄影',
    description: '用镜头捕捉光影之美，分享摄影技巧、后期处理和创作心得，记录每一个值得珍藏的瞬间。',
    icon: '📷',
    link: '/photography',
    colorClass: 'text-gray-700',
    bgClass: 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200',
    count: 2,
  },
  {
    title: '绘画',
    description: '从素描到水彩，从临摹到创作。在这里分享绘画学习过程中的技巧、感悟和作品。',
    icon: '🎨',
    link: '/painting',
    colorClass: 'text-amber-600',
    bgClass: 'bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200',
    count: 2,
  },
]

export default function HomePage() {
  const recentArticles = getRecentArticles(3)

  return (
    <div>
      <HeroSection />

      {/* 分类卡片 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">探索领域</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.link} {...cat} />
          ))}
        </div>
      </section>

      {/* 最近文章 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">最新文章</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
