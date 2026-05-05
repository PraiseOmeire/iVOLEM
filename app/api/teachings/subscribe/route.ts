/**
 * Newsletter Subscription API Route
 *
 * POST /api/newsletter/subscribe
 *
 * This endpoint handles newsletter subscription requests.
 * When called:
 * 1. Validates the email from the request body
 * 2. Sends a notification email to the church
 * 3. Returns success/error response
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateSubscribeRequest } from '@/lib/validation';
import { sendSubscriptionNotification } from '@/lib/email';
import type { SubscribeResponse } from '@/types/newsletter';

/**
 * POST handler for newsletter subscription
 *
 * Expected request body:
 * {
 *   "email": "user@example.com"
 * }
 *
 * Success response (200):
 * {
 *   "success": true,
 *   "message": "Thank you for subscribing! We'll be in touch soon."
 * }
 *
 * Error responses:
 * - 400: Invalid email format or missing email
 * - 500: Server error (email service failure)
 */
export async function POST(request: NextRequest): Promise<NextResponse<SubscribeResponse>> {
  try {
    // Step 1: Parse the request body
    const body = await request.json();
    const { email } = body;

    // Step 2: Validate the email
    const validation = validateSubscribeRequest(email);

    if (!validation.valid) {
      // Return 400 Bad Request for validation errors
      return NextResponse.json(
        {
          success: false,
          message: validation.error || 'Invalid email address',
        },
        { status: 400 }
      );
    }

    // Step 3: Send notification email to the church
    const emailResult = await sendSubscriptionNotification({
      subscriberEmail: validation.sanitizedEmail!,
    });

    if (!emailResult.success) {
      // Return 500 Internal Server Error for email service failures
      console.error('Email service failed:', emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to process your subscription. Please try again later.',
          error: emailResult.error,
        },
        { status: 500 }
      );
    }

    // Step 4: Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! We\'ll be in touch soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle unexpected errors (e.g., invalid JSON in request body)
    console.error('Subscription error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
