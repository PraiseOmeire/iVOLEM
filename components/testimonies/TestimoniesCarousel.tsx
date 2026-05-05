/**
 * TestimoniesCarousel Component
 *
 * An auto-scrolling horizontal carousel that displays sample testimonies.
 * Uses Framer Motion for smooth infinite scrolling animation.
 *
 * Features:
 * - Infinite auto-scrolling
 * - Pause on hover
 * - Responsive design
 * - Smooth, gentle animation
 */

"use client";

import { motion } from "framer-motion";
import { SAMPLE_TESTIMONIES, type SampleTestimony } from "@/types/testimonies";
import { Container } from "@/components/ui/Container";

/**
 * Individual testimony card component
 */
function TestimonyCard({ testimony }: { testimony: SampleTestimony }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-white rounded-xl shadow-md p-6 mx-3">
      {/* Category badge */}
      <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary-light text-primary mb-3">
        {testimony.category}
      </span>

      {/* Testimony summary */}
      <p className="text-gray-700 mb-4 leading-relaxed italic">
        &ldquo;{testimony.summary}&rdquo;
      </p>

      {/* Name */}
      <p className="text-sm font-semibold text-gray-900">
        — {testimony.name}
      </p>
    </div>
  );
}

export function TestimoniesCarousel() {
  // Duplicate testimonies for seamless infinite scroll
  const duplicatedTestimonies = [...SAMPLE_TESTIMONIES, ...SAMPLE_TESTIMONIES];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Testimonies of God&apos;s Faithfulness
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read how God has transformed lives in our community. These stories
            are a testament to His love and power.
          </p>
        </div>
      </Container>

      {/* Carousel container */}
      <div className="relative group">
        <motion.div
          className="flex"
          animate={{
            x: [0, -50 * SAMPLE_TESTIMONIES.length * 7.2], // Adjust based on card width + margin
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{
            animationPlayState: "running",
          }}
        >
          {duplicatedTestimonies.map((testimony, index) => (
            <TestimonyCard
              key={`${testimony.id}-${index}`}
              testimony={testimony}
            />
          ))}
        </motion.div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Pause hint */}
      <Container>
        <p className="text-center text-sm text-gray-500 mt-6">
          Hover over the testimonies to pause scrolling
        </p>
      </Container>
    </section>
  );
}
