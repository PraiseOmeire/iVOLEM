/**
 * Email Service using Resend
 *
 * This file handles sending emails through Resend's API.
 * When a user subscribes, an email notification is sent to the church.
 */

import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Parameters for sending subscription notification
 */
interface SendSubscriptionParams {
  subscriberEmail: string;
}

/**
 * Result of sending an email
 */
interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Sends a notification email to the church when someone subscribes
 *
 * This function:
 * 1. Creates an HTML email with the subscriber's details
 * 2. Sends it to the church email address
 * 3. Returns success/error status
 *
 * @param params - Contains the subscriberEmail
 * @returns EmailResult indicating success or failure
 *
 * @example
 * const result = await sendSubscriptionNotification({
 *   subscriberEmail: 'newuser@example.com'
 * });
 *
 * if (result.success) {
 *   console.log('Email sent successfully');
 * } else {
 *   console.error('Failed:', result.error);
 * }
 */
export async function sendSubscriptionNotification(
  params: SendSubscriptionParams
): Promise<EmailResult> {
  const { subscriberEmail } = params;

  // Get church email from environment, with fallback
  const churchEmail = process.env.CHURCH_EMAIL || 'info@fulllifeassembly.org';
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  // Format the current date/time for the email
  const subscriptionDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  // Create the HTML email content with styled template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Newsletter Subscription</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
                      🎉 New Newsletter Subscriber!
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Great news! Someone has subscribed to the Full Life Assembly newsletter.
                    </p>

                    <!-- Subscriber Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                      <tr>
                        <td>
                          <p style="color: #666666; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">
                            Subscriber Email
                          </p>
                          <p style="color: #DC2626; font-size: 18px; font-weight: bold; margin: 0 0 20px 0;">
                            ${subscriberEmail}
                          </p>

                          <p style="color: #666666; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">
                            Subscription Date
                          </p>
                          <p style="color: #333333; font-size: 16px; margin: 0;">
                            ${subscriptionDate}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                      This person is now part of your newsletter community. Consider reaching out with a welcome message!
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      Full Life Assembly Newsletter System
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    // Send the email using Resend
    const { error } = await resend.emails.send({
      from: `Full Life Assembly <${fromEmail}>`,
      to: [churchEmail],
      subject: '🎉 New Newsletter Subscription - Full Life Assembly',
      html: htmlContent,
    });

    // Check if there was an error from Resend
    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send notification email',
      };
    }

    // Email sent successfully
    return {
      success: true,
    };
  } catch (err) {
    // Handle unexpected errors
    console.error('Email service error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    };
  }
}
