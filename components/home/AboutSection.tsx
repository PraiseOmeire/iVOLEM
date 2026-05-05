"use client";

import { Container } from "@/components/ui/Container";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

export function AboutSection() {
  return (
    <>
      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollAnimation direction="left">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
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
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
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
            </ScrollAnimation>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>
          </ScrollAnimation>
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
            ].map((value, index) => (
              <ScrollAnimation key={value.title} delay={index * 0.1}>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Join Our Family CTA Section */}
      <section id="join-our-family" className="py-20 bg-primary">
        <Container>
          <ScrollAnimation>
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Family
              </h2>
              <p className="text-xl text-red-100 max-w-2xl mx-auto">
                We&apos;d love to meet you! Come visit us this Sunday and
                experience the warmth of our community.
              </p>
            </div>
          </ScrollAnimation>

          {/* Location Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation direction="left">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
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
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Gasline
                    </h3>
                    <p className="text-gray-600">
                      Gasline address, Magboro, Ogun State
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center flex-shrink-0">
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
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Makogi
                    </h3>
                    <p className="text-gray-600">
                      Makogi address, Makogi, Ogun State
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </Container>
      </section>
    </>
  );
}
