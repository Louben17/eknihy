import React from 'react';
import Image from 'next/image';

export default function JakCistEknihyPage() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Jak číst e-knihy</h1>
        <p className="text-gray-600">Kompletní průvodce pro čtení elektronických knih na různých zařízeních.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Vyberte si správné zařízení</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">📱</div>
              <h3 className="font-bold mb-2">Mobilní telefon</h3>
              <p className="text-sm text-gray-600">Vhodné pro čtení na cestách. Použijte aplikace jako Kindle, Albi Reader nebo Palmknihy.</p>
            </div>
            <div className="border p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">📚</div>
              <h3 className="font-bold mb-2">Čtečka e-knih</h3>
              <p className="text-sm text-gray-600">Nejlepší uživatelský zážitek díky e-ink displeji. Amazon Kindle, PocketBook nebo Inkbook.</p>
            </div>
            <div className="border p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">💻</div>
              <h3 className="font-bold mb-2">Počítač/Tablet</h3>
              <p className="text-sm text-gray-600">Vhodné pro studium a technickou literaturu. Použijte Calibre nebo Adobe Digital Editions.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Populární formáty e-knih</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-bold">EPUB</span> - Nejrozšířenější otevřený formát pro e-knihy, podporován většinou čteček kromě Kindle.
            </li>
            <li>
              <span className="font-bold">MOBI</span> - Formát používaný hlavně na zařízeních Amazon Kindle.
            </li>
            <li>
              <span className="font-bold">PDF</span> - Univerzální formát s pevným rozložením, vhodný pro technické publikace.
            </li>
            <li>
              <span className="font-bold">AZW3</span> - Nový formát od Amazonu s podporou pokročilého formátování.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Jak stáhnout a otevřít e-knihu</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <p className="font-bold">Stáhněte si e-knihu z našeho katalogu</p>
              <p className="text-gray-600">Klikněte na tlačítko "Stáhnout" u vybrané knihy.</p>
            </li>
            <li>
              <p className="font-bold">Otevřete soubor ve vašem zařízení</p>
              <p className="text-gray-600">Použijte čtečku kompatibilní se staženým formátem.</p>
            </li>
            <li>
              <p className="font-bold">Konverze formátu (pokud je potřeba)</p>
              <p className="text-gray-600">Použijte program Calibre pro konverzi mezi formáty.</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Tipy pro lepší čtení</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <ul className="list-disc pl-6 space-y-2">
              <li>Upravte si velikost písma a kontrast podle svých potřeb.</li>
              <li>Používejte noční režim při čtení ve tmě.</li>
              <li>Synchronizujte své knihy mezi zařízeními pomocí cloudových služeb.</li>
              <li>Vytvářejte záložky a zvýrazňujte důležité pasáže.</li>
              <li>Používejte slovník pro neznámá slova.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}