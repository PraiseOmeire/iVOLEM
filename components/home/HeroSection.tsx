"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import {Container} from "@/components/ui/Container";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Cross and globe representing global mission"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Subtle blue tint overlay */}
      <div className="absolute inset-0 bg-secondary/15" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Animated Heading - Line 1 */}
          <motion.h1
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 leading-tight uppercase tracking-wide"
          >
            <span className="text-white">REACHING THE </span>
            <span className="text-primary">WORLD</span>
          </motion.h1>

          {/* Animated Heading - Line 3 */}
          <motion.h1
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut", delay: 0.2}}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight uppercase tracking-wide"
          >
            <span className="text-white">WITH THE </span>
            <span className="bg-gradient-to-r from-primary via-white to-secondary-light bg-clip-text text-transparent">
              GOSPEL
            </span>
          </motion.h1>

          {/* Animated Buttons */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut", delay: 0.4}}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection("join-our-family")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 cursor-pointer bg-primary text-white hover:bg-primary-dark"
            >
              Join Us This Sunday
            </button>
            <button
              onClick={() => scrollToSection("welcome-section")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 cursor-pointer border-2 border-white text-white hover:bg-white hover:text-secondary"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </Container>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
