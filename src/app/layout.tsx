// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryNav from './components/CategoryNav'

export const metadata = {
  title: 'eKnihy',
  description: 'Online knihovna pro každého',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* Hlavička */}
        <Header />

        {/* Pás karet s kategoriemi */}
        <CategoryNav />

        {/* Hlavní obsah stránky */}
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Paticka */}
        <Footer />
      </body>
    </html>
  )
}
