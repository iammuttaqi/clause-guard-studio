import { defineEventHandler, readRawBody, getHeader, createError } from 'h3';
import { getStripeClient, isSandboxMode } from '~/server/utils/stripe';
import { getPrismaClient } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const stripe = getStripeClient();

  if (isSandboxMode() || !stripe) {
    // In sandbox or zero-key mode, acknowledge safely
    return { received: true, mode: 'sandbox' };
  }

  const rawBody = await readRawBody(event);
  const signature = getHeader(event, 'stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!rawBody || !signature || !webhookSecret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing raw payload or Stripe webhook signature'
    });
  }

  let stripeEvent: any;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error('[Stripe Webhook] Signature verification failed:', err.message);
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook signature verification failed: ${err.message}`
    });
  }

  const prisma = getPrismaClient();

  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object;
      const email = session.customer_email || session.metadata?.email;
      const planType = session.metadata?.planType;
      const targetTier = planType === 'lifetime' ? 'LIFETIME' : 'PRO';

      if (email) {
        await prisma.customer.upsert({
          where: { email },
          update: {
            tier: targetTier,
            quotaLimit: 999999,
            stripeCustomerId: session.customer as string || null,
            subscriptionId: session.subscription as string || null
          },
          create: {
            email,
            tier: targetTier,
            quotaLimit: 999999,
            usageCount: 0,
            stripeCustomerId: session.customer as string || null,
            subscriptionId: session.subscription as string || null
          }
        });
        console.info(`[Stripe Webhook] Customer ${email} upgraded to ${targetTier}`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = stripeEvent.data.object;
      const customer = await prisma.customer.findFirst({
        where: { subscriptionId: subscription.id }
      });

      if (customer) {
        await prisma.customer.update({
          where: { id: customer.id },
          data: {
            tier: 'FREE',
            quotaLimit: 3
          }
        });
        console.info(`[Stripe Webhook] Customer ${customer.email} subscription ended; reverted to FREE`);
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = stripeEvent.data.object;
      const customerId = invoice.customer;
      if (customerId) {
        await prisma.customer.updateMany({
          where: { stripeCustomerId: customerId as string },
          data: { usageCount: 0 }
        });
        console.info(`[Stripe Webhook] Monthly scan usage counter reset for customer ${customerId}`);
      }
      break;
    }

    default:
      console.info(`[Stripe Webhook] Unhandled event type: ${stripeEvent.type}`);
  }

  return { received: true };
});
