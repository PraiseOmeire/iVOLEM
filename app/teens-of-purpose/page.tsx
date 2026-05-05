/**
 * Teens of Purpose Conference Page
 *
 * A presentational page showcasing the Teens of Purpose Conference
 * organized by year with collage-style image layouts.
 */

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

// Conference year data with placeholder images
const conferenceYears = [
  {
    year: "2025",
    images: [
      { rotation: "-rotate-3", position: "left-0 top-0", size: "w-36 h-48 md:w-48 md:h-64", zIndex: "" },
      { rotation: "rotate-2", position: "left-28 md:left-40 top-6", size: "w-40 h-44 md:w-52 md:h-60", zIndex: "z-10" },
      { rotation: "-rotate-1", position: "left-56 md:left-80 top-2", size: "w-36 h-52 md:w-48 md:h-68", zIndex: "" },
    ],
  },
  {
    year: "2024",
    images: [
      { rotation: "rotate-2", position: "left-0 top-4", size: "w-36 h-52 md:w-48 md:h-68", zIndex: "" },
      { rotation: "-rotate-2", position: "left-28 md:left-40 top-0", size: "w-40 h-48 md:w-52 md:h-64", zIndex: "z-10" },
      { rotation: "rotate-1", position: "left-56 md:left-80 top-8", size: "w-36 h-44 md:w-48 md:h-60", zIndex: "" },
    ],
  },
  {
    year: "2023",
    images: [
      { rotation: "-rotate-1", position: "left-0 top-2", size: "w-36 h-44 md:w-48 md:h-60", zIndex: "" },
      { rotation: "rotate-3", position: "left-28 md:left-40 top-0", size: "w-40 h-52 md:w-52 md:h-68", zIndex: "z-10" },
      { rotation: "-rotate-2", position: "left-56 md:left-80 top-6", size: "w-36 h-48 md:w-48 md:h-64", zIndex: "" },
    ],
  },
];

function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/10" />
  );
}

interface YearSectionProps {
  year: string;
  images: Array<{
    rotation: string;
    position: string;
    size: string;
    zIndex: string;
  }>;
  index: number;
}

function YearSection({ year, images, index }: YearSectionProps) {
  return (
    <section className={`py-12 md:py-16 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}>
      <Container>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* LEFT: Year */}
          <ScrollAnimation direction="left" delay={0.1} className="md:col-span-3">
            <div className="text-center md:text-left">
              <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-primary/15 leading-none">
                {year}
              </span>
            </div>
          </ScrollAnimation>

          {/* RIGHT: Image Collage */}
          <ScrollAnimation direction="right" delay={0.2} className="md:col-span-9">
            <div className="relative h-[280px] md:h-[350px] lg:h-[400px]">
              {images.map((img, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className={`absolute ${img.position} ${img.size} ${img.rotation} ${img.zIndex} shadow-lg rounded-xl overflow-hidden border-4 border-white`}
                  whileHover={{ scale: 1.05, zIndex: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImagePlaceholder />
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </section>
  );
}

export default function TeensOfPurposePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/5 to-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-wide"
            >
              Teens of Purpose{" "}
              <span className="text-primary">Conference</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
            >
              Empowering the next generation to discover their God-given purpose.
              Our annual conference brings together teenagers from across the region
              for powerful worship, inspiring teachings, and life-changing encounters
              with God.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mx-auto w-24 h-1 bg-primary rounded-full"
            />
          </div>
        </Container>
      </section>

      {/* Year Sections */}
      {conferenceYears.map((yearData, index) => (
        <YearSection
          key={yearData.year}
          year={yearData.year}
          images={yearData.images}
          index={index}
        />
      ))}

      {/* Bottom CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <Container>
          <ScrollAnimation>
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Us This Year
              </h2>
              <p className="text-lg text-secondary-light max-w-2xl mx-auto mb-8">
                Don&apos;t miss the opportunity to be part of something transformative.
                Register your teen for the next Teens of Purpose Conference.
              </p>
              <button className="bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Get Notified
              </button>
            </div>
          </ScrollAnimation>
        </Container>
      </section>
    </>
  );
}
