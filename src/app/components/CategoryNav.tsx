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
    <div className="flex space-x-4 pb-1">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${currentCategory === category
              ? 'bg-[#2998cb] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-[#2998cb] hover:text-white hover:shadow-md border border-gray-200'
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
    <div className="flex space-x-4 pb-1">
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-24 border border-gray-200"></div>
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-20 border border-gray-200"></div>
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-24 border border-gray-200"></div>
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-20 border border-gray-200"></div>
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
    <nav className="bg-white shadow-sm sticky top-0 z-10 overflow-x-auto py-3">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <Suspense fallback={<CategoryButtonsFallback />}>
          <CategoryButtons />
        </Suspense>
      </div>
    </nav>
  )
}