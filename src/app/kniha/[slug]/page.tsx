// src/app/kniha/[slug]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default async function DetailKnihy({ params }: Props) {
  const { slug } = params

  const { data: kniha, error } = await supabase
    .from('knihy')
    .select('ID, PRODUCT, IMGURL, CATEGORY_NAME')
    .eq('slug', slug)
    .single()

  if (error || !kniha) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <img
          src={kniha.IMGURL || '/placeholder-book.png'}
          alt={kniha.PRODUCT}
          className="rounded-xl w-full object-cover shadow-md"
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
