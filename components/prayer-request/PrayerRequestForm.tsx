/**
 * PrayerRequestForm Component
 *
 * A comprehensive prayer request form with:
 * - All required and optional fields
 * - Real-time validation feedback
 * - Loading, success, and error states
 * - Gentle, respectful UI design
 * - Framer Motion animations
 *
 * Form Fields:
 * - Name (required)
 * - Email (optional)
 * - Phone (required)
 * - Preferred Contact Method (required)
 * - Age Range (required)
 * - Member of Full Life Assembly (required)
 * - Employment Status (optional)
 * - Subject (required)
 * - Prayer Message (required)
 */

"use client";

import { motion } from "framer-motion";
import { usePrayerRequestForm } from "@/hooks/usePrayerRequestForm";
import {
  AGE_RANGES,
  CONTACT_METHODS,
  EMPLOYMENT_STATUSES,
} from "@/types/prayer-request";

export function PrayerRequestForm() {
  const {
    name,
    email,
    phone,
    preferredContact,
    ageRange,
    isMember,
    employmentStatus,
    subject,
    prayerMessage,
    errors,
    message,
    isLoading,
    isSuccess,
    isError,
    setField,
    handleSubmit,
    reset,
  } = usePrayerRequestForm();

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
          Prayer Request Submitted
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        <p className="text-gray-500 text-sm mb-8">
          &ldquo;Cast all your anxiety on him because he cares for you.&rdquo;
          <br />
          <span className="font-medium">— 1 Peter 5:7</span>
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 bg-secondary text-white hover:bg-secondary-dark"
        >
          Submit Another Request
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
        <p className="text-gray-600 leading-relaxed">
          Please fill out the form below and our prayer team will pray for your
          request. All information is kept confidential.
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
            Contact Information
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
                value={name}
                onChange={(e) => setField("name", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Field (Optional) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
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
                value={phone}
                onChange={(e) => setField("phone", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Preferred Contact Method */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {CONTACT_METHODS.map((method) => (
                  <label
                    key={method}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method}
                      checked={preferredContact === method}
                      onChange={(e) =>
                        setField("preferredContact", e.target.value)
                      }
                      className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
                    />
                    <span className="ml-2 text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
              {errors.preferredContact && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.preferredContact}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========== PERSONAL INFORMATION SECTION ========== */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Age Range */}
            <div>
              <label
                htmlFor="ageRange"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age Range <span className="text-red-500">*</span>
              </label>
              <select
                id="ageRange"
                value={ageRange}
                onChange={(e) => setField("ageRange", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                  errors.ageRange ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select age range</option>
                {AGE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              {errors.ageRange && (
                <p className="mt-1 text-sm text-red-500">{errors.ageRange}</p>
              )}
            </div>

            {/* Employment Status (Optional) */}
            <div>
              <label
                htmlFor="employmentStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employment Status{" "}
                <span className="text-gray-400">(optional)</span>
              </label>
              <select
                id="employmentStatus"
                value={employmentStatus}
                onChange={(e) => setField("employmentStatus", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
              >
                <option value="">Select status</option>
                {EMPLOYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Member of Full Life Assembly */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you a member of Full Life Assembly?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isMember"
                    checked={isMember === true}
                    onChange={() => setField("isMember", true)}
                    className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isMember"
                    checked={isMember === false}
                    onChange={() => setField("isMember", false)}
                    className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              {errors.isMember && (
                <p className="mt-1 text-sm text-red-500">{errors.isMember}</p>
              )}
            </div>
          </div>
        </div>

        {/* ========== PRAYER REQUEST SECTION ========== */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Prayer Request
          </h3>

          <div className="space-y-4">
            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setField("subject", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Brief description of your prayer request"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Prayer Message */}
            <div>
              <label
                htmlFor="prayerMessage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prayer Request Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prayerMessage"
                value={prayerMessage}
                onChange={(e) => setField("prayerMessage", e.target.value)}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors resize-y ${
                  errors.prayerMessage ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Please share your prayer request in detail. All information is kept confidential."
              />
              {errors.prayerMessage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.prayerMessage}
                </p>
              )}
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
              "Submit Prayer Request"
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-gray-500">
          Your prayer request is confidential and will only be shared with our
          prayer team.
        </p>
      </div>
    </motion.form>
  );
}
