'use client'
import { useEffect, useState } from 'react'
import { supabase, Kniha } from '@/lib/supabase'
import Link from 'next/link'

export default function Page() {
  const [knihy, setKnihy] = useState<Kniha[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('knihy')
        .select('id, ID, PRODUCT, IMGURL, CATEGORY_NAME, slug') // přidáno "slug"
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setKnihy(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p className="py-16 text-center text-gray-500">Načítání knih...</p>
  if (error) return <p className="py-16 text-center text-red-500">Chyba: {error}</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
        📚 Všechny knihy
      </h1>

      {knihy.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {knihy.map((kniha) => (
            <Link href={`/kniha/${kniha.slug}`} key={kniha.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#2998cb] cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img
                    src={kniha.IMGURL || '/placeholder-book.png'}
                    alt={kniha.ID || 'Kniha'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-book.png'
                    }}
                  />
                </div>
                <div className="p-3 font-medium text-center text-gray-800">{kniha.ID}</div>
                <div className="p-2 font-medium text-center text-gray-600 text-sm">{kniha.PRODUCT}</div>
                {kniha.CATEGORY_NAME && (
                  <div className="p-2 bg-gray-50 text-xs text-center text-[#2998cb] font-medium">
                    {kniha.CATEGORY_NAME}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-2">Nenalezeny žádné knihy</p>
          <a
            href="/"
            className="inline-block mt-2 px-4 py-2 bg-[#2998cb] text-white rounded-lg hover:bg-[#2580a8] transition-colors"
          >
            Zpět na hlavní stránku
          </a>
        </div>
      )}
    </div>
  )
}
