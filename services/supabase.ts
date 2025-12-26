
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * 🛠️ გარემოს ცვლადების უნივერსალური წამკითხველი.
 * მუშაობს როგორც ბრაუზერში (Vite), ასევე სერვერზე (Vercel Node.js).
 */
const getEnv = (key: string) => {
  try {
    // ვამოწმებთ ბრაუზერის/Vite-ის გარემოს
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env[key] || '';
    }
  } catch (e) {}
  
  try {
    // ვამოწმებთ Node.js გარემოს (სერვერული ფუნქციებისთვის)
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || '';
    }
  } catch (e) {}

  return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('SUPABASE_ANON_KEY');

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://');

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isConfigured ? supabaseAnonKey : 'no-key'
);
