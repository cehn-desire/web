import ArticleList from '../components/ArticleList'
import { getArticlesByCategory } from '../data/articles'

export default function PhotographyPage() {
  const articles = getArticlesByCategory('photography')

  return (
    <ArticleList
      articles={articles}
      title="摄影"
      description="用镜头捕捉光影之美，记录每一个值得珍藏的瞬间。"
    />
  )
}
