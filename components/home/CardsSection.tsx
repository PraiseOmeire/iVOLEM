"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

function PrayerIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function TestimonyIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

function HandbookIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

const cards = [
  {
    icon: <PrayerIcon />,
    title: "Send in Your Prayer",
    description:
      "Submit your prayer requests and our community will lift you up in prayer. You are never alone in your journey.",
    buttonText: "Submit Prayer",
    href: "/prayer-request",
    disabled: false,
  },
  {
    icon: <TestimonyIcon />,
    title: "Share Your Testimony",
    description:
      "Share how God has worked in your life to encourage others and glorify His name. Your story matters.",
    buttonText: "Share Now",
    href: "/testimonies",
    disabled: false,
  },
  {
    icon: <HandbookIcon />,
    title: "First Timers Handbook",
    description:
      "New to Full Life Assembly? Download our welcome guide to learn more about our community and what to expect.",
    buttonText: "Download",
    href: undefined,
    disabled: true,
  },
];

export function CardsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Involved
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              There are many ways to connect and grow with our church family.
              Start your journey today.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <ScrollAnimation key={card.title} delay={index * 0.1}>
              <Card
                icon={card.icon}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                href={card.href}
                disabled={card.disabled}
              />
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </section>
  );
}
