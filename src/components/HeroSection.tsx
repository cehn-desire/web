import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white mb-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          探索知识与美的世界
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-8 leading-relaxed">
          在这里，记录专业学习的心得，分享镜头下的光影瞬间，展示画笔勾勒的创意世界。
          每一个领域，都是对生活的一次深度探索。
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/learning"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            开始学习
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            了解更多
          </Link>
        </div>
      </div>
    </section>
  )
}
