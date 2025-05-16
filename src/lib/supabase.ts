import { createClient } from '@supabase/supabase-js'

// Výchozí hodnoty - POUZE PRO DEVELOPMENT
const isProduction = process.env.VERCEL_ENV === 'production'
const DEFAULT_SUPABASE_URL = 'https://vas-projekt.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'vas-anonymni-klic'

// V produkci vždy vyžadujeme proměnné prostředí
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || (!isProduction ? DEFAULT_SUPABASE_URL : null)
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (!isProduction ? DEFAULT_SUPABASE_ANON_KEY : null)

// Kontrola pouze pro produkční prostředí
if (isProduction && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('V produkci jsou vyžadovány Supabase proměnné prostředí')
}

// Vytvoření klienta s ošetřením případného null
export const supabase = createClient(
  supabaseUrl || DEFAULT_SUPABASE_URL, 
  supabaseAnonKey || DEFAULT_SUPABASE_ANON_KEY
)

// Definice typu pro knihu
export type Kniha = {
  id: number
  ID: string
  IMGURL: string
  PRODUCT: string
  CATEGORY_NAME?: string
  created_at?: string
  slug: string
}