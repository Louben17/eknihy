// src/app/kniha/[slug]/page.tsx
import type { GetServerSideProps } from 'next'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default function DetailKnihy(props: any) {
  // Přístup k slug přes kontext
  const { slug } = props.params || {}

  if (!slug) {
    return <div>Chybí parametr slug</div>
  }

  // Poznámka: toto není ideální způsob, ale obchází problém s typováním
  // Normálně bychom měli použít getServerSideProps nebo ekvivalent v App Routeru
  return (
    <ClientKniha slug={slug} />
  )
}

// Client komponenta pro získání dat
"use client"
import { useEffect, useState } from 'react'

function ClientKniha({ slug }: { slug: string }) {
  const [kniha, setKniha] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchKniha() {
      try {
        const { data, error } = await supabase
          .from('knihy')
          .select('ID, PRODUCT, IMGURL, CATEGORY_NAME')
          .eq('slug', slug)
          .single()

        if (error) throw error
        setKniha(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchKniha()
  }, [slug])

  if (loading) return <div>Načítání...</div>
  if (error) return <div>Chyba: {error}</div>
  if (!kniha) return <div>Kniha nenalezena</div>

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <img
          src={kniha.IMGURL || '/placeholder-book.png'}
          alt={kniha.PRODUCT}
          className="rounded-xl w-full object-cover shadow-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder-book.png'
          }}
        />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{kniha.PRODUCT}</h1>
        <p className="text-gray-600 text-sm mb-4">{kniha.CATEGORY_NAME}</p>
        <p className="text-gray-700">Zde bude později popis knihy nebo další informace.</p>
      </div>
    </div>
  )
}