import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// Création d'une instance unique du client Supabase
export const supabase = createClientComponentClient();
