import { Link } from 'react-router-dom'
import { ArticleMeta } from '../data/articles'

interface ArticleCardProps {
  article: ArticleMeta
}

const categoryConfig = {
  learning: {
    badge: 'bg-blue-100 text-blue-700',
    label: '专业学习',
  },
  photography: {
    badge: 'bg-gray-100 text-gray-700',
    label: '摄影',
  },
  painting: {
    badge: 'bg-amber-100 text-amber-700',
    label: '绘画',
  },
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const config = categoryConfig[article.category]

  return (
    <Link
      to={`/${article.category}/${article.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
    >
      {article.coverImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.badge}`}>
            {config.label}
          </span>
          {article.tags?.map((tag) => (
            <span key={tag} className="text-xs text-gray-400">
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
