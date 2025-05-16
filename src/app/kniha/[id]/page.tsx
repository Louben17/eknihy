import { supabase } from '@/lib/supabase'
import Image from 'next/image'

type Params = {
  params: { id: string }
}

export default async function KnihaDetail({ params }: Params) {
  const { id } = params

  const { data, error } = await supabase
    .from('knihy')
    .select('ID, PRODUCT, IMGURL')
    .eq('id', id)
    .single()

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Chyba při načítání knihy: {error.message}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-600">
        Kniha nenalezena.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{data.ID}</h1>

      <div className="w-full h-80 relative mb-6">
        <Image
          src={data.IMGURL || '/placeholder-book.png'}
          alt={data.ID}
          fill
          className="object-contain rounded-lg border shadow"
        />
      </div>

      <p className="text-gray-700">{data.PRODUCT}</p>
    </div>
  )
}
