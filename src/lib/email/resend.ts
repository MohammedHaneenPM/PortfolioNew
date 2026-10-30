import { Resend } from 'resend';

// Strict server-side Resend client initialization
export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Sanitize text to prevent HTML injection in emails
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * EMAIL 1: ADMIN NOTIFICATION TEMPLATE
 */
export function generateAdminNotificationEmail({
  fullName,
  email,
  preferredDate,
  preferredTime,
  agenda,
  submittedAt,
}: {
  fullName: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  agenda: string;
  submittedAt: string;
}) {
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeDate = escapeHtml(preferredDate);
  const safeTime = escapeHtml(preferredTime);
  const safeAgenda = escapeHtml(agenda);
  const safeSubmittedAt = escapeHtml(submittedAt);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Meeting Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 4px solid #0f172a; box-shadow: 8px 8px 0px 0px #ec4899; padding: 32px;">
    
    <div style="border-bottom: 3px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
      <span style="background-color: #fbcfe8; border: 2px solid #0f172a; color: #be185d; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; padding: 4px 8px; text-transform: uppercase;">
        Portfolio Meeting System
      </span>
      <h1 style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 12px 0 4px 0; text-transform: uppercase;">
        New Meeting Request Received
      </h1>
      <p style="font-size: 13px; color: #64748b; margin: 0; font-weight: 600;">
        Submitted at ${safeSubmittedAt}
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr>
        <td style="padding: 10px 12px; font-weight: 800; text-transform: uppercase; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">
          Visitor Name:
        </td>
        <td style="padding: 10px 12px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
          ${safeName}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: 800; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0;">
          Visitor Email:
        </td>
        <td style="padding: 10px 12px; font-weight: 700; color: #0284c7; border-bottom: 1px solid #e2e8f0;">
          <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none;">${safeEmail}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: 800; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0;">
          Requested Date:
        </td>
        <td style="padding: 10px 12px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
          ${safeDate}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: 800; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0;">
          Requested Time:
        </td>
        <td style="padding: 10px 12px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
          ${safeTime}
        </td>
      </tr>
    </table>

    <div style="background-color: #f8fafc; border: 2px solid #0f172a; padding: 16px; margin-bottom: 24px;">
      <h3 style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #be185d; margin: 0 0 8px 0;">
        Meeting Agenda / Reason:
      </h3>
      <p style="font-size: 14px; font-weight: 600; line-height: 1.6; color: #1e293b; margin: 0; white-space: pre-wrap;">
${safeAgenda}
      </p>
    </div>

    <div style="border-top: 2px solid #e2e8f0; padding-top: 16px; text-align: center;">
      <a href="mailto:${safeEmail}?subject=Re:%20Meeting%20Request%20-%20Mohammed%20Haneen" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; padding: 12px 24px; text-decoration: none; border: 2px solid #0f172a;">
        Reply Directly to Visitor
      </a>
    </div>

  </div>
</body>
</html>
`;
}

/**
 * EMAIL 2: VISITOR CONFIRMATION TEMPLATE
 */
export function generateVisitorConfirmationEmail({
  fullName,
  preferredDate,
  preferredTime,
}: {
  fullName: string;
  preferredDate: string;
  preferredTime: string;
}) {
  const safeName = escapeHtml(fullName);
  const safeDate = escapeHtml(preferredDate);
  const safeTime = escapeHtml(preferredTime);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Your Meeting Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 4px solid #0f172a; box-shadow: 8px 8px 0px 0px #06b6d4; padding: 32px;">
    
    <div style="border-bottom: 3px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
      <span style="background-color: #cffafe; border: 2px solid #0f172a; color: #0891b2; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; padding: 4px 8px; text-transform: uppercase;">
        Mohammed Haneen P M
      </span>
      <h1 style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 12px 0 4px 0; text-transform: uppercase;">
        Thank You for Your Meeting Request!
      </h1>
      <p style="font-size: 13px; color: #64748b; margin: 0; font-weight: 600;">
        Frontend & Full Stack Engineering
      </p>
    </div>

    <p style="font-size: 15px; font-weight: 600; line-height: 1.6; color: #334155;">
      Hi <strong>${safeName}</strong>,
    </p>

    <p style="font-size: 14px; font-weight: 500; line-height: 1.6; color: #475569;">
      Thank you for reaching out! I have received your request to connect and discuss your project.
    </p>

    <div style="background-color: #f0fdf4; border: 2px solid #0f172a; padding: 16px; margin: 24px 0;">
      <h3 style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #166534; margin: 0 0 12px 0;">
        Requested Schedule Details:
      </h3>
      <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 4px 0;">
        📅 Date: <strong>${safeDate}</strong>
      </p>
      <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 4px 0;">
        ⏰ Preferred Time: <strong>${safeTime}</strong>
      </p>
    </div>

    <div style="background-color: #fffbeb; border: 2px solid #0f172a; padding: 14px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #92400e; margin: 0; line-height: 1.5;">
        📌 <strong>Please Note:</strong> This is a booking request acknowledgement. I will review my calendar and follow up with a confirmed Google Meet / Zoom invitation link shortly.
      </p>
    </div>

    <p style="font-size: 14px; font-weight: 500; line-height: 1.6; color: #475569;">
      Looking forward to connecting with you!
    </p>

    <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 24px;">
      <p style="font-size: 13px; font-weight: 800; color: #0f172a; margin: 0;">
        Mohammed Haneen P M
      </p>
      <p style="font-size: 12px; font-weight: 600; color: #64748b; margin: 2px 0 0 0;">
        Frontend Developer & React/Next.js Specialist
      </p>
      <p style="font-size: 12px; color: #0284c7; margin: 4px 0 0 0;">
        <a href="https://mohammedhaneenpm.github.io/Portfolio" style="color: #0284c7; text-decoration: none; font-weight: 700;">Portfolio Website</a>
      </p>
    </div>

  </div>
</body>
</html>
`;
}
