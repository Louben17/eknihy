'use client';  // Tato direktiva umožňuje použití React hooků v klientské komponentě

import './globals.css'
import { ReactNode, useState } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'eKnihy',
  description: 'Aplikace na stahování e-knih',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('')

  return (
    <html lang="cs">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        
        {/* Header */}
        <header className="bg-white shadow p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="https://www.eknihyzdarma.cz/imgs/logo.png"
                alt="Logo"
                className="h-10"
              />
              <span className="text-xl font-bold hidden sm:inline">eKnihy zdarma</span>
            </Link>

            {/* Navigation Links */}
            <nav className="space-x-4">
              <Link href="/katalog-knih" className="text-sm">Katalog knih</Link>
              <Link href="/katalog-spisovatelu" className="text-sm">Katalog spisovatelů</Link>
              <Link href="/jak-cist-eknihy" className="text-sm">Jak číst eKnihy</Link>
              <Link href="/aktuality" className="text-sm">Aktuality</Link>
            </nav>

            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Hledat knihy..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300"
              />
              <span className="absolute left-3 top-2 text-gray-500">🔍</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto p-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} eKnihy zdarma. Všechna práva vyhrazena.
        </footer>
      </body>
    </html>
  )
}
