import { createClient } from '@supabase/supabase-js'

// One client for the whole app. It keeps the session in localStorage so a refresh can recover it.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)
