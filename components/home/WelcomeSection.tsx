"use client";

import { Container } from "@/components/ui/Container";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

export function WelcomeSection() {
  return (
    <section id="welcome-section" className="py-20 bg-white">
      <Container>
        <ScrollAnimation>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base tracking-[0.3em] uppercase text-gray-500 mb-4">
              WELCOME TO{" "}
              <span className="text-primary font-semibold">Full Life Assembly</span>
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
              WELCOME{" "}
              <span className="text-primary">HOME!</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 italic">
              Your journey of faith begins here.
            </p>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
