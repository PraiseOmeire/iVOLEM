/**
 * Prayer Request Email Template
 *
 * This module handles sending prayer request notification emails to the church.
 * It uses the Resend API (same as newsletter) and formats the email with all
 * submitted form data in a professional, easy-to-read layout.
 */

import { Resend } from "resend";
import { PrayerRequestData } from "@/types/prayer-request";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendPrayerRequestEmailParams {
  data: PrayerRequestData;
  churchEmail: string;
  fromEmail: string;
}

/**
 * Sends a formatted prayer request email to the church
 *
 * @param params - Object containing prayer request data and email addresses
 * @returns Promise with the email send result
 */
export async function sendPrayerRequestEmail({
  data,
  churchEmail,
  fromEmail,
}: SendPrayerRequestEmailParams) {
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
      <title>New Prayer Request</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                    New Prayer Request
                  </h1>
                  <p style="color: #DBEAFE; margin: 10px 0 0 0; font-size: 14px;">
                    Full Life Assembly
                  </p>
                </td>
              </tr>

              <!-- Timestamp -->
              <tr>
                <td style="padding: 20px 30px 10px 30px; border-bottom: 1px solid #e5e7eb;">
                  <p style="color: #6B7280; margin: 0; font-size: 13px;">
                    Received: ${timestamp}
                  </p>
                </td>
              </tr>

              <!-- Contact Information Section -->
              <tr>
                <td style="padding: 20px 30px;">
                  <h2 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #DBEAFE; padding-bottom: 8px;">
                    Contact Information
                  </h2>
                  <table width="100%" cellpadding="8" cellspacing="0">
                    <tr>
                      <td width="40%" style="color: #6B7280; font-size: 14px; vertical-align: top;">Name:</td>
                      <td style="color: #111827; font-size: 14px; font-weight: 500;">${data.name}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Email:</td>
                      <td style="color: #111827; font-size: 14px;">${data.email || "Not provided"}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Phone:</td>
                      <td style="color: #111827; font-size: 14px;">${data.phone}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Preferred Contact:</td>
                      <td style="color: #111827; font-size: 14px;">${data.preferredContact}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Personal Information Section -->
              <tr>
                <td style="padding: 0 30px 20px 30px;">
                  <h2 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #DBEAFE; padding-bottom: 8px;">
                    Personal Information
                  </h2>
                  <table width="100%" cellpadding="8" cellspacing="0">
                    <tr>
                      <td width="40%" style="color: #6B7280; font-size: 14px; vertical-align: top;">Age Range:</td>
                      <td style="color: #111827; font-size: 14px;">${data.ageRange}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Member of Full Life:</td>
                      <td style="color: #111827; font-size: 14px;">
                        <span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; ${
                          data.isMember
                            ? "background-color: #DEF7EC; color: #03543F;"
                            : "background-color: #FEE2E2; color: #991B1B;"
                        }">
                          ${data.isMember ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #6B7280; font-size: 14px; vertical-align: top;">Employment Status:</td>
                      <td style="color: #111827; font-size: 14px;">${data.employmentStatus || "Not provided"}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Prayer Request Section -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <h2 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #DBEAFE; padding-bottom: 8px;">
                    Prayer Request
                  </h2>
                  <table width="100%" cellpadding="8" cellspacing="0">
                    <tr>
                      <td style="color: #6B7280; font-size: 14px;">Subject:</td>
                    </tr>
                    <tr>
                      <td style="color: #111827; font-size: 14px; font-weight: 500;">${data.subject}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 15px; padding: 20px; background-color: #F9FAFB; border-radius: 8px; border-left: 4px solid #DC2626;">
                    <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.prayerMessage}</p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #F3F4F6; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; margin: 0; font-size: 12px;">
                    This prayer request was submitted through the Full Life Assembly website.
                  </p>
                  <p style="color: #9CA3AF; margin: 8px 0 0 0; font-size: 11px;">
                    Please respond to this request in a timely manner.
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
      subject: `Prayer Request: ${data.subject}`,
      html: htmlContent,
      replyTo: data.email || undefined,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send prayer request email:", error);
    return { success: false, error };
  }
}
