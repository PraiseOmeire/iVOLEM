/**
 * AnnualProgramsSection Component
 *
 * A homepage section displaying the church's annual programs
 * in a vertically stacked layout with background images.
 *
 * Programs:
 * 1. Annual Convention (more prominent)
 * 2. Teens of Purpose Conference
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

interface ProgramData {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  image: string;
  imageAlt: string;
  height: string;
  href?: string;
}

const programs: ProgramData[] = [
  {
    title: "Annual Convention",
    description:
      "Join us for our flagship annual gathering where believers come together for powerful worship, life-changing teachings, and divine encounters. Experience the move of God like never before.",
    buttonText: "Learn More",
    buttonVariant: "primary",
    image: "/images/annual-convention.jpg",
    imageAlt: "Annual Convention gathering",
    height: "h-[50vh] min-h-[400px]",
  },
  {
    title: "Teens of Purpose Conference",
    description:
      "Empowering the next generation to discover their God-given purpose. A dynamic conference designed for teenagers featuring inspiring speakers, worship, and life-building sessions.",
    buttonText: "Learn More",
    buttonVariant: "secondary",
    image: "/images/teens-conference.jpg",
    imageAlt: "Teens of Purpose Conference",
    height: "h-[40vh] min-h-[350px]",
    href: "/teens-of-purpose",
  },
];

function ProgramBlock({ program }: { program: ProgramData }) {
  const buttonClasses =
    program.buttonVariant === "primary"
      ? "bg-primary text-white hover:bg-primary-dark"
      : "bg-secondary text-white hover:bg-secondary-dark";

  return (
    <div
      className={`relative ${program.height} overflow-hidden rounded-xl shadow-lg`}
    >
      {/* Background Image */}
      <Image
        src={program.image}
        alt={program.imageAlt}
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-2xl">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 uppercase tracking-wide">
            {program.title}
          </h3>
          <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
            {program.description}
          </p>
          {program.href ? (
            <Link
              href={program.href}
              className={`${buttonClasses} px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-block`}
            >
              {program.buttonText}
            </Link>
          ) : (
            <button
              className={`${buttonClasses} px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 cursor-pointer`}
            >
              {program.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AnnualProgramsSection() {
  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Annual Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for our signature events that bring our community together
              and transform lives through the power of God.
            </p>
          </div>
        </ScrollAnimation>

        {/* Program Blocks */}
        <div className="space-y-8">
          {programs.map((program, index) => (
            <ScrollAnimation key={program.title} delay={index * 0.1}>
              <ProgramBlock program={program} />
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </section>
  );
}
