'use client';

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [search, setSearch] = useState('')

  return (
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
  )
}