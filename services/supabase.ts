
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// 🛠️ პირდაპირი მიმართვა Vite-ს გარემო ცვლადებზე
// Vite ამას build-ის დროს რეალური მნიშვნელობით ჩაანაცვლებს
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// დამხმარე ფუნქცია სხვა ცვლადებისთვის (მაგ: პაროლები)
export const getEnv = (name: string): string => {
  const meta = (import.meta as any);
  // ვამოწმებთ ორივე ვარიანტს: სახელით და VITE_ პრეფიქსით
  return meta.env?.[`VITE_${name}`] || meta.env?.[name] || '';
};

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder');

if (!isConfigured) {
  console.group('🚨 SUPABASE CONFIGURATION ERROR');
  console.error('ცვლადები ვერ მოიძებნა. დარწმუნდით, რომ Vercel-ში გაწერილია VITE_SUPABASE_URL და VITE_SUPABASE_ANON_KEY');
  console.info('URL:', supabaseUrl ? '✅ OK' : '❌ MISSING');
  console.info('KEY:', supabaseAnonKey ? '✅ OK' : '❌ MISSING');
  console.groupEnd();
}

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isConfigured ? supabaseAnonKey : 'no-key'
);
