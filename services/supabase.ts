
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Supabase client configuration.
 * Relies on the platform to inject process.env variables at runtime or build time.
 */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Supabase credentials missing from process.env.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
