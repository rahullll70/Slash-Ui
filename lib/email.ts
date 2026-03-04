import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(email: string, otp: string) {
  const response = await resend.emails.send({
    from: 'Slash/Ui <onboarding@resend.dev>',
    to: email,
    subject: 'Your verification code',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
        <div style="margin-bottom: 32px;">
           <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; letter-spacing: -0.02em;">
            
            <span>SLASH/UI</span>
          </div>
        </div>
        
        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px; color: #000;">Your verification code</h2>
        <p style="font-size: 16px; color: #666; margin-bottom: 32px;">Use the one-time code below to continue.</p>
        
        <div style="background-color: #f7f7f7; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <span style="font-size: 32px; font-weight: 500; letter-spacing: 12px; color: #000; font-family: monospace;">${otp}</span>
        </div>
        
        <p style="font-size: 14px; color: #888; line-height: 1.5; margin-bottom: 24px;">
          This code will expire in 5 minutes and can only be used once.<br />
          For your security, do not share this code with anyone.
        </p>
        
        <div style="font-size: 14px; color: #666;">
          Have fun,<br />
          <strong style="color: #000;">The Slash/UI Team</strong>
        </div>
      </div>
    `,
  });

  return response;
}
