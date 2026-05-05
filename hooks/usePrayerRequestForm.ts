/**
 * usePrayerRequestForm Hook
 *
 * Custom React hook for managing the prayer request form state.
 * Uses useReducer for predictable state management, following
 * the same pattern as useNewsletterForm.
 *
 * Features:
 * - Form field state management
 * - Field-level validation
 * - API submission handling
 * - Loading, success, and error states
 */

"use client";

import { useReducer, useCallback, FormEvent } from "react";
import {
  PrayerRequestFormState,
  PrayerRequestFormAction,
  PrayerRequestResponse,
  AGE_RANGES,
  CONTACT_METHODS,
  AgeRange,
  ContactMethod,
  EmploymentStatus,
} from "@/types/prayer-request";

// Initial form state
const initialState: PrayerRequestFormState = {
  name: "",
  email: "",
  phone: "",
  preferredContact: "",
  ageRange: "",
  isMember: null,
  employmentStatus: "",
  subject: "",
  prayerMessage: "",
  status: "idle",
  message: "",
  errors: {},
};

/**
 * Reducer function for form state management
 */
function formReducer(
  state: PrayerRequestFormState,
  action: PrayerRequestFormAction
): PrayerRequestFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        // Clear field error when user starts typing
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };

    case "SUBMIT_START":
      return {
        ...state,
        status: "loading",
        message: "",
        errors: {},
      };

    case "SUBMIT_SUCCESS":
      return {
        ...initialState,
        status: "success",
        message: action.payload,
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        status: "error",
        message: action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

/**
 * Validates all required form fields
 * Returns true if valid, false otherwise (and sets errors)
 */
function validateForm(
  state: PrayerRequestFormState,
  dispatch: React.Dispatch<PrayerRequestFormAction>
): boolean {
  let isValid = true;

  // Name validation
  if (!state.name.trim()) {
    dispatch({ type: "SET_ERROR", field: "name", error: "Name is required" });
    isValid = false;
  }

  // Phone validation
  if (!state.phone.trim()) {
    dispatch({ type: "SET_ERROR", field: "phone", error: "Phone number is required" });
    isValid = false;
  }

  // Preferred contact validation
  if (!state.preferredContact || !CONTACT_METHODS.includes(state.preferredContact as ContactMethod)) {
    dispatch({
      type: "SET_ERROR",
      field: "preferredContact",
      error: "Please select a contact method",
    });
    isValid = false;
  }

  // Age range validation
  if (!state.ageRange || !AGE_RANGES.includes(state.ageRange as AgeRange)) {
    dispatch({
      type: "SET_ERROR",
      field: "ageRange",
      error: "Please select your age range",
    });
    isValid = false;
  }

  // Member status validation
  if (state.isMember === null) {
    dispatch({
      type: "SET_ERROR",
      field: "isMember",
      error: "Please indicate your membership status",
    });
    isValid = false;
  }

  // Subject validation
  if (!state.subject.trim()) {
    dispatch({ type: "SET_ERROR", field: "subject", error: "Subject is required" });
    isValid = false;
  }

  // Prayer message validation
  if (!state.prayerMessage.trim()) {
    dispatch({
      type: "SET_ERROR",
      field: "prayerMessage",
      error: "Prayer message is required",
    });
    isValid = false;
  }

  return isValid;
}

/**
 * Custom hook for prayer request form
 */
export function usePrayerRequestForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Field setters
  const setField = useCallback(
    (field: keyof PrayerRequestFormState, value: string | boolean | null) => {
      dispatch({ type: "SET_FIELD", field, value });
    },
    []
  );

  // Form submission handler
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate form
      dispatch({ type: "CLEAR_ERRORS" });
      if (!validateForm(state, dispatch)) {
        return;
      }

      // Start submission
      dispatch({ type: "SUBMIT_START" });

      try {
        const response = await fetch("/api/prayer-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: state.name,
            email: state.email || undefined,
            phone: state.phone,
            preferredContact: state.preferredContact,
            ageRange: state.ageRange,
            isMember: state.isMember,
            employmentStatus: state.employmentStatus || undefined,
            subject: state.subject,
            prayerMessage: state.prayerMessage,
          }),
        });

        const data: PrayerRequestResponse = await response.json();

        if (data.success) {
          dispatch({ type: "SUBMIT_SUCCESS", payload: data.message });
        } else {
          dispatch({
            type: "SUBMIT_ERROR",
            payload: data.error || data.message || "Failed to submit prayer request",
          });
        }
      } catch (error) {
        console.error("Prayer request submission error:", error);
        dispatch({
          type: "SUBMIT_ERROR",
          payload: "Something went wrong. Please try again.",
        });
      }
    },
    [state]
  );

  // Reset form
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    // Form state
    ...state,

    // Computed status flags
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",

    // Actions
    setField,
    handleSubmit,
    reset,
  };
}
