/**
 * Prayer Request Page
 *
 * Route: /prayer-request
 *
 * This page allows visitors to submit prayer requests to the church.
 * It features:
 * - A hero section with a prayer-themed background image
 * - A comprehensive form for collecting prayer requests
 * - Email notification to the church upon submission
 *
 * The page is designed to be gentle and respectful, creating
 * a welcoming atmosphere for those seeking prayer.
 */

import type { Metadata } from "next";
import { PrayerRequestHero } from "@/components/prayer-request/PrayerRequestHero";
import { PrayerRequestForm } from "@/components/prayer-request/PrayerRequestForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Prayer Request | Full Life Assembly",
  description:
    "Submit a prayer request to Full Life Assembly. Our prayer team is here to lift you up in prayer. All requests are kept confidential.",
  openGraph: {
    title: "Prayer Request | Full Life Assembly",
    description:
      "Submit a prayer request to Full Life Assembly. Our prayer team is here to lift you up in prayer.",
    type: "website",
  },
};

export default function PrayerRequestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Partial height with prayer image */}
      <PrayerRequestHero />

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <Container>
          {/* Scripture Quote */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <blockquote className="text-gray-600 italic text-lg leading-relaxed">
              &ldquo;Do not be anxious about anything, but in every situation,
              by prayer and petition, with thanksgiving, present your requests
              to God.&rdquo;
            </blockquote>
            <cite className="block mt-2 text-gray-500 font-medium not-italic">
              — Philippians 4:6
            </cite>
          </div>

          {/* Prayer Request Form */}
          <PrayerRequestForm />

          {/* Additional Information */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need Immediate Prayer?
            </h3>
            <p className="text-gray-600 mb-4">
              If you need immediate prayer support, please contact our church
              office or visit us during service times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center gap-2 text-secondary hover:text-secondary-dark transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Us
              </a>
              <a
                href="mailto:omeirepraise99@gmail.com"
                className="inline-flex items-center justify-center gap-2 text-secondary hover:text-secondary-dark transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
