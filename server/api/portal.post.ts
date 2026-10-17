import { defineEventHandler } from 'h3';
import { getStripeClient, isSandboxMode } from '~/server/utils/stripe';
import { getCustomerSession } from '~/server/utils/customer';
import type { PortalResponse } from '~/types';

export default defineEventHandler(async (event): Promise<PortalResponse> => {
  const customer = await getCustomerSession(event);
  const stripe = getStripeClient();
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  if (isSandboxMode() || !stripe || !customer.stripeCustomerId) {
    // In sandbox mode, return clean callback
    return {
      portalUrl: `${appUrl}/?sandbox_portal=active&customer=${encodeURIComponent(customer.email)}`
    };
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.stripeCustomerId,
    return_url: appUrl
  });

  return {
    portalUrl: session.url
  };
});
