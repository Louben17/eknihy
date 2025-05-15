import './globals.css'
import { ReactNode, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryNav from './components/CategoryNav'

export const metadata = {
  title: 'eKnihy',
  description: 'Aplikace na stahování e-knih',
}

// Fallback komponenta pro načítání kategorií
function CategoryNavFallback() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 overflow-x-auto py-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex space-x-2 pb-1">
          <div className="h-9 bg-gray-200 rounded-md animate-pulse w-24"></div>
          <div className="h-9 bg-gray-200 rounded-md animate-pulse w-20"></div>
          <div className="h-9 bg-gray-200 rounded-md animate-pulse w-24"></div>
          <div className="h-9 bg-gray-200 rounded-md animate-pulse w-20"></div>
        </div>
      </div>
    </nav>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* Header komponenta */}
        <Header />
        
        {/* Pás kategorií knih obalený v Suspense */}
        <Suspense fallback={<CategoryNavFallback />}>
          <CategoryNav />
        </Suspense>
        
        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto p-4">
          {children}
        </main>

        {/* Footer komponenta */}
        <Footer />
      </body>
    </html>
  )
}