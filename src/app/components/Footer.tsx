'use client';

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} eKnihy zdarma. Všechna práva vyhrazena.
    </footer>
  )
}