import { useEffect, useState } from 'react'
import ArticleList from '../components/ArticleList'
import { getArticlesByCategory, fetchArticles, ArticleMeta } from '../data/articles'

export default function LearningPage() {
  const [articles, setArticles] = useState<ArticleMeta[]>(() => getArticlesByCategory('learning'))

  useEffect(() => {
    fetchArticles().then((list) => setArticles(list.filter((a) => a.category === 'learning')))
  }, [])

  return (
    <ArticleList
      articles={articles}
      title="专业学习"
      description="记录技术学习、知识管理、效率提升等方面的思考与实践。"
    />
  )
}
