// src/app/kniha/[slug]/page.tsx
import { supabase } from '@/lib/supabase'

export default async function DetailKnihy({ params }) {
  const { slug } = params

  const { data: kniha, error } = await supabase
    .from('knihy')
    .select('id, PRODUCT, IMGURL, CATEGORY_NAME')
    .eq('slug', slug)
    .single()

  if (error || !kniha) {
    return (
      <div className="text-red-500 p-6">
        <h1>Chyba při načítání knihy</h1>
        <p>{error?.message || 'Kniha nenalezena.'}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md border">
          <img
            src={kniha.IMGURL || '/placeholder-book.png'}
            alt={kniha.PRODUCT}
            className="w-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{kniha.PRODUCT}</h1>
          {kniha.CATEGORY_NAME && (
            <p className="text-sm font-medium text-[#2998cb] mb-2">
              Žánr: {kniha.CATEGORY_NAME}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
