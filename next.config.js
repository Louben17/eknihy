/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pokud potřebujete použít externí obrázky mimo vaši doménu
  images: {
    domains: [
      // Přidejte domény z kterých budou načítány obrázky
      // Například pokud data z Supabase obsahují odkazy na obrázky
      'dummyimage.com', // Příklad domény
      'images.unsplash.com',
      // Přidejte další domény podle potřeby
    ],
    // Pokud používáte Supabase Storage pro ukládání obrázků
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  // Experimentální funkce mohou být v Next.js 14 zapnuté pokud je potřebujete
  experimental: {
    // serverActions: true, // Pro použití Server Actions ve formulářích
    // typedRoutes: true,   // Pro lepší typování routů
  },
}

module.exports = nextConfig