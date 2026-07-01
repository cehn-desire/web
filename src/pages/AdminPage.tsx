import { useState } from 'react'
import { supabase } from '../lib/supabase'
import MarkdownRenderer from '../components/MarkdownRenderer'

// 管理员密码（与 Supabase 密钥无关，纯前端门禁）
const ADMIN_PASSWORD = 'admin123'

const emptyForm = {
  slug: '',
  title: '',
  category: 'learning' as 'learning' | 'photography' | 'painting',
  date: new Date().toISOString().slice(0, 10),
  readTime: '5 分钟',
  excerpt: '',
  tags: '',
  content: '',
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [pwd, setPwd] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [preview, setPreview] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handlePublish = async () => {
    if (!form.slug || !form.title || !form.content) {
      setStatus({ type: 'error', msg: '请填写标题、slug 和正文' })
      return
    }

    setStatus(null)
    const { error } = await supabase.from('articles').upsert({
      slug: form.slug,
      title: form.title,
      category: form.category,
      date: form.date,
      read_time: form.readTime,
      excerpt: form.excerpt,
      content: form.content,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
    }, { onConflict: 'slug' })

    if (error) {
      setStatus({ type: 'error', msg: '发布失败: ' + error.message })
    } else {
      setStatus({ type: 'success', msg: '✅ 发布成功！刷新网站即可看到新文章。' })
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">🔒 管理员后台</h1>
        <p className="text-gray-500 mb-4 text-sm">输入管理员密码</p>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && pwd === ADMIN_PASSWORD && setUnlocked(true)}
          placeholder="输入管理员密码"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-center"
        />
        <button
          onClick={() => pwd === ADMIN_PASSWORD && setUnlocked(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          解锁
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">✏️ 写文章</h1>

      {status && (
        <div className={`mb-4 px-4 py-3 rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      {/* 基础信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">标题 *</label>
          <input value={form.title} onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="文章标题" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Slug *</label>
          <input value={form.slug} onChange={(e) => handleChange('slug', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="my-article" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">分类</label>
          <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="learning">专业学习</option>
            <option value="photography">摄影</option>
            <option value="painting">绘画</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">日期</label>
          <input value={form.date} onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">阅读时长</label>
          <input value={form.readTime} onChange={(e) => handleChange('readTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="5 分钟" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">标签（逗号分隔）</label>
          <input value={form.tags} onChange={(e) => handleChange('tags', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="方法论, 效率" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">摘要</label>
        <input value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="一句话描述文章内容" />
      </div>

      {/* 正文 */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-1">
          <label className="text-sm font-medium text-gray-600">正文（Markdown）*</label>
          <button onClick={() => setPreview(!preview)}
            className="text-xs px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
            {preview ? '编辑' : '预览'}
          </button>
        </div>
        {preview ? (
          <div className="border border-gray-300 rounded-lg p-6 min-h-[300px] prose max-w-none">
            {form.content ? <MarkdownRenderer content={form.content} /> : <p className="text-gray-400">暂无内容</p>}
          </div>
        ) : (
          <textarea value={form.content} onChange={(e) => handleChange('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm min-h-[300px]"
            placeholder="## 标题&#10;&#10;正文内容..." />
        )}
      </div>

      {/* 按钮 */}
      <div className="flex gap-3">
        <button onClick={handlePublish}
          className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          📤 发布文章
        </button>
        <button onClick={() => { setForm(emptyForm); setStatus(null) }}
          className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
          清空表单
        </button>
      </div>
    </div>
  )
}
