/**
 * PrayerRequestHero Component
 *
 * A hero section for the Prayer Request page featuring:
 * - Prayer-themed background image (partial height, not full screen)
 * - Dark overlay for text readability
 * - Welcoming heading and subtext
 * - Framer Motion animations
 *
 * The hero creates a gentle, reverent atmosphere appropriate
 * for a prayer request page.
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function PrayerRequestHero() {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/prayer-hero.jpg"
        alt="Hands folded in prayer"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle warm tint for gentle atmosphere */}
      <div className="absolute inset-0 bg-secondary/10" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 uppercase tracking-wide"
          >
            Prayer Request
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            We believe in the power of prayer. Share your prayer request with us,
            and our prayer team will lift you up before the Lord.
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
