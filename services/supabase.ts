
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// პირდაპირ process.env-ის გამოყენება, რადგან Vercel მას ავტომატურად აინექტირებს
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check Vercel Environment Variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
