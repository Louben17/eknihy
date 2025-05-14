'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-4">O projektu eKnihy zdarma</h3>
            <p className="text-gray-600 mb-4">
              Naším cílem je zpřístupnit kvalitní elektronické knihy zdarma pro všechny čtenáře. 
              Nabízíme rozsáhlou kolekci knih různých žánrů, které si můžete stáhnout ve formátech 
              vhodných pro vaše zařízení.
            </p>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">❤️</span>
              <span className="text-gray-600">S láskou ke knihám a čtenářům</span>
            </div>
          </div>
          
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-4">Užitečné odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
                  <span className="mr-2">•</span>O nás
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
                  <span className="mr-2">•</span>Ochrana osobních údajů
                </Link>
              </li>
              <li>
                <Link href="/podminky-pouziti" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
                  <span className="mr-2">•</span>Podmínky použití
                </Link>
              </li>
              <li>
                <Link href="/napiste-nam" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
                  <span className="mr-2">•</span>Napište nám
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
                  <span className="mr-2">•</span>Časté dotazy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-4">Kontaktujte nás</h3>
            <div className="space-y-3">
              <a href="mailto:info@eknihyzdarma.cz" className="text-gray-600 hover:text-blue-700 transition-colors flex items-center">
                <span className="mr-2">✉️</span>
                info@eknihyzdarma.cz
              </a>
              
              <div className="pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Sledujte nás</h4>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                    <span className="text-blue-700">f</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                     className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                    <span className="text-blue-700">t</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                     className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                    <span className="text-blue-700">ig</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Download Links - Optional */}
        <div className="border-t border-blue-200 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-blue-700 mr-2">📚</span>
            <span className="text-gray-700 font-medium">Dostupné na všech zařízeních</span>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/aplikace/android" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Android aplikace
            </Link>
            <Link href="/aplikace/ios" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black transition-colors text-sm font-medium">
              iOS aplikace
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-blue-200 mt-4 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div>
            &copy; {currentYear} eKnihy zdarma. Všechna práva vyhrazena.
          </div>
          
          <div className="mt-3 sm:mt-0 flex items-center">
            <span>Vytvořeno s</span>
            <span className="text-red-500 mx-1">❤️</span>
            <span>v České republice</span>
            <a href="https://github.com/username/eknihy" target="_blank" rel="noopener noreferrer" className="ml-3">
              <span className="text-gray-600 hover:text-gray-900 transition-colors">🔄</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}