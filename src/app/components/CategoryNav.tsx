'use client'

import { Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// Komponenta, která používá useSearchParams
function CategoryButtons() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''
  
  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === currentCategory) {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex space-x-2 pb-1">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${currentCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

// Fallback pro suspense
function CategoryButtonsFallback() {
  return (
    <div className="flex space-x-2 pb-1">
      <div className="h-9 bg-gray-200 rounded-md animate-pulse w-24"></div>
      <div className="h-9 bg-gray-200 rounded-md animate-pulse w-20"></div>
      <div className="h-9 bg-gray-200 rounded-md animate-pulse w-24"></div>
      <div className="h-9 bg-gray-200 rounded-md animate-pulse w-20"></div>
    </div>
  )
}

const categories = [
  'Bestsellery',
  'Beletrie',
  'Sci-fi',
  'Detektivky',
  'Pro děti',
  'Zdraví',
  'Romány',
  'Láska',
  'Učebnice',
  'Umění',
  'Osobní rozvoj',
  'Naučné',
  'Klasika'
]

// Hlavní komponenta, která obaluje CategoryButtons do Suspense
export default function CategoryNav() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 overflow-x-auto py-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <Suspense fallback={<CategoryButtonsFallback />}>
          <CategoryButtons />
        </Suspense>
      </div>
    </nav>
  )
}