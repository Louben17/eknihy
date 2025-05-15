import { supabase } from '@/lib/supabase'

// Definice typu pro knihu
type Kniha = {
  id: number
  ID: string
  IMGURL: string
  PRODUCT: string
  CATEGORY_NAME?: string
}

// Definice typu pro props
type PageProps = {
  params: { slug?: string }
  searchParams?: { 
    category?: string 
    [key: string]: string | string[] | undefined
  }
}

export default async function Page({ searchParams }: PageProps) {
  // Použití typovaných props
  const category = searchParams?.category || null

  // Získání knih z Supabase
  let query = supabase
    .from('knihy')
    .select('id, ID, PRODUCT, IMGURL, CATEGORY_NAME')
    .order('created_at', { ascending: false })

  // Filtrování podle kategorie
  if (category) {
    query = query.eq('CATEGORY_NAME', category)
  }

  const { data: knihy, error } = await query

  if (error) {
    return <p>Chyba při načítání knih: {error.message}</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {category ? `📚 Knihy: ${category}` : '📚 Všechny knihy'}
      </h1>
      
      {knihy && knihy.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {knihy.map((kniha) => (
            <div
              key={kniha.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={kniha.IMGURL}
                alt={kniha.ID}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 font-medium text-center">{kniha.ID}</div>
              <div className="p-2 font-medium text-center">{kniha.PRODUCT}</div>
              {kniha.CATEGORY_NAME && (
                <div className="p-1 bg-gray-100 text-xs text-center">
                  {kniha.CATEGORY_NAME}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8">V této kategorii nejsou žádné knihy</p>
      )}
    </div>
  )
}