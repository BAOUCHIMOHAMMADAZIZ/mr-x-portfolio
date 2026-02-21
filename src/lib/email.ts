import { EMAIL_CONFIG } from './constants';

interface SendEmailParams {
  email: string;
  phone?: string;
  message: string;
  submissionId: string;
}

/**
 * Send email notification about contact form submission
 * Tries Resend first, falls back to SMTP
 */
export async function sendContactNotification(params: SendEmailParams): Promise<boolean> {
  try {
    // Try Resend first
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(params);
    }

    // Fall back to SMTP
    if (process.env.SMTP_HOST) {
      return await sendViaSMTP(params);
    }

    console.warn('No email service configured');
    return false;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false; // Graceful degradation
  }
}

/**
 * Send email via Resend
 */
async function sendViaResend(params: SendEmailParams): Promise<boolean> {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      throw new Error('OWNER_EMAIL not configured');
    }

    const htmlContent = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>From:</strong> ${escapeHtml(params.email)}</p>
        ${params.phone ? `<p><strong>Phone:</strong> ${escapeHtml(params.phone)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
          ${escapeHtml(params.message)}
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p style="color: #666; font-size: 12px;">
          Submission ID: ${escapeHtml(params.submissionId)}<br />
          Submitted at: ${new Date().toISOString()}
        </p>
        <p style="color: #666; font-size: 12px;">
          <a href="mailto:${escapeHtml(params.email)}">Reply to this email</a>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: `${EMAIL_CONFIG.FROM_NAME} <noreply@resend.dev>`,
      to: ownerEmail,
      subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} ${params.email}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('Resend email error:', error);
    return false;
  }
}

/**
 * Send email via SMTP (Gmail, SendGrid, custom server)
 */
async function sendViaSMTP(params: SendEmailParams): Promise<boolean> {
  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      throw new Error('OWNER_EMAIL not configured');
    }

    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    const htmlContent = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>From:</strong> ${escapeHtml(params.email)}</p>
        ${params.phone ? `<p><strong>Phone:</strong> ${escapeHtml(params.phone)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
          ${escapeHtml(params.message)}
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p style="color: #666; font-size: 12px;">
          Submission ID: ${escapeHtml(params.submissionId)}<br />
          Submitted at: ${new Date().toISOString()}
        </p>
        <p style="color: #666; font-size: 12px;">
          <a href="mailto:${escapeHtml(params.email)}">Reply to this email</a>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: fromEmail,
      to: ownerEmail,
      subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} ${params.email}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('SMTP email error:', error);
    return false;
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
