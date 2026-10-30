import { createClient } from './server';

/**
 * Verify whether the currently active session belongs to an authorized administrator.
 *
 * Checks:
 * 1. An authenticated session exists.
 * 2. The user's email matches the server-configured ADMIN_EMAIL (or admin role in user_metadata).
 *
 * Returns: { isAdmin: boolean, user: User | null, error?: string }
 */
export async function verifyAdminSession() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'connect.haneen@gmail.com').trim().toLowerCase();

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return {
        isAdmin: false,
        user: null,
        error: 'No authenticated session found.',
      };
    }

    const isEmailMatched = user.email.trim().toLowerCase() === adminEmail;
    // Only app_metadata can be modified by service role / server; user_metadata is user-editable so it must never grant admin privileges
    const isAppMetadataAdmin = user.app_metadata?.role === 'admin';

    if (!isEmailMatched && !isAppMetadataAdmin) {
      return {
        isAdmin: false,
        user,
        error: 'Authenticated user is not an authorized administrator.',
      };
    }

    return {
      isAdmin: true,
      user,
    };
  } catch (err: any) {
    return {
      isAdmin: false,
      user: null,
      error: err.message || 'Error validating session.',
    };
  }
}
