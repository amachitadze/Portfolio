
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * 🛠 ეკოსისტემური ცვლადების წაკითხვის ფუნქცია.
 * Vite გარემოში (Vercel) პრიორიტეტულია import.meta.env.
 */
export const getEnv = (name: string): string => {
  const viteKey = `VITE_${name}`;
  
  // 1. მცდელობა Vite-ს სტანდარტულ გარემოში (ყველაზე სანდო Vercel + Vite-სთვის)
  try {
    const meta = (import.meta as any);
    if (meta && meta.env) {
      if (meta.env[viteKey]) return meta.env[viteKey];
      if (meta.env[name]) return meta.env[name];
    }
  } catch (e) {}

  // 2. მცდელობა Global Process გარემოში (Vercel Node/Edge fallback)
  try {
    // @ts-ignore
    const proc = (typeof process !== 'undefined' ? process : {}) as any;
    if (proc.env) {
      if (proc.env[viteKey]) return proc.env[viteKey];
      if (proc.env[name]) return proc.env[name];
    }
  } catch (e) {}

  // 3. მცდელობა Window/Global გარემოში
  try {
    const g = (typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : {})) as any;
    if (g[viteKey]) return g[viteKey];
    if (g[name]) return g[name];
  } catch (e) {}

  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder');

if (!isConfigured) {
  console.group('🚨 SUPABASE CONFIGURATION ERROR');
  console.error('ცვლადები ვერ მოიძებნა ბრაუზერის გარემოში.');
  console.info('URL სტატუსი:', supabaseUrl ? '✅ ნაპოვნია' : '❌ აკლია');
  console.info('KEY სტატუსი:', supabaseAnonKey ? '✅ ნაპოვნია' : '❌ აკლია');
  console.warn('ნაბიჯები გამოსასწორებლად:');
  console.warn('1. დარწმუნდით, რომ Vercel-ში გიწერიათ VITE_SUPABASE_URL');
  console.warn('2. აუცილებლად გააკეთეთ REDEPLOY (Deployments -> Redeploy), რომ Vite-მა ცვლადები კოდში ჩაწეროს.');
  console.groupEnd();
}

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isConfigured ? supabaseAnonKey : 'no-key'
);
