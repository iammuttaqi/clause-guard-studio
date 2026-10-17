export type CustomerTier = 'FREE' | 'PRO' | 'LIFETIME';

export interface CustomerTierResponse {
  customerId: string;
  email: string;
  tier: CustomerTier;
  usageCount: number;
  quotaLimit: number;
  remainingScans: number;
  isSandbox: boolean;
  features: {
    unlimitedAudits: boolean;
    counterClauseGenerator: boolean;
    postureSwitching: boolean;
    overrunExport: boolean;
    watermarkFreeExport: boolean;
  };
}

export interface CheckoutRequest {
  planType: 'monthly' | 'lifetime';
  customerEmail?: string;
  returnUrl?: string;
  forceSandbox?: boolean;
}

export interface CheckoutResponse {
  mode: 'live' | 'sandbox';
  sessionId: string;
  checkoutUrl: string;
  message?: string;
}

export interface PortalResponse {
  portalUrl: string;
}
