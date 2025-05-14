// Odstraněna "use client" direktiva z tohoto souboru

import './globals.css'
import { ReactNode } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: 'eKnihy',
  description: 'Aplikace na stahování e-knih',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* Header komponenta je nyní samostatná */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto p-4">
          {children}
        </main>

        {/* Footer komponenta je nyní samostatná */}
        <Footer />
      </body>
    </html>
  )
}