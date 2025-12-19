
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Supabase კონფიგურაცია.
 * 
 * თუ Vercel-ზე გარემოს ცვლადები არ მუშაობს, ეს ნიშნავს რომ ისინი არ არის დამატებული 
 * Vercel Dashboard-ში (Settings -> Environment Variables).
 * 
 * ყურადღება: SUPABASE_URL უნდა იწყებოდეს https://-ით.
 */
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key-placeholder';

// ვამოწმებთ არის თუ არა URL ვალიდური ფორმატის
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn("Supabase-ის რეალური გასაღებები ვერ მოიძებნა. მონაცემების შენახვა არ იმუშავებს.");
}

/**
 * Supabase კლიენტის ინიციალიზაცია.
 * ვიყენებთ placeholder-ს თუ URL არასწორია, რომ აპლიკაცია არ გაითიშოს.
 */
export const supabase = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-only.supabase.co',
  supabaseAnonKey
);
