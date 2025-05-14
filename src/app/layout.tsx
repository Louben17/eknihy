// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'eKnihy',
  description: 'Aplikace na stahování e-knih',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white shadow p-4 text-xl font-bold">
          📚 eKnihy
        </header>
        <main className="max-w-4xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
