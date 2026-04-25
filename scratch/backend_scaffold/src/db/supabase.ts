import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn('⚠️ Warning: SUPABASE_URL is missing in .env');
}

// We use service role key if available, otherwise fallback to anon key
const keyToUse = supabaseServiceKey || supabaseAnonKey;

export const supabase = createClient(
  supabaseUrl || 'YOUR_SUPABASE_URL',
  keyToUse || 'YOUR_SUPABASE_KEY'
);
