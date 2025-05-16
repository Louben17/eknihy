// src/app/kniha/[id]/page.tsx
import { supabase } from '@/lib/supabase'

// Kompletně odstraníme typové anotace a necháme TypeScript odvodit typy
export default async function DetailKnihy({ params }) {
  const { id } = params

  const { data: kniha, error } = await supabase
    .from('knihy')
    .select('id, ID, PRODUCT, IMGURL')
    .eq('id', id)
    .single()

  if (error) {
    return (
      <div className="text-red-500 p-6">
        <h1>Chyba při načítání knihy</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!kniha) {
    return <div className="p-6 text-gray-500">Kniha nenalezena</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{kniha.ID}</h1>
      <div className="rounded-xl overflow-hidden shadow-md border mb-4">
        <img
          src={kniha.IMGURL || '/placeholder-book.png'}
          alt={kniha.ID}
          className="w-full object-cover"
        />
      </div>
      <p className="text-gray-700">{kniha.PRODUCT}</p>
    </div>
  )
}