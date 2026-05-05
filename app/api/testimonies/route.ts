/**
 * Testimonies API Route
 *
 * POST /api/testimonies
 *
 * This endpoint handles testimony form submissions.
 * It validates all required fields and sends a formatted email
 * to the church using the Resend API.
 *
 * No database is used - the email serves as the record.
 */

import { NextRequest, NextResponse } from "next/server";
import { sendTestimonyEmail } from "@/lib/testimonies-email";
import {
  TestimonyData,
  TestimonyResponse,
  TESTIMONY_CATEGORIES,
  TestimonyCategory,
} from "@/types/testimonies";

// Email configuration from environment variables
const CHURCH_EMAIL = process.env.CHURCH_EMAIL || "omeirepraise99@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

/**
 * Validates the testimony data
 * Returns an array of error messages (empty if valid)
 */
function validateTestimony(data: Partial<TestimonyData>): string[] {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.push("Name is required");
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address");
    }
  }

  // Phone validation
  if (!data.phone || data.phone.trim().length === 0) {
    errors.push("Phone number is required");
  }

  // Category validation
  if (!data.category || !TESTIMONY_CATEGORIES.includes(data.category as TestimonyCategory)) {
    errors.push("Please select a testimony category");
  }

  // Testimony validation
  if (!data.testimony || data.testimony.trim().length === 0) {
    errors.push("Testimony is required");
  } else if (data.testimony.trim().length < 20) {
    errors.push("Please provide more details about your testimony (at least 20 characters)");
  }

  return errors;
}

export async function POST(request: NextRequest): Promise<NextResponse<TestimonyResponse>> {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const validationErrors = validateTestimony(body);

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
    const testimonyData: TestimonyData = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      category: body.category as TestimonyCategory,
      testimony: body.testimony.trim(),
    };

    // Send email notification
    const emailResult = await sendTestimonyEmail({
      data: testimonyData,
      churchEmail: CHURCH_EMAIL,
      fromEmail: FROM_EMAIL,
    });

    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't submit your testimony. Please try again.",
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
          "Thank you for sharing your testimony! Your story of God's faithfulness will be an encouragement to others.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Testimony API error:", error);

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
