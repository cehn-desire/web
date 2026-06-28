export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">关于</h1>

      <div className="prose max-w-none">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">关于本站</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            这是一个记录个人成长的博客，涵盖三个主要领域：
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">📚</span>
              <span><strong className="text-gray-700">专业学习</strong> — 记录技术学习、知识管理和效率提升的心得与方法。</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">📷</span>
              <span><strong className="text-gray-700">摄影</strong> — 分享摄影技巧、后期处理和创作中的光影故事。</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">🎨</span>
              <span><strong className="text-gray-700">绘画</strong> — 展示从素描到水彩，从入门到进阶的绘画历程。</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">技术栈</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            本站使用以下技术构建：
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">React 18</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">TypeScript</span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">Vite</span>
            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm">Tailwind CSS</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">React Router</span>
            <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm">React Markdown</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Vercel</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">更新方式</h2>
          <p className="text-gray-600 leading-relaxed">
            网站内容通过 Markdown 文件管理，所有内容托管在 GitHub 上并自动部署到 Vercel。
            只需在 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">src/content/</code>
            目录下添加或修改 Markdown 文件，推送代码后即可自动同步更新。
          </p>
        </div>
      </div>
    </div>
  )
}
