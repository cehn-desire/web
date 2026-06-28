import { ReactNode, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('page-enter-active')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('page-enter')
      setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('page-enter-active')
      }, 50)
    }
  }, [location, displayLocation])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={transitionStage}>
          {children}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p> 2026 个人博客. Built with React + Vite + Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
