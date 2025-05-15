// src/app/page.tsx
import { supabase, Kniha } from '@/lib/supabase'

// V Next.js 13+ musíme použít správnou definici typů pro Props server komponenty
// Problém byl v definici typů - searchParams musí odpovídat Next.js typům

// Správná definice typů kompatibilní s Next.js typovým systémem
type PageProps = {
  params: Record<string, string>;
  searchParams: { [key: string]: string | string[] | undefined };
}

// Funkce pro načtení dat - oddělená od komponenty
async function fetchKnihy(category: string | null) {
  try {
    // Základní dotaz
    let query = supabase
      .from('knihy')
      .select('id, ID, PRODUCT, IMGURL, CATEGORY_NAME')
      
    // Přidáváme řazení pouze pokud tabulka obsahuje created_at sloupec
    try {
      const { data: checkData, error: checkError } = await supabase
        .from('knihy')
        .select('created_at')
        .limit(1)
      
      // Pokud první dotaz projde (sloupec existuje), použijeme řazení
      if (!checkError && checkData) {
        query = query.order('created_at', { ascending: false })
      }
    } catch (orderError) {
      // Pokud existuje problém s řazením, ignorujeme ho a pokračujeme bez řazení
      console.warn("Varování: Nelze řadit podle created_at, pokračuji bez řazení")
    }

    // Filtrování podle kategorie, pokud je zadána
    if (category) {
      query = query.eq('CATEGORY_NAME', category)
    }

    // Provedení dotazu
    const { data, error } = await query

    // Zpracování případné chyby
    if (error) {
      console.error("Supabase chyba:", error)
      throw new Error(`Chyba při načítání knih: ${error.message}`)
    }

    // Pokud nejsou žádná data, vrátíme prázdné pole místo null
    return data || []
  } catch (err) {
    console.error("Chyba při fetchování knih:", err)
    // Přeposíláme chybu pro zpracování v hlavní komponentě
    throw err
  }
}

// Server Component s opravenou definicí typů
export default async function Page({ searchParams }: PageProps) {
  try {
    // Bezpečné získání kategorie - nyní používáme správný typ podle Next.js
    const category = typeof searchParams.category === 'string' ? searchParams.category : null;
    
    // Načtení dat (oddělená funkce)
    const knihy = await fetchKnihy(category);

    // Render UI
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
          {category ? `📚 Knihy: ${category}` : '📚 Všechny knihy'}
        </h1>
        
        {knihy && knihy.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {knihy.map((kniha: Kniha) => (
              <div
                key={kniha.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#2998cb]"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={kniha.IMGURL || '/placeholder-book.png'}
                    alt={kniha.ID || 'Kniha'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-book.png';
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
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-gray-500 mb-2">V této kategorii nejsou žádné knihy</p>
            <a 
              href="/"
              className="inline-block mt-2 px-4 py-2 bg-[#2998cb] text-white rounded-lg hover:bg-[#2580a8] transition-colors"
            >
              Zpět na všechny knihy
            </a>
          </div>
        )}
      </div>
    )
  } catch (err) {
    console.error("Neočekávaná chyba v Page komponentě:", err)
    
    // Detailnější zpráva o chybě pro lepší debugging
    let errorMessage = "Neznámá chyba";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    
    // Zobrazení uživatelsky přívětivé chybové hlášky
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-red-500 mb-4">Došlo k neočekávané chybě</h2>
        <p className="mb-4">Omlouváme se, při načítání knih došlo k chybě.</p>
        <p className="mb-4 text-sm bg-gray-100 p-3 rounded text-left">
          <strong>Debug:</strong> {errorMessage}
        </p>
        <a 
          href="/"
          className="inline-block px-4 py-2 bg-[#2998cb] text-white rounded-lg hover:bg-[#2580a8] transition-colors"
        >
          Obnovit stránku
        </a>
      </div>
    )
  }
}