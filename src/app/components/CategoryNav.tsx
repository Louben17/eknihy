'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

// Seznam kategorií
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
    <nav className="bg-white shadow-sm sticky top-0 z-10 overflow-x-auto hide-scrollbar py-3">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
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
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={clsx(
            'whitespace-nowrap px-4 py-2 rounded-full text-sm border transition-colors',
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
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {categories.map((category) => (
        <span
          key={category}
          className="whitespace-nowrap px-4 py-2 rounded-full text-sm border bg-gray-200 text-gray-500"
        >
          {category}
        </span>
      ))}
    </div>
  )
}
