import { Link } from 'react-router-dom'

interface CategoryCardProps {
  title: string
  description: string
  icon: string
  link: string
  colorClass: string
  bgClass: string
  count: number
}

export default function CategoryCard({ title, description, icon, link, colorClass, bgClass, count }: CategoryCardProps) {
  return (
    <Link
      to={link}
      className={`group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${bgClass}`}
    >
      <div className="p-8">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className={`text-xl font-bold mb-2 ${colorClass}`}>{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{count} 篇文章</span>
          <span className={`inline-flex items-center text-sm font-medium ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity`}>
            浏览
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
