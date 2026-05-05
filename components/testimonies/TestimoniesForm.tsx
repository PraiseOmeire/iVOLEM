/**
 * TestimoniesForm Component
 *
 * A form for submitting testimonies with:
 * - All required fields (name, email, phone, category, testimony)
 * - Real-time validation feedback
 * - Loading, success, and error states
 * - Gentle, respectful UI design
 * - Framer Motion animations
 */

"use client";

import { motion } from "framer-motion";
import { useTestimoniesForm } from "@/hooks/useTestimoniesForm";
import { TESTIMONY_CATEGORIES } from "@/types/testimonies";

export function TestimoniesForm() {
  const {
    formData,
    message,
    isLoading,
    isSuccess,
    isError,
    setField,
    handleSubmit,
    reset,
  } = useTestimoniesForm();

  // Success state - show confirmation message
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
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
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Thank You for Sharing!
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        <p className="text-gray-500 text-sm mb-8">
          &ldquo;Let the redeemed of the Lord tell their story.&rdquo;
          <br />
          <span className="font-medium">— Psalm 107:2</span>
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 bg-secondary text-white hover:bg-secondary-dark"
        >
          Share Another Testimony
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10"
    >
      {/* Form Introduction */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Share Your Testimony
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Your story can be an encouragement to others. Please fill out the form
          below to share how God has worked in your life.
        </p>
      </div>

      {/* Error Message */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-700 text-sm">{message}</p>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* ========== CONTACT INFORMATION SECTION ========== */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setField("email", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </div>

        {/* ========== TESTIMONY SECTION ========== */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Testimony
          </h3>

          <div className="space-y-4">
            {/* Testimony Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Testimony Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
              >
                <option value="">Select a category</option>
                {TESTIMONY_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Testimony Message */}
            <div>
              <label
                htmlFor="testimony"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Testimony <span className="text-red-500">*</span>
              </label>
              <textarea
                id="testimony"
                value={formData.testimony}
                onChange={(e) => setField("testimony", e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors resize-y"
                placeholder="Share your testimony here. Tell us how God has worked in your life..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Please provide as much detail as you are comfortable sharing.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-4 bg-primary text-white font-semibold text-lg rounded-lg hover:bg-primary-dark focus:ring-4 focus:ring-primary/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Testimony"
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-gray-500">
          Your testimony may be shared with the congregation (with your
          permission) to encourage others.
        </p>
      </div>
    </motion.form>
  );
}
