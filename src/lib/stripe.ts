import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of components to avoid recreating the Stripe object
export const getStripe = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  if (!key) {
    throw new Error('Stripe public key is not set in environment variables');
  }
  
  return loadStripe(key);
};