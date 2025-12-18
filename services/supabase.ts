
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Vercel-ის გარემოს ცვლადები
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

/**
 * Supabase კლიენტი.
 * თუ ცვლადები არ არის გაწერილი, ვიყენებთ Placeholder-ებს, რომ თავიდან ავიცილოთ ინიციალიზაციის შეცდომა (Required URL error).
 * რეალური მონაცემების მისაღებად აუცილებელია SUPABASE_URL და SUPABASE_ANON_KEY-ს დამატება Vercel-ში.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
