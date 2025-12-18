
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// პირდაპირი მიმართვა აუცილებელია, რათა Build-ის დროს მოხდეს ტექსტის ჩანაცვლება
const supabaseUrl = typeof process !== 'undefined' ? process.env.SUPABASE_URL : '';
const supabaseAnonKey = typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY : '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found in process.env. Ensure they are set in Vercel/Environment Variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
