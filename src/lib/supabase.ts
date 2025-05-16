// Vytvoř tento soubor ve src/lib/supabase.ts pokud neexistuje
import { createClient } from '@supabase/supabase-js'

// Bezpečnější způsob přístupu k proměnným prostředí
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Kontrola, zda proměnné prostředí jsou nastaveny
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('KRITICKÁ CHYBA: Chybí Supabase proměnné prostředí. Zkontrolujte nastavení.')
}

// Vytvoření klienta s ošetřením potenciálně chybějících proměnných
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Pro server components není potřeba ukládat session
  },
  // Přidáváme globální nastavení pro timeout - zabrání dlouhým čekáním
  global: {
    fetch: (...args) => {
      const [resource, config] = args
      const customConfig = { ...config }
      // Nastavíme timeout na 10 sekund aby se aplikace nezasekla
      const timeout = 10000
      
      return Promise.race([
        fetch(resource, customConfig),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Časový limit pro Supabase vypršel')), timeout)
        )
      ]) as Promise<Response>
    }
  }
})

// Definice typu pro knihu
export type Kniha = {
  id: number
  ID: string
  IMGURL: string
  PRODUCT: string
  CATEGORY_NAME?: string
  created_at?: string // Přidáno jako volitelné
}