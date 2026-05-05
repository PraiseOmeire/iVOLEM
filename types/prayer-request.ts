/**
 * Prayer Request Types
 *
 * TypeScript interfaces for the prayer request feature.
 * These types ensure type safety across the form, API, and email components.
 */

// Options for dropdown/radio fields
export const AGE_RANGES = [
  "Under 18",
  "18-25",
  "26-35",
  "36-45",
  "46-55",
  "56-65",
  "65+",
] as const;

export const CONTACT_METHODS = ["Email", "Phone", "Either"] as const;

export const EMPLOYMENT_STATUSES = [
  "Employed",
  "Unemployed",
  "Student",
  "Retired",
  "Other",
] as const;

// Type aliases from const arrays
export type AgeRange = (typeof AGE_RANGES)[number];
export type ContactMethod = (typeof CONTACT_METHODS)[number];
export type EmploymentStatus = (typeof EMPLOYMENT_STATUSES)[number];

/**
 * Data structure for a prayer request submission
 */
export interface PrayerRequestData {
  name: string;
  email?: string; // Optional
  phone: string;
  preferredContact: ContactMethod;
  ageRange: AgeRange;
  isMember: boolean;
  employmentStatus?: EmploymentStatus; // Optional
  subject: string;
  prayerMessage: string;
}

/**
 * API response structure
 */
export interface PrayerRequestResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Form state for the prayer request form
 */
export interface PrayerRequestFormState {
  // Form field values
  name: string;
  email: string;
  phone: string;
  preferredContact: ContactMethod | "";
  ageRange: AgeRange | "";
  isMember: boolean | null;
  employmentStatus: EmploymentStatus | "";
  subject: string;
  prayerMessage: string;

  // Form status
  status: "idle" | "loading" | "success" | "error";
  message: string;

  // Field-level errors for validation feedback
  errors: {
    name?: string;
    phone?: string;
    preferredContact?: string;
    ageRange?: string;
    isMember?: string;
    subject?: string;
    prayerMessage?: string;
  };
}

/**
 * Actions for the form reducer
 */
export type PrayerRequestFormAction =
  | { type: "SET_FIELD"; field: keyof PrayerRequestFormState; value: string | boolean | null }
  | { type: "SET_ERROR"; field: string; error: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; payload: string }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET" };
