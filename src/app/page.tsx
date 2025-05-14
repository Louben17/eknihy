import { supabase } from '@/lib/supabase'

type Kniha = {
  id: number
  ID: string
  IMGURL: string
}

export default async function HomePage() {
  const { data: knihy, error } = await supabase
    .from('knihy')
    .select('id, ID, IMGURL')
    .order('created_at', { ascending: false })

  if (error) {
    return <p>Chyba při načítání knih: {error.message}</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">📚 Nové knihy</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {knihy?.map((kniha) => (
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
          </div>
        ))}
      </div>
    </div>
  )
}
