
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// თუ ცვლადები აკლია, კლიენტი მაინც იქმნება Placeholder-ით, რომ აპი არ გაითიშოს, 
// თუმცა მონაცემების წასაკითხად აუცილებელია Vercel-ში მათი გაწერა.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
