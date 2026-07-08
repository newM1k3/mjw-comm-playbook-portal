/**
 * Stripe frontend client initialisation.
 *
 * Requires the environment variable:
 *   VITE_STRIPE_PUBLISHABLE_KEY – Stripe publishable key (pk_live_... or pk_test_...)
 *
 * Add this to your .env.local and to the Netlify environment variables dashboard.
 */
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);
