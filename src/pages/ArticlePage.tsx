import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArticleBySlug, fetchArticle, ArticleMeta } from '../data/articles'
import MarkdownRenderer from '../components/MarkdownRenderer'

interface ArticlePageProps {
  category: 'learning' | 'photography' | 'painting'
}

const categoryLabels = {
  learning: '专业学习',
  photography: '摄影',
  painting: '绘画',
}

export default function ArticlePage({ category }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<ArticleMeta | undefined>()
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    // 先从本地静态数据获取元信息
    const meta = getArticleBySlug(slug || '')
    setArticle(meta)

    // 尝试从 Supabase 获取文章内容（含正文）
    fetchArticle(slug || '').then((remote) => {
      if (remote) {
        setArticle(remote)
        if (remote.content) setContent(remote.content)
      }
    })
  }, [slug])

  if (!article) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">文章未找到</h2>
        <p className="text-gray-500 mb-6">您查找的文章不存在或已被移除。</p>
        <Link
          to={`/${category}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回{categoryLabels[category]}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* 面包屑导航 */}
      <div className="flex items-center text-sm text-gray-400 mb-6 space-x-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">首页</Link>
        <span>/</span>
        <Link to={`/${category}`} className="hover:text-blue-600 transition-colors">
          {categoryLabels[category]}
        </Link>
        <span>/</span>
        <span className="text-gray-600">{article.title}</span>
      </div>

      {/* 文章头部 */}
      <header className="mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            category === 'learning' ? 'bg-blue-100 text-blue-700' :
            category === 'photography' ? 'bg-gray-100 text-gray-700' :
            'bg-amber-100 text-amber-700'
          }`}>
            {categoryLabels[category]}
          </span>
          {article.tags?.map((tag) => (
            <span key={tag} className="text-xs text-gray-400">#{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center text-sm text-gray-400 space-x-4">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      {/* 文章正文 */}
      {content ? (
        <MarkdownRenderer content={content} />
      ) : (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        </div>
      )}

      {/* 文章底部导航 */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          to={`/${category}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回{categoryLabels[category]}
        </Link>
      </footer>
    </div>
  )
}
