
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// უსაფრთხო წაკითხვა ბრაუზერისთვის
const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // Vercel-ისთვის და სხვა გარემოებისთვის
  return (window as any).process?.env?.[key] || '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
