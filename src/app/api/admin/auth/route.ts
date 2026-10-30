import { NextResponse } from 'next/server';
import { createClient } from '@/src/lib/supabase/server';
import { verifyAdminSession } from '@/src/lib/supabase/auth';

/**
 * POST /api/admin/auth/login
 * Handles email/password authentication using Supabase Auth.
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!adminEmail) {
      return NextResponse.json(
        { error: 'ADMIN_EMAIL is not configured on the server.' },
        { status: 500 }
      );
    }

    // Verify email matches the admin allowlist before continuing
    if (email.trim().toLowerCase() !== adminEmail) {
      return NextResponse.json(
        { error: 'Unauthorized. This account is not an authorized administrator.' },
        { status: 403 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/auth (Forgot Password)
 * Sends password recovery email via Supabase Auth
 */
export async function PUT(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (adminEmail && email.trim().toLowerCase() !== adminEmail) {
      return NextResponse.json(
        { error: 'Email does not match the registered administrator account.' },
        { status: 403 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${new URL(request.url).origin}/admin/reset-password`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset link dispatched. Please check your inbox.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to dispatch reset email.' }, { status: 500 });
  }
}

/**
 * POST /api/admin/auth/logout
 * Signs out current administrator and clears auth cookies.
 */
export async function DELETE() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Logout failed.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth/session
 * Verifies currently active session.
 */
export async function GET() {
  const { isAdmin, user, error } = await verifyAdminSession();
  if (!isAdmin || !user) {
    return NextResponse.json({ isAdmin: false, error: error || 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    isAdmin: true,
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
