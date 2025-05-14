'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializace Supabase klienta
// Tyto hodnoty byste měli mít v environment proměnných, ale pro ukázku je uvádím přímo zde
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function KatalogSpisovateluPage() {
  const [spisovatele, setSpisovatele] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aktivniPismeno, setAktivniPismeno] = useState('');

  // Abeceda pro filtrování
  const abeceda = 'ABCČDEFGHIJKLMNOPQRSTUVWXYZŽ'.split('');

  // Fetch data ze Supabase při načtení komponenty
  useEffect(() => {
    async function fetchSpisovatele() {
      try {
        setLoading(true);
        
        let query = supabase.from('autori').select('*');
        
        // Pokud je zvoleno písmeno, filtrujeme podle něj
        if (aktivniPismeno) {
          query = query.ilike('jmeno', `${aktivniPismeno}%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setSpisovatele(data || []);
      } catch (err) {
        console.error('Chyba při načítání dat:', err);
        setError('Nepodařilo se načíst data spisovatelů. Zkuste to prosím později.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchSpisovatele();
  }, [aktivniPismeno]);

  // Funkce pro změnu filtru podle písmene
  const handlePismenoFilter = (pismeno) => {
    setAktivniPismeno(pismeno === aktivniPismeno ? '' : pismeno);
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Katalog spisovatelů</h1>
        <p className="text-gray-600">Objevte oblíbené autory a jejich díla.</p>
      </div>

      {/* Abecední filtr */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Filtrovat podle počátečního písmena</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1 border rounded-md ${
              aktivniPismeno === '' 
                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setAktivniPismeno('')}
          >
            Vše
          </button>
          {abeceda.map((pismeno) => (
            <button 
              key={pismeno} 
              className={`px-3 py-1 border rounded-md ${
                aktivniPismeno === pismeno 
                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handlePismenoFilter(pismeno)}
            >
              {pismeno}
            </button>
          ))}
        </div>
      </div>

      {/* Stav načítání */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Načítání spisovatelů...</p>
        </div>
      )}

      {/* Chybový stav */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Prázdný výsledek */}
      {!loading && !error && spisovatele.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <p>Nenalezeni žádní spisovatelé{aktivniPismeno && ` začínající na písmeno "${aktivniPismeno}"`}.</p>
        </div>
      )}

      {/* Seznam spisovatelů */}
      {!loading && !error && spisovatele.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spisovatele.map((spisovatel) => (
            <div key={spisovatel.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <div className="w-1/3 flex items-center justify-center p-4 bg-gray-100">
                {spisovatel.foto_url ? (
                  <img 
                    src={spisovatel.foto_url} 
                    alt={spisovatel.jmeno}
                    className="object-cover h-32 w-32 rounded-full" 
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-16 w-16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="w-2/3 p-4">
                <h3 className="text-xl font-bold mb-1">{spisovatel.jmeno}</h3>
                {spisovatel.narozen && spisovatel.zemrel && (
                  <div className="text-sm text-gray-600 mb-2">
                    {spisovatel.narozen} - {spisovatel.zemrel}
                  </div>
                )}
                {spisovatel.zanry && spisovatel.zanry.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {spisovatel.zanry.map((zanr) => (
                      <span key={zanr} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {zanr}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-700 text-sm line-clamp-3">{spisovatel.popis}</p>
                <div className="mt-3 flex justify-between items-center">
                  {spisovatel.aktivni ? (
                    <span className="text-sm text-green-600">Aktivní autor</span>
                  ) : (
                    <span className="text-sm text-gray-600">Neaktivní autor</span>
                  )}
                  <a href={`/spisovatel/${spisovatel.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Zobrazit díla
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination - lze přidat později, až bude implementované stránkování na backendu */}
    </div>
  );
}