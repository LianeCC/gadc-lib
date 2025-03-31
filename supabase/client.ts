import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseDatabase } from '../apiSB';

// Création d'une instance unique du client Supabase
export const supabase = createClientComponentClient<SupabaseDatabase>(); 