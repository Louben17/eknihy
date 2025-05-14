'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Book, User, Info, Bell } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://www.eknihyzdarma.cz/imgs/logo.png"
              alt="Logo"
              className="h-10"
            />
            <span className="text-xl font-bold text-blue-700 hidden sm:inline">eKnihy zdarma</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/katalog-knih" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Book className="h-4 w-4 mr-1" />
              <span>Katalog knih</span>
            </Link>
            <Link href="/katalog-spisovatelu" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <User className="h-4 w-4 mr-1" />
              <span>Katalog spisovatelů</span>
            </Link>
            <Link href="/jak-cist-eknihy" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Info className="h-4 w-4 mr-1" />
              <span>Jak číst eKnihy</span>
            </Link>
            <Link href="/aktuality" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Bell className="h-4 w-4 mr-1" />
              <span>Aktuality</span>
            </Link>
          </nav>

          {/* Search Box - Hidden on smaller screens */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Hledat knihy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-48 lg:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Mobile Search - Always visible even on mobile */}
          <div className="sm:hidden flex items-center">
            <button 
              onClick={() => {/* Implement search functionality */}}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors mr-2"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden shadow-lg border-t">
          <div className="px-4 py-3 space-y-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Hledat knihy..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              <Link href="/katalog-knih" 
                className="flex items-center text-gray-700 hover:text-blue-600 py-2 transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Book className="h-5 w-5 mr-3" />
                <span className="font-medium">Katalog knih</span>
              </Link>
              <Link href="/katalog-spisovatelu" 
                className="flex items-center text-gray-700 hover:text-blue-600 py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-3" />
                <span className="font-medium">Katalog spisovatelů</span>
              </Link>
              <Link href="/jak-cist-eknihy" 
                className="flex items-center text-gray-700 hover:text-blue-600 py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Info className="h-5 w-5 mr-3" />
                <span className="font-medium">Jak číst eKnihy</span>
              </Link>
              <Link href="/aktuality" 
                className="flex items-center text-gray-700 hover:text-blue-600 py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bell className="h-5 w-5 mr-3" />
                <span className="font-medium">Aktuality</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}