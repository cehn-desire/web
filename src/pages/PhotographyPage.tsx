import { useEffect, useState } from 'react'
import ArticleList from '../components/ArticleList'
import { getArticlesByCategory, fetchArticles, ArticleMeta } from '../data/articles'

export default function PhotographyPage() {
  const [articles, setArticles] = useState<ArticleMeta[]>(() => getArticlesByCategory('photography'))

  useEffect(() => {
    fetchArticles().then((list) => setArticles(list.filter((a) => a.category === 'photography')))
  }, [])

  return (
    <ArticleList
      articles={articles}
      title="摄影"
      description="用镜头捕捉光影之美，记录每一个值得珍藏的瞬间。"
    />
  )
}
