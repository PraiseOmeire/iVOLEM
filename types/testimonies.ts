/**
 * Testimonies Types
 *
 * Type definitions for the testimonies feature including
 * form state, API requests, and sample testimonies for display.
 */

/**
 * Available testimony categories
 */
export const TESTIMONY_CATEGORIES = [
  'Healing',
  'Salvation',
  'Financial Breakthrough',
  'Family Restoration',
  'Career/Education',
  'Deliverance',
  'Answered Prayer',
  'Other',
] as const;

export type TestimonyCategory = (typeof TESTIMONY_CATEGORIES)[number];

/**
 * Data submitted when sharing a testimony
 */
export interface TestimonyData {
  name: string;
  email: string;
  phone: string;
  category: TestimonyCategory | '';
  testimony: string;
}

/**
 * API response from testimony submission
 */
export interface TestimonyResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Form state managed by useTestimoniesForm hook
 */
export interface TestimoniesFormState {
  formData: TestimonyData;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

/**
 * Actions for the form state reducer
 */
export type TestimoniesFormAction =
  | { type: 'SET_FIELD'; field: keyof TestimonyData; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; payload: string }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'RESET' };

/**
 * Sample testimony for carousel display
 */
export interface SampleTestimony {
  id: number;
  name: string;
  summary: string;
  category: TestimonyCategory;
}

/**
 * Sample testimonies for the auto-scrolling carousel
 */
export const SAMPLE_TESTIMONIES: SampleTestimony[] = [
  {
    id: 1,
    name: 'Sarah',
    summary: 'God healed me from a chronic illness that doctors said was incurable.',
    category: 'Healing',
  },
  {
    id: 2,
    name: 'Michael',
    summary: 'After years of searching, I finally found peace and purpose in Christ.',
    category: 'Salvation',
  },
  {
    id: 3,
    name: 'Grace',
    summary: 'God provided when we lost everything. He is truly faithful.',
    category: 'Financial Breakthrough',
  },
  {
    id: 4,
    name: 'David',
    summary: 'Our marriage was restored after years of separation. God is good!',
    category: 'Family Restoration',
  },
  {
    id: 5,
    name: 'Ruth',
    summary: 'I got my dream job after praying and trusting God for direction.',
    category: 'Career/Education',
  },
  {
    id: 6,
    name: 'Emmanuel',
    summary: 'God set me free from addiction. I am a new creation in Christ.',
    category: 'Deliverance',
  },
  {
    id: 7,
    name: 'Joy',
    summary: 'After 10 years of waiting, God blessed us with a child.',
    category: 'Answered Prayer',
  },
  {
    id: 8,
    name: 'Peter',
    summary: 'God protected my family during a terrible accident. We are grateful.',
    category: 'Other',
  },
];
