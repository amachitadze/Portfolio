
import { supabase } from '../services/supabase';

/**
 * 🚀 ბაზის "გამღვიძებელი" ფუნქცია.
 * ამ ფუნქციას უნდა ესტუმროს cron-job.org ყოველდღე.
 */
export default async function handler(req: any, res: any) {
  try {
    // ვასრულებთ უმარტივეს ქუერის ბაზის აქტივაციისთვის
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
    
    if (error) throw error;

    return res.status(200).json({ 
      status: 'ok', 
      message: 'Database is awake and active',
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error('Ping error:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
}
