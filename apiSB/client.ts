import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseDatabase } from './types';

export function createSupabaseClient(url: string, anonKey: string): SupabaseClient<SupabaseDatabase> {
  return createClient<SupabaseDatabase>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'apikey': anonKey,
      }
    }
  });
}

// Default instance using environment variables
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wejnpgxqolueujhhjnrz.supabase.co';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// export const supabase = createSupabaseClient(supabaseUrl, supabaseKey); 