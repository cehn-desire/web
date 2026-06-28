import ArticleCard from './ArticleCard'
import { ArticleMeta } from '../data/articles'

interface ArticleListProps {
  articles: ArticleMeta[]
  title: string
  description?: string
}

export default function ArticleList({ articles, title, description }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">暂无文章</h2>
        <p className="text-gray-500">该分类下还没有文章，敬请期待。</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
