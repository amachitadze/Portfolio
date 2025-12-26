
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * 🛠 Supabase კონფიგურაცია
 * ვიყენებთ მხოლოდ გარემოს ცვლადებს. Placeholder-ები წაშლილია 
 * იმისთვის, რომ არასწორმა URL-მა არ გამოიწვიოს აპლიკაციის გაჭედვა.
 */
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

/**
 * 🛡 ვალიდაცია: ვამოწმებთ არის თუ არა URL და Key მოწოდებული.
 */
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co';

if (!isConfigured) {
  console.warn('⚠️ Supabase variables are missing. Please check your Environment Variables in Vercel.');
}

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder-to-prevent-crash.supabase.co',
  isConfigured ? supabaseAnonKey : 'no-key'
);
