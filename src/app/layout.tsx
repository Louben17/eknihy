// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'eKnihy',
  description: 'Aplikace na stahování e-knih',
}

export default function RootLayout({ children }: { children: ReactNode }) {
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
          </div>
        </header>

        {/* Main */}
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
