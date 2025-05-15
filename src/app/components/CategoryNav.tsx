'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Definice kategorií
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

// Hlavní komponenta navigace
export default function CategoryNav() {
  // Použití React hooks pro detekci hydratace
  const [isClient, setIsClient] = useState(false)
  
  // Bezpečná detekce klientského prostředí
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 overflow-x-auto py-3">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Podmíněný rendering - nejdřív fallback, pak skutečná komponenta */}
        {!isClient ? (
          <CategoryButtonsFallback />
        ) : (
          <CategoryButtonsClient />
        )}
      </div>
    </nav>
  )
}

// Komponenta s tlačítky kategorií
function CategoryButtonsClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Bezpečnější získání parametru
  const currentCategory = searchParams ? searchParams.get('category') || '' : ''
  
  const handleCategoryClick = (category: string) => {
    try {
      if (!searchParams) return;
      
      // Vytvoření nových parametrů na základě aktuálních
      const params = new URLSearchParams(searchParams.toString())
      
      // Toggle kategorie (kliknutí na aktuální kategorii ji odstraní)
      if (category === currentCategory) {
        params.delete('category')
      } else {
        params.set('category', category)
      }
      
      // Bezpečná navigace
      if (pathname) {
        router.push(`${pathname}?${params.toString()}`)
      }
    } catch (err) {
      console.error("Chyba při změně kategorie:", err)
      // V případě chyby přesměrování na hlavní stránku
      router.push('/')
    }
  }

  return (
    <div className="flex space-x-4 pb-1 overflow-x-auto">
      <Link 
        href="/"
        className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${!currentCategory 
            ? 'bg-[#2998cb] text-white shadow-md' 
            : 'bg-white text-gray-700 hover:bg-[#2998cb] hover:text-white hover:shadow-md border border-gray-200'
          }`}
      >
        Všechny
      </Link>
      
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

// Fallback pro načítání
function CategoryButtonsFallback() {
  return (
    <div className="flex space-x-4 pb-1 overflow-x-auto">
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-24 border border-gray-200"></div>
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-20 border border-gray-200"></div>
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-24 border border-gray-200"></div>
      <div className="h-9 bg-gray-100 rounded-lg animate-pulse w-20 border border-gray-200"></div>
    </div>
  )
}