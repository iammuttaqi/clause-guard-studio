import Stripe from 'stripe';

let stripeClientInstance: Stripe | null = null;

export function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes('mock') || secretKey.trim() === '') {
    return null;
  }

  if (!stripeClientInstance) {
    stripeClientInstance = new Stripe(secretKey, {
      apiVersion: '2025-01-27.acacia' as any
    });
  }

  return stripeClientInstance;
}

export function isSandboxMode(): boolean {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return !secretKey || secretKey.includes('mock') || secretKey.trim() === '';
}
