'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

const categories = [
  'Bestsellery', 'Beletrie', 'Sci-fi', 'Detektivky', 'Pro děti',
  'Zdraví', 'Romány', 'Láska', 'Učebnice', 'Umění',
  'Osobní rozvoj', 'Naučné', 'Klasika'
]

export default function CategoryNav() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <nav className="bg-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        {isClient ? <CategoryButtonsClient /> : <CategoryButtonsFallback />}
      </div>
    </nav>
  )
}

function CategoryButtonsClient() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const handleClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === currentCategory) {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-1 sm:gap-2 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={clsx(
            'px-3 py-1 text-xs sm:text-sm rounded-full border flex-shrink-0 transition-colors',
            currentCategory === category
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

function CategoryButtonsFallback() {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-1 sm:gap-2 hide-scrollbar">
      {categories.map((category) => (
        <span
          key={category}
          className="px-3 py-1 text-xs sm:text-sm rounded-full border bg-gray-200 text-gray-500 flex-shrink-0"
        >
          {category}
        </span>
      ))}
    </div>
  )
}
