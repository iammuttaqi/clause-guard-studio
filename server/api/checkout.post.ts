import { defineEventHandler, readBody } from 'h3';
import { getStripeClient, isSandboxMode } from '~/server/utils/stripe';
import { getPrismaClient } from '~/server/utils/prisma';
import { getCustomerSession } from '~/server/utils/customer';
import type { CheckoutRequest, CheckoutResponse } from '~/types';

export default defineEventHandler(async (event): Promise<CheckoutResponse> => {
  const body: CheckoutRequest = await readBody(event);
  const planType = body?.planType || 'monthly';
  const customer = await getCustomerSession(event);
  const prisma = getPrismaClient();

  const isSandbox = isSandboxMode() || body?.forceSandbox === true;

  if (isSandbox) {
    // Interactive Zero-Credential Sandbox Upgrade
    const upgradedTier = planType === 'lifetime' ? 'LIFETIME' : 'PRO';

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        tier: upgradedTier,
        quotaLimit: 999999
      }
    });

    const timestamp = Date.now();
    return {
      mode: 'sandbox',
      sessionId: `sandbox_sess_${timestamp}`,
      checkoutUrl: `/?sandbox_success=true&plan=${planType}&sess=${timestamp}`,
      message: `Interactive Sandbox Mode: Account upgraded to ${upgradedTier} with unlimited scans and full counter-clause generation.`
    };
  }

  // Live Stripe Checkout Session Generation
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error('Stripe client initialization failed.');
  }

  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const priceId = planType === 'lifetime'
    ? (process.env.STRIPE_PRICE_LIFETIME || 'price_lifetime_79')
    : (process.env.STRIPE_PRICE_MONTHLY || 'price_monthly_29');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: customer.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: planType === 'lifetime' ? 'payment' : 'subscription',
    success_url: `${body.returnUrl || appUrl}/?session_id={CHECKOUT_SESSION_ID}&status=success`,
    cancel_url: `${body.returnUrl || appUrl}/?cancelled=true`,
    metadata: {
      planType,
      customerId: customer.id,
      email: customer.email
    }
  });

  return {
    mode: 'live',
    sessionId: session.id,
    checkoutUrl: session.url || ''
  };
});
