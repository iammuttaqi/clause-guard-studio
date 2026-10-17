import { ref, computed } from 'vue';
import type { CustomerTierResponse, CustomerTier } from '~/types';

// Persistent reactive state shared across components
const tier = ref<CustomerTier>('FREE');
const usageCount = ref<number>(1);
const quotaLimit = ref<number>(3);
const isSandbox = ref<boolean>(false);
const isUpgradeModalOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const bannerMessage = ref<string | null>(null);

export function useBilling() {
  const isPro = computed(() => tier.value === 'PRO' || tier.value === 'LIFETIME');
  const remainingScans = computed(() => isPro.value ? 999999 : Math.max(0, quotaLimit.value - usageCount.value));
  const isQuotaExhausted = computed(() => !isPro.value && remainingScans.value <= 0);

  async function fetchTier() {
    try {
      const data = await $fetch<CustomerTierResponse>('/api/me/tier');
      tier.value = data.tier;
      usageCount.value = data.usageCount;
      quotaLimit.value = data.quotaLimit;
      isSandbox.value = data.isSandbox;
    } catch {
      // Keep sensible default for offline / fallback
    }
  }

  async function initiateCheckout(planType: 'monthly' | 'lifetime') {
    isLoading.value = true;
    try {
      const response = await $fetch<{ mode: string; checkoutUrl: string; sessionId?: string; message?: string }>('/api/checkout', {
        method: 'POST',
        body: { planType }
      });

      if (response.mode === 'sandbox') {
        tier.value = planType === 'lifetime' ? 'LIFETIME' : 'PRO';
        quotaLimit.value = 999999;
        isUpgradeModalOpen.value = false;
        bannerMessage.value = response.message || `Simulated Pro Plan activated successfully.`;
      } else if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (err: any) {
      console.error('Checkout failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function toggleSandboxTier() {
    if (tier.value === 'FREE') {
      tier.value = 'PRO';
      quotaLimit.value = 999999;
      bannerMessage.value = 'Sandbox Mode: Pro features activated with unlimited contract audits.';
    } else {
      tier.value = 'FREE';
      quotaLimit.value = 3;
      usageCount.value = 2; // Simulate realistic free tier state
      bannerMessage.value = 'Sandbox Mode: Reverted to Free Starter plan (2 of 3 audits used).';
    }
  }

  function openUpgradeModal() {
    isUpgradeModalOpen.value = true;
  }

  function closeUpgradeModal() {
    isUpgradeModalOpen.value = false;
  }

  return {
    tier,
    usageCount,
    quotaLimit,
    isSandbox,
    isPro,
    remainingScans,
    isQuotaExhausted,
    isUpgradeModalOpen,
    isLoading,
    bannerMessage,
    fetchTier,
    initiateCheckout,
    toggleSandboxTier,
    openUpgradeModal,
    closeUpgradeModal
  };
}
