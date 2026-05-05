/**
 * Testimonies Page
 *
 * A page for sharing and viewing testimonies of God's faithfulness.
 * Features:
 * - Hero section with inspiring imagery
 * - Auto-scrolling carousel of sample testimonies
 * - Form for submitting new testimonies
 */

import { Container } from "@/components/ui/Container";
import { TestimoniesHero } from "@/components/testimonies/TestimoniesHero";
import { TestimoniesCarousel } from "@/components/testimonies/TestimoniesCarousel";
import { TestimoniesForm } from "@/components/testimonies/TestimoniesForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Testimony | Full Life Assembly",
  description:
    "Share your testimony of God's faithfulness and read inspiring stories from our community. Your story can encourage others in their faith journey.",
};

export default function TestimoniesPage() {
  return (
    <>
      {/* Hero Section */}
      <TestimoniesHero />

      {/* Testimonies Carousel */}
      <TestimoniesCarousel />

      {/* Testimony Submission Form */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <TestimoniesForm />
        </Container>
      </section>
    </>
  );
}
