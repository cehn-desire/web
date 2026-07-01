import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LearningPage from './pages/LearningPage'
import PhotographyPage from './pages/PhotographyPage'
import PaintingPage from './pages/PaintingPage'
import ArticlePage from './pages/ArticlePage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/learning/:slug" element={<ArticlePage category="learning" />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/photography/:slug" element={<ArticlePage category="photography" />} />
        <Route path="/painting" element={<PaintingPage />} />
        <Route path="/painting/:slug" element={<ArticlePage category="painting" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  )
}

export default App
