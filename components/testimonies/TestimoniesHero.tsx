/**
 * TestimoniesHero Component
 *
 * A hero section for the Testimonies page featuring:
 * - Love/sharing-themed background image (partial height, not full screen)
 * - Dark overlay for text readability
 * - Welcoming heading and subtext
 * - Framer Motion animations
 *
 * The hero creates a warm, inviting atmosphere for sharing testimonies.
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function TestimoniesHero() {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/testimonies-hero.jpg"
        alt="Community sharing and fellowship"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle warm tint for inviting atmosphere */}
      <div className="absolute inset-0 bg-primary/10" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 uppercase tracking-wide"
          >
            Share Your Testimony
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Your story of God&apos;s faithfulness can inspire and encourage others.
            Share how God has worked in your life and be a blessing to someone today.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-6 mx-auto w-24 h-1 bg-primary rounded-full"
          />
        </div>
      </Container>
    </section>
  );
}
