
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * ⚠️ მნიშვნელოვანი: Vite-ში გარემო ცვლადები უნდა ეწეროს სტატიკურად, 
 * რომ build-ის დროს მოხდეს მათი ტექსტური ჩანაცვლება.
 */
// გასწორება: TypeScript-ის შეცდომა 'env' თვისებაზე
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder');

if (!isConfigured) {
  console.group('🚨 SUPABASE CONFIGURATION ERROR');
  console.error('ცვლადები ვერ ჩაინაცვლა. დარწმუნდით, რომ Vercel-ში VITE_SUPABASE_URL და VITE_SUPABASE_ANON_KEY სწორადაა.');
  console.groupEnd();
}

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isConfigured ? supabaseAnonKey : 'no-key'
);