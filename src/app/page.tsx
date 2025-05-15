import { supabase } from '@/lib/supabase'

// Definice typu pro knihu
type Kniha = {
  id: number
  ID: string
  IMGURL: string
  PRODUCT: string
  CATEGORY_NAME?: string
}

// Nejjednodušší řešení - použít any pro typy
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  // Získání query parametrů
  const category = props.searchParams?.category || null;

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
    return <p className="text-center py-8 text-red-500">Chyba při načítání knih: {error.message}</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
        {category ? `📚 Knihy: ${category}` : '📚 Všechny knihy'}
      </h1>
      
      {knihy && knihy.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {knihy.map((kniha) => (
            <div
              key={kniha.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#2998cb]"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={kniha.IMGURL}
                  alt={kniha.ID}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-2">V této kategorii nejsou žádné knihy</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-2 px-4 py-2 bg-[#2998cb] text-white rounded-lg hover:bg-[#2580a8] transition-colors"
          >
            Zpět na všechny knihy
          </button>
        </div>
      )}
    </div>
  )
}