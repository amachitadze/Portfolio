
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// უსაფრთხო წაკითხვა, რომ import.meta.env-ის არარსებობამ არ გათიშოს აპლიკაცია
const getEnv = (key: string) => {
  try {
    return (import.meta as any).env?.[key] || '';
  } catch {
    return '';
  }
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://');

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isConfigured ? supabaseAnonKey : 'no-key'
);
