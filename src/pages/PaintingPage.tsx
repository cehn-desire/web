import ArticleList from '../components/ArticleList'
import { getArticlesByCategory } from '../data/articles'

export default function PaintingPage() {
  const articles = getArticlesByCategory('painting')

  return (
    <ArticleList
      articles={articles}
      title="绘画"
      description="分享绘画学习过程中的技巧、感悟和作品。"
    />
  )
}
