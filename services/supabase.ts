
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * 🛠 Supabase კონფიგურაცია
 * მონაცემთა ბაზასთან კავშირის დასამყარებლად საჭიროა URL და API გასაღები.
 */
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-key';

/**
 * 🛡 ვალიდაცია: ვამოწმებთ არის თუ არა URL სწორი ფორმატის.
 * თუ URL არასწორია, აპლიკაცია არ გაითიშება და გამოიყენებს placeholder-ს.
 */
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 🚀 Supabase კლიენტის ინიციალიზაცია
 */
export const supabase = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey
);
