import type { SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseDatabase } from './types';
export declare function createSupabaseClient(url: string, anonKey: string): SupabaseClient<SupabaseDatabase>;
export declare const supabase: SupabaseClient<SupabaseDatabase, "public", any>;
