'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Definice rozhraní podle existující Supabase tabulky
interface Autor {
  id: number;
  jmeno: string;
  popis: string;
  narozen: string;
  aktivni: boolean;
  fotka: string;
}

// Použití existujících environment proměnných
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function KatalogSpisovateluPage() {
  const [autori, setAutori] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data ze Supabase při načtení komponenty
  useEffect(() => {
    async function fetchAutori() {
      try {
        setLoading(true);
        
        // Jednoduchý dotaz bez filtrování
        const { data, error } = await supabase
          .from('autori')
          .select('*');
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Načtená data:', data); // Zobrazit data v konzoli pro ladění
        setAutori(data as Autor[] || []);
      } catch (err) {
        console.error('Chyba při načítání dat:', err);
        setError('Nepodařilo se načíst data autorů. Zkuste to prosím později.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAutori();
  }, []);

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Katalog spisovatelů</h1>
        <p className="text-gray-600">Objevte oblíbené autory a jejich díla.</p>
      </div>

      {/* Stav načítání */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Načítání autorů...</p>
        </div>
      )}

      {/* Chybový stav */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Prázdný výsledek */}
      {!loading && !error && autori.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <p>Nenalezeni žádní autoři. Databáze je pravděpodobně prázdná.</p>
        </div>
      )}

      {/* Seznam autorů */}
      {!loading && !error && autori.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-1/3 flex items-center justify-center p-4 bg-gray-100">
              {autor.fotka ? (
                <img
                  src={autor.fotka}
                  alt={autor.jmeno}
                  className="h-32 w-32 object-cover rounded-full"
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
                <h3 className="text-xl font-bold mb-1">{autor.jmeno}</h3>
                {autor.narozen && (
                  <div className="text-sm text-gray-600 mb-2">
                    {autor.narozen}
                  </div>
                )}
                <p className="text-gray-700 text-sm line-clamp-3">{autor.popis}</p>
                <div className="mt-3 flex justify-between items-center">
                  {autor.aktivni ? (
                    <span className="text-sm text-green-600">Aktivní autor</span>
                  ) : (
                    <span className="text-sm text-gray-600">Neaktivní autor</span>
                  )}
                  <a href={`/spisovatel/${autor.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Zobrazit díla
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}