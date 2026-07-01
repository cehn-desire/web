import { supabase } from '../lib/supabase'

export interface ArticleMeta {
  slug: string
  title: string
  category: 'learning' | 'photography' | 'painting'
  date: string
  readTime: string
  excerpt: string
  coverImage?: string
  tags?: string[]
  content?: string
}

// 静态备用数据（网络不可用时使用）
export const articles: ArticleMeta[] = [
  {
    slug: 'getting-started',
    title: '专业学习之路：从入门到精通',
    category: 'learning',
    date: '2026-06-20',
    readTime: '5 分钟',
    excerpt: '探索高效学习方法，构建个人知识体系，让专业学习更有成效。本文分享我在技术学习过程中的心得与体会。',
    tags: ['方法论', '效率'],
  },
  {
    slug: 'tech-stack-2026',
    title: '2026 年值得关注的技术趋势',
    category: 'learning',
    date: '2026-06-15',
    readTime: '8 分钟',
    excerpt: '从 AI 到 Web 开发，从前端到后端，盘点 2026 年最值得关注的技术发展方向和学习路径。',
    tags: ['技术趋势', '前端', 'AI'],
  },
  {
    slug: 'street-photography',
    title: '街头摄影：捕捉城市的光影瞬间',
    category: 'photography',
    date: '2026-06-18',
    readTime: '6 分钟',
    excerpt: '走在城市的街道上，用镜头记录那些不经意的瞬间。分享我的街头摄影心得和构图技巧。',
    tags: ['街拍', '构图'],
  },
  {
    slug: 'golden-hour',
    title: '黄金时刻：如何利用自然光拍出好照片',
    category: 'photography',
    date: '2026-06-10',
    readTime: '4 分钟',
    excerpt: '日出日落前后的黄金时刻是摄影师最爱的时段。了解如何充分利用这短暂而美丽的自然光线。',
    tags: ['光线', '技巧'],
  },
  {
    slug: 'watercolor-basics',
    title: '水彩入门：从第一笔开始',
    category: 'painting',
    date: '2026-06-16',
    readTime: '7 分钟',
    excerpt: '水彩画的魅力在于其透明感和流动性。本文为零基础的朋友介绍水彩画的基本工具和入门技法。',
    tags: ['水彩', '入门'],
  },
  {
    slug: 'sketch-daily',
    title: '每日速写：坚持绘画的力量',
    category: 'painting',
    date: '2026-06-08',
    readTime: '5 分钟',
    excerpt: '每天坚持画一张速写，一个月后会有什么变化？记录我的每日绘画挑战和成长历程。',
    tags: ['速写', '习惯'],
  },
  {
    slug: 'sketch-test',
    title: 'testtest',
    category: 'painting',
    date: '2026-06-08',
    readTime: '5 分钟',
    excerpt: '这是一段测试用例，用于测试文本添加内容',
    tags: ['速写', '习惯'],
  },
]

export function getArticlesByCategory(category: 'learning' | 'photography' | 'painting'): ArticleMeta[] {
  return articles.filter((a) => a.category === category)
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRecentArticles(count: number = 3): ArticleMeta[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

// ========== Supabase 动态数据 ==========

// 从 Supabase 获取所有文章列表
export async function fetchArticles(): Promise<ArticleMeta[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })

  if (error || !data) {
    console.warn('Supabase 读取失败，使用本地数据:', error?.message)
    return articles
  }

  return data.map((row: any) => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
    excerpt: row.excerpt,
    tags: row.tags,
    coverImage: row.cover_image,
    content: row.content,
  }))
}

// 从 Supabase 获取单篇文章（含正文）
export async function fetchArticle(slug: string): Promise<ArticleMeta | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    date: data.date,
    readTime: data.read_time,
    excerpt: data.excerpt,
    tags: data.tags,
    coverImage: data.cover_image,
    content: data.content,
  }
}
