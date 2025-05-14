'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Definice rozhraní pro různé typy vyhledávatelných entit
interface Autor {
  id: number;
  jmeno: string;
  popis: string;
  narozen: string;
  aktivni: boolean;
  typ: 'autor';
}

interface Kniha {
  id: number;
  nazev: string;
  popis: string;
  autor_id: number;
  rok_vydani: string;
  typ: 'kniha';
}

interface Clanek {
  id: number;
  titulek: string;
  obsah: string;
  datum_publikace: string;
  typ: 'clanek';
}

// Union typ pro všechny vyhledatelné entity
type VyhledatelnaEntita = Autor | Kniha | Clanek;

// Použití existujících environment proměnných
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function GlobalniVyhledavaniPage() {
  const [vysledkyVyhledavani, setVysledkyVyhledavani] = useState<VyhledatelnaEntita[]>([]);
  const [vyhledavaciDotaz, setVyhledavaciDotaz] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funkce pro vyhledávání
  const provedeVyhledavani = async () => {
    if (!vyhledavaciDotaz.trim()) {
      setVysledkyVyhledavani([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Vyhledávání autorů
      const { data: autori, error: errorAutori } = await supabase
        .from('autori')
        .select('id, jmeno, popis, narozen, aktivni')
        .or(`jmeno.ilike.%${vyhledavaciDotaz}%,popis.ilike.%${vyhledavaciDotaz}%`);

      if (errorAutori) throw errorAutori;

      // Vyhledávání knih
      const { data: knihy, error: errorKnihy } = await supabase
        .from('knihy')
        .select('id, nazev, popis, autor_id, rok_vydani')
        .or(`nazev.ilike.%${vyhledavaciDotaz}%,popis.ilike.%${vyhledavaciDotaz}%`);

      if (errorKnihy) throw errorKnihy;

      // Vyhledávání článků
      const { data: clanky, error: errorClanky } = await supabase
        .from('clanky')
        .select('id, titulek, obsah, datum_publikace')
        .or(`titulek.ilike.%${vyhledavaciDotaz}%,obsah.ilike.%${vyhledavaciDotaz}%`);

      if (errorClanky) throw errorClanky;

      // Transformace dat s přidáním typu entity
      const transformovaniAutori = (autori || []).map(autor => ({ ...autor, typ: 'autor' as const }));
      const transformovaneKnihy = (knihy || []).map(kniha => ({ ...kniha, typ: 'kniha' as const }));
      const transformovaneClanky = (clanky || []).map(clanek => ({ ...clanek, typ: 'clanek' as const }));

      // Sloučení výsledků
      const vsechnyVysledky = [
        ...transformovaniAutori,
        ...transformovaneKnihy,
        ...transformovaneClanky
      ];

      setVysledkyVyhledavani(vsechnyVysledky);
      console.log('Výsledky vyhledávání:', vsechnyVysledky);
    } catch (err) {
      console.error('Chyba při vyhledávání:', err);
      setError('Nepodařilo se provést vyhledávání. Zkuste to prosím znovu později.');
    } finally {
      setLoading(false);
    }
  };

  // Handler pro změnu vyhledávacího dotazu
  const handleVyhledavaciDotazChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVyhledavaciDotaz(e.target.value);
  };

  // Handler pro odeslání formuláře
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    provedeVyhledavani();
  };

  // Získání cesty pro detail entity podle jejího typu
  const getDetailLink = (entita: VyhledatelnaEntita) => {
    switch (entita.typ) {
      case 'autor':
        return `/spisovatel/${entita.id}`;
      case 'kniha':
        return `/kniha/${entita.id}`;
      case 'clanek':
        return `/clanek/${entita.id}`;
      default:
        return '#';
    }
  };

  // Získání titulku entity podle jejího typu
  const getTitulek = (entita: VyhledatelnaEntita) => {
    switch (entita.typ) {
      case 'autor':
        return entita.jmeno;
      case 'kniha':
        return entita.nazev;
      case 'clanek':
        return entita.titulek;
      default:
        return 'Neznámý titulek';
    }
  };

  // Získání popisu entity podle jejího typu
  const getPopis = (entita: VyhledatelnaEntita) => {
    switch (entita.typ) {
      case 'autor':
        return entita.popis;
      case 'kniha':
        return entita.popis;
      case 'clanek':
        return entita.obsah;
      default:
        return 'Bez popisu';
    }
  };

  // Získání ikony pro typ entity
  const getTypIcon = (entita: VyhledatelnaEntita) => {
    switch (entita.typ) {
      case 'autor':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'kniha':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'clanek':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 01-2-2V6a2 2 0 00-2-2h-1M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Globální vyhledávání</h1>
        <p className="text-gray-600">Vyhledávejte autory, knihy, články a další obsah.</p>
      </div>

      {/* Vyhledávací formulář */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Vyhledávejte autory, knihy, články..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={vyhledavaciDotaz}
              onChange={handleVyhledavaciDotazChange}
            />
            {vyhledavaciDotaz && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setVyhledavaciDotaz('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Hledám...</span>
              </div>
            ) : (
              <span>Hledat</span>
            )}
          </button>
        </form>
      </div>

      {/* Chybový stav */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Výsledky vyhledávání */}
      {isSearching && vysledkyVyhledavani.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <p>Pro hledaný výraz "{vyhledavaciDotaz}" nebyly nalezeny žádné výsledky.</p>
        </div>
      ) : (
        vysledkyVyhledavani.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold">Výsledky vyhledávání ({vysledkyVyhledavani.length})</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {vysledkyVyhledavani.map((entita) => (
                <li key={`${entita.typ}-${entita.id}`} className="p-4 hover:bg-gray-50">
                  <a href={getDetailLink(entita)} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 text-gray-500">
                      {getTypIcon(entita)}
                    </div>
                    <div className="ml-3 flex-grow">
                      <h3 className="text-lg font-medium text-blue-600">{getTitulek(entita)}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{getPopis(entita)}</p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span className="bg-gray-200 px-2 py-1 rounded-full">
                          {entita.typ === 'autor' ? 'Spisovatel' : entita.typ === 'kniha' ? 'Kniha' : 'Článek'}
                        </span>
                        {entita.typ === 'autor' && entita.narozen && (
                          <span className="ml-2">Narozen: {entita.narozen}</span>
                        )}
                        {entita.typ === 'kniha' && entita.rok_vydani && (
                          <span className="ml-2">Vydáno: {entita.rok_vydani}</span>
                        )}
                        {entita.typ === 'clanek' && entita.datum_publikace && (
                          <span className="ml-2">Publikováno: {entita.datum_publikace}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 self-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}