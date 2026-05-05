/**
 * Prayer Request API Route
 *
 * POST /api/prayer-request
 *
 * This endpoint handles prayer request form submissions.
 * It validates all required fields and sends a formatted email
 * to the church using the Resend API.
 *
 * No database is used - the email serves as the record.
 */

import { NextRequest, NextResponse } from "next/server";
import { sendPrayerRequestEmail } from "@/lib/prayer-email";
import {
  PrayerRequestData,
  PrayerRequestResponse,
  AGE_RANGES,
  CONTACT_METHODS,
} from "@/types/prayer-request";

// Email configuration from environment variables
const CHURCH_EMAIL = process.env.CHURCH_EMAIL || "omeirepraise99@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

/**
 * Validates the prayer request data
 * Returns an array of error messages (empty if valid)
 */
function validatePrayerRequest(data: Partial<PrayerRequestData>): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!data.name || data.name.trim().length === 0) {
    errors.push("Name is required");
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.push("Phone number is required");
  }

  if (!data.preferredContact || !CONTACT_METHODS.includes(data.preferredContact)) {
    errors.push("Please select a preferred contact method");
  }

  if (!data.ageRange || !AGE_RANGES.includes(data.ageRange)) {
    errors.push("Please select your age range");
  }

  if (data.isMember === undefined || data.isMember === null) {
    errors.push("Please indicate if you are a member of Full Life Assembly");
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push("Subject is required");
  }

  if (!data.prayerMessage || data.prayerMessage.trim().length === 0) {
    errors.push("Prayer message is required");
  }

  // Optional email validation (if provided, must be valid format)
  if (data.email && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address");
    }
  }

  return errors;
}

export async function POST(request: NextRequest): Promise<NextResponse<PrayerRequestResponse>> {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const validationErrors = validatePrayerRequest(body);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fix the following errors",
          error: validationErrors.join(", "),
        },
        { status: 400 }
      );
    }

    // Sanitize and prepare data
    const prayerData: PrayerRequestData = {
      name: body.name.trim(),
      email: body.email?.trim() || undefined,
      phone: body.phone.trim(),
      preferredContact: body.preferredContact,
      ageRange: body.ageRange,
      isMember: Boolean(body.isMember),
      employmentStatus: body.employmentStatus || undefined,
      subject: body.subject.trim(),
      prayerMessage: body.prayerMessage.trim(),
    };

    // Send email notification
    const emailResult = await sendPrayerRequestEmail({
      data: prayerData,
      churchEmail: CHURCH_EMAIL,
      fromEmail: FROM_EMAIL,
    });

    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't submit your prayer request. Please try again.",
          error: "Failed to send email notification",
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Your prayer request has been submitted. Our prayer team will be lifting you up in prayer.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Prayer request API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
