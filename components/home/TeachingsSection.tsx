"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useTeachingsForm } from "@/hooks/useTeachingsForm";

export function TeachingsSection() {
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
    <section className="py-20 bg-gradient-to-r from-secondary to-secondary-dark">
      <Container>
        <ScrollAnimation>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Subscribe to our newsletter and never miss an update. Get the latest
              news, events, and inspirational content delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                className="flex-1 max-w-md px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <Button
                variant="primary"
                type="submit"
                className="whitespace-nowrap"
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
                  "Subscribe"
                )}
              </Button>
            </form>

            {/* Status message - adapted colors for dark background */}
            {message && (
              <p
                className={`text-sm mt-4 ${
                  isError ? "text-red-300" : "text-green-300"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
