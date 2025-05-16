// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // Next.js app router složka
    "./src/components/**/*.{js,ts,jsx,tsx}", // pokud máte komponenty
    "./src/pages/**/*.{js,ts,jsx,tsx}", // pokud používáte pages router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
