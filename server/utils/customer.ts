import type { H3Event } from 'h3';
import { getHeader, getCookie, setCookie } from 'h3';
import { getPrismaClient } from './prisma';

export async function getCustomerSession(event: H3Event) {
  const prisma = getPrismaClient();

  const emailHeader = getHeader(event, 'x-customer-email');
  const emailCookie = getCookie(event, 'clauseguard_customer_email');
  const targetEmail = (emailHeader || emailCookie || 'evaluator@clauseguard.local').toLowerCase().trim();

  // If no cookie set, set one for continuous evaluation session
  if (!emailCookie) {
    setCookie(event, 'clauseguard_customer_email', targetEmail, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax'
    });
  }

  let customer = await prisma.customer.findUnique({
    where: { email: targetEmail }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        email: targetEmail,
        tier: 'FREE',
        usageCount: 0,
        quotaLimit: 3
      }
    });
  }

  return customer;
}
