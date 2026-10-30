import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';

/**
 * Privileged Service-Role Supabase Client.
 *
 * CRITICAL SECURITY RULES:
 * 1. ONLY import and use this file in server-side Route Handlers or Server Actions.
 * 2. NEVER expose SUPABASE_SERVICE_ROLE_KEY to NEXT_PUBLIC_* environment variables or browser code.
 * 3. Use solely for administrative tasks (e.g. initial seeding, privileged operations, admin verification).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for admin client.'
    );
  }

  return createSupabaseAdminClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
