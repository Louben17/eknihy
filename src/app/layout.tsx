// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import CategoryNav from './components/CategoryNav'

export const metadata = {
  title: 'eKnihy',
  description: 'Online knihovna pro každého',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* Pás karet s kategoriemi */}
        <CategoryNav />

        {/* Hlavní obsah stránky */}
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
        
        {/* Footer (volitelně) */}
        <footer className="bg-gray-100 text-center text-sm py-4 mt-auto">
          © {new Date().getFullYear()} eKnihy.cz — Všechna práva vyhrazena.
        </footer>
      </body>
    </html>
  )
}
