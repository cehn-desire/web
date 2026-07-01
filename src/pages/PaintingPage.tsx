import { useEffect, useState } from 'react'
import ArticleList from '../components/ArticleList'
import { getArticlesByCategory, fetchArticles, ArticleMeta } from '../data/articles'

export default function PaintingPage() {
  const [articles, setArticles] = useState<ArticleMeta[]>(() => getArticlesByCategory('painting'))

  useEffect(() => {
    fetchArticles().then((list) => setArticles(list.filter((a) => a.category === 'painting')))
  }, [])

  return (
    <ArticleList
      articles={articles}
      title="绘画"
      description="分享绘画学习过程中的技巧、感悟和作品。"
    />
  )
}
