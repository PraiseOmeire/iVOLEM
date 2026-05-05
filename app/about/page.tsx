import { Container } from "@/components/ui/Container";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Full Life Assembly",
  description:
    "Learn about Full Life Assembly - our mission, vision, values, and the community that makes our church special.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary-dark py-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover who we are and what drives our passion for faith,
              community, and service.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Full Life Assembly was founded with a simple yet profound mission:
              to create a place where people from all walks of life can
              experience the fullness of God&apos;s love. What started as a
              small gathering has grown into a vibrant community united by faith
              and purpose.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we continue to build on that foundation, welcoming everyone
              who seeks spiritual growth, genuine connection, and a place to
              call home. Our doors are always open, and our hearts are ready to
              embrace you.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To share the love of Christ with our community and beyond,
                helping people discover their purpose, grow in faith, and make a
                positive impact in the world around them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be a beacon of hope and transformation in our community,
                where every individual experiences the full life that God
                intends for them through worship, fellowship, and service.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Faith",
                description:
                  "We believe in the transformative power of faith and trust in God's plan.",
              },
              {
                title: "Community",
                description:
                  "We are stronger together, supporting and uplifting one another.",
              },
              {
                title: "Service",
                description:
                  "We are called to serve others with love, compassion, and humility.",
              },
              {
                title: "Growth",
                description:
                  "We pursue continuous spiritual growth and personal development.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Family
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              We&apos;d love to meet you! Come visit us this Sunday and
              experience the warmth of our community.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Plan Your Visit
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
