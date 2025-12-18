
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Supabase კონფიგურაცია.
 * მნიშვნელოვანია: Vercel-ზე ეს ცვლადები უნდა იყოს დამატებული Dashboard-ში.
 * თუ ისინი არ მუშაობს, შეამოწმეთ ცვლადების სახელები.
 */
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// თუ ცვლადები ცარიელია, ვაფრთხილებთ დეველოპერს კონსოლში
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase ცვლადები ვერ მოიძებნა. გთხოვთ დაამატოთ SUPABASE_URL და SUPABASE_ANON_KEY Vercel-ის პარამეტრებში.");
}

/**
 * Supabase კლიენტის ინიციალიზაცია.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
