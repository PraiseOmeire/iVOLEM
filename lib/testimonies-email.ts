/**
 * Testimony Email Template
 *
 * This module handles sending testimony notification emails to the church.
 * It uses the Resend API and formats the email with all submitted form data
 * in a professional, easy-to-read layout.
 */

import { Resend } from "resend";
import { TestimonyData } from "@/types/testimonies";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendTestimonyEmailParams {
  data: TestimonyData;
  churchEmail: string;
  fromEmail: string;
}

/**
 * Sends a formatted testimony email to the church
 *
 * @param params - Object containing testimony data and email addresses
 * @returns Promise with the email send result
 */
export async function sendTestimonyEmail({
  data,
  churchEmail,
  fromEmail,
}: SendTestimonyEmailParams) {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Build the HTML email template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Testimony Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                    New Testimony Received
                  </h1>
                  <p style="color: #FECACA; margin: 10px 0 0 0; font-size: 14px;">
                    Full Life Assembly
                  </p>
                </td>
              </tr>

              <!-- Timestamp & Category -->
              <tr>
                <td style="padding: 20px 30px 10px 30px; border-bottom: 1px solid #e5e7eb;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="color: #6B7280; font-size: 13px;">
                        Received: ${timestamp}
                      </td>
                      <td align="right">
                        <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 500; background-color: #FEF3C7; color: #92400E;">
                          ${data.category}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Contact Information Section -->
              <tr>
                <td style="padding: 20px 30px;">
                  <h2 style="color: #DC2626; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #FECACA; padding-bottom: 8px;">
                    Contact Information
                  </h2>
                  <table width="100%" cellpadding="8" cellspacing="0">
                    <tr>
                      <td width="30%" style="color: #6B7280; font-size: 14px; vertical-align: top;">Name:</td>
                      <td style="color: #111827; font-size: 14px; font-weight: 500;">${data.name}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Email:</td>
                      <td style="color: #111827; font-size: 14px;">
                        <a href="mailto:${data.email}" style="color: #DC2626; text-decoration: none;">${data.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Phone:</td>
                      <td style="color: #111827; font-size: 14px;">${data.phone}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Testimony Section -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <h2 style="color: #DC2626; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #FECACA; padding-bottom: 8px;">
                    Testimony
                  </h2>
                  <div style="padding: 20px; background-color: #FFF7ED; border-radius: 8px; border-left: 4px solid #DC2626;">
                    <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${data.testimony}</p>
                  </div>
                </td>
              </tr>

              <!-- Scripture Quote -->
              <tr>
                <td style="padding: 0 30px 20px 30px;">
                  <div style="text-align: center; padding: 15px; background-color: #F9FAFB; border-radius: 8px;">
                    <p style="color: #6B7280; font-size: 13px; font-style: italic; margin: 0;">
                      "Let the redeemed of the Lord tell their story—those he redeemed from the hand of the foe."
                    </p>
                    <p style="color: #9CA3AF; font-size: 12px; margin: 8px 0 0 0;">
                      — Psalm 107:2
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #F3F4F6; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; margin: 0; font-size: 12px;">
                    This testimony was submitted through the Full Life Assembly website.
                  </p>
                  <p style="color: #9CA3AF; margin: 8px 0 0 0; font-size: 11px;">
                    Consider reaching out to thank them for sharing their story.
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
    const result = await resend.emails.send({
      from: fromEmail,
      to: churchEmail,
      subject: `New Testimony: ${data.category} - from ${data.name}`,
      html: htmlContent,
      replyTo: data.email,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send testimony email:", error);
    return { success: false, error };
  }
}
