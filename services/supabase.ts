
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Supabase client configuration.
 * ცვლადები იკითხება უშუალოდ process.env-იდან. 
 * პლატფორმა უზრუნველყოფს მათ ინექციას runtime-ში.
 */
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// კლიენტის ინიციალიზაცია. თუ ცვლადები აკლია, Supabase-ის SDK თავად დააბრუნებს 
// ვალიდურ შეცდომას მხოლოდ რეალური მოთხოვნის გაგზავნის მცდელობისას.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
