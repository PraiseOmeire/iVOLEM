"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTeachingsForm } from "@/hooks/useTeachingsForm";

export function TeachingsHero() {
  // Use the custom hook for form state management
  const {
    email,
    isLoading,
    isSuccess,
    isError,
    message,
    setEmail,
    handleSubmit,
  } = useTeachingsForm();

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Have You Heard From{" "}
              <span className="text-primary">Jesus</span>{" "}
              <span className="text-secondary">Today?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Stay connected with God&apos;s word and our community. Subscribe to our
              newsletter for weekly devotionals, inspirational messages, and
              updates on church events that will strengthen your faith journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              {/* Status message */}
              {message && (
                <p
                  className={`text-sm ${
                    isError ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  type="submit"
                  className="flex-1 py-4 text-lg"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Subscribed!
                    </span>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
                <Link href="/teachings" className="flex-1">
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 cursor-pointer border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Explore Teachings
                  </button>
                </Link>
              </div>
            </form>

            <p className="text-sm text-gray-500">
              Join over 1,000+ believers receiving weekly inspiration. Unsubscribe anytime.
            </p>
          </motion.div>

          {/* Image/Illustration Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative">
              {/* Decorative background shapes */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-light rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary-light rounded-full opacity-40 blur-3xl"></div>

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-secondary via-secondary-dark to-gray-900 rounded-2xl p-8 shadow-2xl">
                {/* Bible/Cross Illustration */}
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-auto"
                  fill="none"
                >
                  {/* Open Bible */}
                  <ellipse cx="150" cy="240" rx="120" ry="30" fill="white" opacity="0.1" />
                  <path
                    d="M50 120 Q50 100 70 100 L140 100 Q150 100 150 110 L150 220 Q150 230 140 230 L70 230 Q50 230 50 210 Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M250 120 Q250 100 230 100 L160 100 Q150 100 150 110 L150 220 Q150 230 160 230 L230 230 Q250 230 250 210 Z"
                    fill="white"
                    opacity="0.85"
                  />
                  {/* Bible spine */}
                  <rect x="145" y="100" width="10" height="130" fill="white" opacity="0.7" />

                  {/* Text lines on left page */}
                  <line x1="65" y1="130" x2="135" y2="130" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="65" y1="145" x2="130" y2="145" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="65" y1="160" x2="135" y2="160" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="65" y1="175" x2="125" y2="175" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="65" y1="190" x2="135" y2="190" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />

                  {/* Text lines on right page */}
                  <line x1="165" y1="130" x2="235" y2="130" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="165" y1="145" x2="230" y2="145" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="165" y1="160" x2="235" y2="160" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="165" y1="175" x2="225" y2="175" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />
                  <line x1="165" y1="190" x2="235" y2="190" stroke="#1E40AF" strokeWidth="2" opacity="0.4" />

                  {/* Cross above bible */}
                  <rect x="140" y="30" width="20" height="60" fill="#DC2626" rx="2" />
                  <rect x="120" y="45" width="60" height="15" fill="#DC2626" rx="2" />

                  {/* Light rays */}
                  <path d="M150 25 L155 5 L150 15 L145 5 Z" fill="white" opacity="0.6" />
                  <path d="M180 45 L200 35 L190 45 L200 55 Z" fill="white" opacity="0.4" />
                  <path d="M120 45 L100 35 L110 45 L100 55 Z" fill="white" opacity="0.4" />

                  {/* Dove silhouette */}
                  <path
                    d="M220 70 Q240 60 260 75 Q250 70 245 80 Q260 85 255 100 Q245 90 235 95 Q230 85 220 85 Q225 75 220 70"
                    fill="white"
                    opacity="0.7"
                  />
                </svg>

                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-primary-light rounded-full opacity-80 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute top-1/2 right-4 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
