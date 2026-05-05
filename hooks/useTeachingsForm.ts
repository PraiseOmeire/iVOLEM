/**
 * Teachings Form Hook
 *
 * This custom hook manages the state and logic for teachings subscription forms.
 * It uses useReducer for predictable state management and handles:
 * - Email input tracking
 * - Form submission with loading states
 * - Success/error message display
 * - Client-side validation
 */

'use client';

import { useReducer, useCallback, FormEvent } from 'react';
import { isValidEmail } from '@/lib/validation';
import type { TeachingsFormState, TeachingsFormAction } from '@/types/teachings';

/**
 * Initial state for the form
 */
const initialState: TeachingsFormState = {
  email: '',
  status: 'idle',
  message: '',
};

/**
 * Reducer function to handle form state transitions
 *
 * State transitions:
 * - SET_EMAIL: Updates email field (resets to idle if was in error state)
 * - SUBMIT_START: Sets loading state
 * - SUBMIT_SUCCESS: Sets success state with message
 * - SUBMIT_ERROR: Sets error state with message
 * - RESET: Returns to initial state
 */
function formReducer(state: TeachingsFormState, action: TeachingsFormAction): TeachingsFormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
        // Clear error state when user starts typing again
        status: state.status === 'error' ? 'idle' : state.status,
        message: state.status === 'error' ? '' : state.message,
      };

    case 'SUBMIT_START':
      return {
        ...state,
        status: 'loading',
        message: '',
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        status: 'success',
        message: action.payload,
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        status: 'error',
        message: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

/**
 * Return type for the useTeachingsForm hook
 */
interface UseTeachingsFormReturn {
  /** Current email value */
  email: string;
  /** Whether form is currently submitting */
  isLoading: boolean;
  /** Whether submission was successful */
  isSuccess: boolean;
  /** Whether there was an error */
  isError: boolean;
  /** Success or error message to display */
  message: string;
  /** Update the email value */
  setEmail: (email: string) => void;
  /** Handle form submission */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  /** Reset form to initial state */
  reset: () => void;
}

/**
 * Custom hook for managing teachings subscription form
 *
 * @returns Object with form state and handlers
 *
 * @example
 * function TeachingsForm() {
 *   const {
 *     email,
 *     isLoading,
 *     isSuccess,
 *     isError,
 *     message,
 *     setEmail,
 *     handleSubmit,
 *   } = useTeachingsForm();
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         type="email"
 *         value={email}
 *         onChange={(e) => setEmail(e.target.value)}
 *         disabled={isLoading || isSuccess}
 *       />
 *       <button type="submit" disabled={isLoading || isSuccess}>
 *         {isLoading ? 'Subscribing...' : isSuccess ? 'Subscribed!' : 'Subscribe'}
 *       </button>
 *       {message && (
 *         <p className={isError ? 'text-red-500' : 'text-green-500'}>
 *           {message}
 *         </p>
 *       )}
 *     </form>
 *   );
 * }
 */
export function useTeachingsForm(): UseTeachingsFormReturn {
  const [state, dispatch] = useReducer(formReducer, initialState);

  /**
   * Update email value in state
   */
  const setEmail = useCallback((email: string) => {
    dispatch({ type: 'SET_EMAIL', payload: email });
  }, []);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  /**
   * Handle form submission
   *
   * Steps:
   * 1. Prevent default form behavior
   * 2. Validate email client-side
   * 3. Set loading state
   * 4. Make API request
   * 5. Handle success or error response
   */
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Step 1: Check if email is empty
    if (!state.email.trim()) {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: 'Please enter your email address',
      });
      return;
    }

    // Step 2: Validate email format client-side
    if (!isValidEmail(state.email)) {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: 'Please enter a valid email address',
      });
      return;
    }

    // Step 3: Set loading state
    dispatch({ type: 'SUBMIT_START' });

    try {
      // Step 4: Make API request
      const response = await fetch('/api/teachings/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email }),
      });

      // Parse the response
      const data = await response.json();

      // Step 5: Handle response
      if (response.ok && data.success) {
        dispatch({
          type: 'SUBMIT_SUCCESS',
          payload: data.message || 'Thank you for subscribing!',
        });
      } else {
        dispatch({
          type: 'SUBMIT_ERROR',
          payload: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error('Teachings subscription error:', error);
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: 'Unable to connect. Please check your internet and try again.',
      });
    }
  }, [state.email]);

  // Return state and handlers
  return {
    email: state.email,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    message: state.message,
    setEmail,
    handleSubmit,
    reset,
  };
}
