import React from 'react';

export default function AktualityPage() {
  // Simulace dat pro aktuality
  const aktuality = [
    {
      id: 1,
      datum: '12. 5. 2025',
      titulek: 'Nové e-knihy v katalogu',
      obsah: 'Přidali jsme více než 50 nových e-knih od českých autorů.'
    },
    {
      id: 2,
      datum: '5. 5. 2025',
      titulek: 'Aktualizace platformy',
      obsah: 'Spustili jsme novou verzi webu s vylepšeným vyhledáváním a filtrací knih.'
    },
    {
      id: 3,
      datum: '28. 4. 2025',
      titulek: 'Spolupráce s novými nakladatelstvími',
      obsah: 'Navázali jsme spolupráci s dalšími nakladatelstvími pro rozšíření naší nabídky.'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Aktuality</h1>
        <p className="text-gray-600">Nejnovější zprávy a informace z našeho světa e-knih.</p>
      </div>

      <div className="space-y-6">
        {aktuality.map((aktualita) => (
          <div key={aktualita.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-500 mb-2">{aktualita.datum}</div>
            <h2 className="text-xl font-bold mb-2">{aktualita.titulek}</h2>
            <p className="text-gray-700">{aktualita.obsah}</p>
            <a href="#" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
              Číst více &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}