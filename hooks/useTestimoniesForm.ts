/**
 * useTestimoniesForm Hook
 *
 * Custom React hook for managing the testimonies form state.
 * Uses useReducer for predictable state management, following
 * the same pattern as usePrayerRequestForm.
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
  TestimoniesFormState,
  TestimoniesFormAction,
  TestimonyResponse,
  TestimonyData,
  TESTIMONY_CATEGORIES,
  TestimonyCategory,
} from "@/types/testimonies";

// Initial form state
const initialState: TestimoniesFormState = {
  formData: {
    name: "",
    email: "",
    phone: "",
    category: "",
    testimony: "",
  },
  status: "idle",
  message: "",
};

/**
 * Reducer function for form state management
 */
function formReducer(
  state: TestimoniesFormState,
  action: TestimoniesFormAction
): TestimoniesFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        // Clear error when user starts typing
        status: state.status === "error" ? "idle" : state.status,
        message: state.status === "error" ? "" : state.message,
      };

    case "SUBMIT_START":
      return {
        ...state,
        status: "loading",
        message: "",
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
 * Returns error message if invalid, null if valid
 */
function validateForm(formData: TestimonyData): string | null {
  // Name validation
  if (!formData.name.trim()) {
    return "Please enter your name";
  }

  // Email validation
  if (!formData.email.trim()) {
    return "Please enter your email address";
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email address";
  }

  // Phone validation
  if (!formData.phone.trim()) {
    return "Please enter your phone number";
  }

  // Category validation
  if (!formData.category || !TESTIMONY_CATEGORIES.includes(formData.category as TestimonyCategory)) {
    return "Please select a testimony category";
  }

  // Testimony validation
  if (!formData.testimony.trim()) {
    return "Please share your testimony";
  }

  if (formData.testimony.trim().length < 20) {
    return "Please provide more details about your testimony (at least 20 characters)";
  }

  return null;
}

/**
 * Custom hook for testimonies form
 */
export function useTestimoniesForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Field setter
  const setField = useCallback(
    (field: keyof TestimonyData, value: string) => {
      dispatch({ type: "SET_FIELD", field, value });
    },
    []
  );

  // Form submission handler
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate form
      const validationError = validateForm(state.formData);
      if (validationError) {
        dispatch({ type: "SUBMIT_ERROR", payload: validationError });
        return;
      }

      // Start submission
      dispatch({ type: "SUBMIT_START" });

      try {
        const response = await fetch("/api/testimonies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.formData),
        });

        const data: TestimonyResponse = await response.json();

        if (data.success) {
          dispatch({ type: "SUBMIT_SUCCESS", payload: data.message });
        } else {
          dispatch({
            type: "SUBMIT_ERROR",
            payload: data.error || data.message || "Failed to submit testimony",
          });
        }
      } catch (error) {
        console.error("Testimony submission error:", error);
        dispatch({
          type: "SUBMIT_ERROR",
          payload: "Something went wrong. Please try again.",
        });
      }
    },
    [state.formData]
  );

  // Reset form
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    // Form data
    formData: state.formData,

    // Status message
    message: state.message,

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
