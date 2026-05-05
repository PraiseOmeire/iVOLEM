/**
 * Teachings Subscription Types
 *
 * These types define the shape of data used throughout the teachings
 * subscription feature - from API requests to form state management.
 */

/**
 * The data sent to the API when subscribing
 */
export interface SubscribeRequest {
  email: string;
}

/**
 * The response returned from the subscription API
 */
export interface SubscribeResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Form state managed by the useTeachingsForm hook
 * - idle: Initial state, waiting for user input
 * - loading: Form submitted, waiting for API response
 * - success: Subscription successful
 * - error: Subscription failed
 */
export interface TeachingsFormState {
  email: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

/**
 * Actions for the form state reducer
 */
export type TeachingsFormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; payload: string }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'RESET' };
