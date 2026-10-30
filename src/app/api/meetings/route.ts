import { NextResponse } from 'next/server';
import { createAdminClient } from '@/src/lib/supabase/admin';
import {
  getResendClient,
  generateAdminNotificationEmail,
  generateVisitorConfirmationEmail,
} from '@/src/lib/email/resend';

/**
 * POST /api/meetings
 * Public meeting booking submission endpoint with:
 * 1. Request payload size checking
 * 2. Input sanitization and strict validation
 * 3. Client IP extraction and durable PostgreSQL rate limiting
 * 4. Idempotency key duplicate protection
 * 5. Database persistence first (record saved before any email attempt)
 * 6. Dual Resend email dispatch (Admin Notification & Visitor Confirmation)
 * 7. Independent email status tracking ('pending', 'accepted', 'failed')
 */
export async function POST(request: Request) {
  try {
    // 1. Check Content-Type & Payload Size (< 50 KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50 * 1024) {
      return NextResponse.json(
        { error: 'Payload size exceeds the 50 KB limit.' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const {
      fullName,
      email,
      preferredDate,
      preferredTime,
      agenda,
      idempotencyKey,
    } = body;

    // 2. Strict Server-Side Validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is mandatory.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!preferredDate || typeof preferredDate !== 'string') {
      return NextResponse.json(
        { error: 'Preferred date is mandatory.' },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (preferredDate < todayStr) {
      return NextResponse.json(
        { error: 'Past dates are not allowed for meeting bookings.' },
        { status: 400 }
      );
    }

    if (!preferredTime || typeof preferredTime !== 'string') {
      return NextResponse.json(
        { error: 'Preferred time is mandatory.' },
        { status: 400 }
      );
    }

    if (!agenda || typeof agenda !== 'string' || agenda.trim().length < 10) {
      return NextResponse.json(
        { error: 'Meeting agenda must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Extract client IP address for durable shared rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'unknown';

    // Check if Supabase credentials are configured
    const isSupabaseConfigured =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

    if (!isSupabaseConfigured) {
      // In development when credentials are not yet entered
      return NextResponse.json({
        success: true,
        persisted: false,
        message:
          'Your meeting request details have been validated on the server. (Database connection is pending Supabase configuration).',
        booking: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          preferredDate,
          preferredTime,
          agenda: agenda.trim(),
        },
      });
    }

    const adminSupabase = createAdminClient();

    // 3. Durable PostgreSQL Rate Limiting Check (Max 5 requests/hour per IP)
    if (clientIp !== 'unknown') {
      const { data: isAllowed, error: rateError } = await adminSupabase.rpc(
        'check_meeting_rate_limit',
        { p_ip_address: clientIp }
      );

      // If function executed and explicitly returned false, reject
      if (!rateError && isAllowed === false) {
        return NextResponse.json(
          {
            error:
              'Too many meeting requests from this network. Please wait a while before submitting again.',
          },
          { status: 429 }
        );
      }
    }

    // 4. Idempotency duplicate check
    const clientKey =
      idempotencyKey ||
      `${email.trim().toLowerCase()}_${preferredDate}_${preferredTime}`;

    const { data: existingBooking } = await adminSupabase
      .from('meetings')
      .select('id, created_at, full_name, email, preferred_date, preferred_time')
      .eq('idempotency_key', clientKey)
      .maybeSingle();

    if (existingBooking) {
      // Already recorded! Return existing record idempotently
      return NextResponse.json({
        success: true,
        persisted: true,
        message: 'Your meeting request has already been recorded.',
        booking: existingBooking,
      });
    }

    // 5. Database Persistence FIRST (Before attempting emails)
    const { data: savedMeeting, error: insertError } = await adminSupabase
      .from('meetings')
      .insert({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        agenda: agenda.trim(),
        idempotency_key: clientKey,
        ip_address: clientIp,
        admin_email_status: 'pending',
        visitor_email_status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      // Check if duplicate key violation occurred concurrently
      if (insertError.code === '23505') {
        return NextResponse.json({
          success: true,
          persisted: true,
          message: 'Your meeting request has already been received.',
        });
      }
      return NextResponse.json(
        { error: `Database error: ${insertError.message}` },
        { status: 500 }
      );
    }

    // 6. Resend Email Dispatch (Non-destructive: booking remains safe even if emails fail)
    let adminEmailStatus: 'accepted' | 'failed' | 'pending' = 'pending';
    let visitorEmailStatus: 'accepted' | 'failed' | 'pending' = 'pending';
    let adminEmailError: string | null = null;
    let visitorEmailError: string | null = null;

    const resend = getResendClient();
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev';

    if (resend && adminEmail) {
      const submissionTimestamp = new Date().toUTCString();

      // EMAIL 1: ADMIN NOTIFICATION
      try {
        const { error: sendAdminError } = await resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `New Meeting Request – ${fullName.trim()}`,
          html: generateAdminNotificationEmail({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            preferredDate,
            preferredTime,
            agenda: agenda.trim(),
            submittedAt: submissionTimestamp,
          }),
        });

        if (sendAdminError) {
          adminEmailStatus = 'failed';
          adminEmailError = sendAdminError.message;
        } else {
          adminEmailStatus = 'accepted';
        }
      } catch (err: any) {
        adminEmailStatus = 'failed';
        adminEmailError = err.message || 'Error executing admin email request';
      }

      // EMAIL 2: VISITOR CONFIRMATION
      try {
        const { error: sendVisitorError } = await resend.emails.send({
          from: fromEmail,
          to: email.trim().toLowerCase(),
          subject: 'Thank You for Your Meeting Request!',
          html: generateVisitorConfirmationEmail({
            fullName: fullName.trim(),
            preferredDate,
            preferredTime,
          }),
        });

        if (sendVisitorError) {
          visitorEmailStatus = 'failed';
          visitorEmailError = sendVisitorError.message;
        } else {
          visitorEmailStatus = 'accepted';
        }
      } catch (err: any) {
        visitorEmailStatus = 'failed';
        visitorEmailError = err.message || 'Error executing visitor email request';
      }

      // 7. Update Email Delivery Statuses in PostgreSQL
      await adminSupabase
        .from('meetings')
        .update({
          admin_email_status: adminEmailStatus,
          visitor_email_status: visitorEmailStatus,
          admin_email_error: adminEmailError,
          visitor_email_error: visitorEmailError,
        })
        .eq('id', savedMeeting.id);
    }

    // 8. Return honest status response
    const bothEmailsAccepted =
      adminEmailStatus === 'accepted' && visitorEmailStatus === 'accepted';

    return NextResponse.json({
      success: true,
      persisted: true,
      id: savedMeeting.id,
      emailNotification: {
        admin: adminEmailStatus,
        visitor: visitorEmailStatus,
      },
      message: bothEmailsAccepted
        ? 'Thank you! Your meeting request has been submitted and confirmation has been sent to your email.'
        : 'Your meeting request has been received. We will follow up with you shortly.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error while submitting booking.' },
      { status: 500 }
    );
  }
}
