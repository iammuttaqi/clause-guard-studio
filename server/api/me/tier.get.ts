import { defineEventHandler } from 'h3';
import { getCustomerSession } from '~/server/utils/customer';
import { isSandboxMode } from '~/server/utils/stripe';
import type { CustomerTierResponse } from '~/types';

export default defineEventHandler(async (event): Promise<CustomerTierResponse> => {
  const customer = await getCustomerSession(event);
  const isPro = customer.tier === 'PRO' || customer.tier === 'LIFETIME';
  const remainingScans = isPro ? 999999 : Math.max(0, customer.quotaLimit - customer.usageCount);

  return {
    customerId: customer.id,
    email: customer.email,
    tier: customer.tier as 'FREE' | 'PRO' | 'LIFETIME',
    usageCount: customer.usageCount,
    quotaLimit: customer.quotaLimit,
    remainingScans,
    isSandbox: isSandboxMode(),
    features: {
      unlimitedAudits: isPro,
      counterClauseGenerator: isPro,
      postureSwitching: isPro,
      overrunExport: isPro,
      watermarkFreeExport: isPro
    }
  };
});
