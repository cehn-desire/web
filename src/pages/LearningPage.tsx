import ArticleList from '../components/ArticleList'
import { getArticlesByCategory } from '../data/articles'

export default function LearningPage() {
  const articles = getArticlesByCategory('learning')

  return (
    <ArticleList
      articles={articles}
      title="专业学习"
      description="记录技术学习、知识管理、效率提升等方面的思考与实践。"
    />
  )
}
