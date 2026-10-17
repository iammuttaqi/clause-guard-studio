<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import UpgradeModal from '~/components/billing/UpgradeModal.vue';
import { useBilling } from '~/composables/useBilling';

const {
  tier,
  usageCount,
  quotaLimit,
  isPro,
  isSandbox,
  isUpgradeModalOpen,
  isLoading,
  initiateCheckout,
  toggleSandboxTier,
  openUpgradeModal
} = useBilling();

const activeSection = ref<'auditor' | 'overrun' | 'pricing'>('auditor');

function handleNavigate(sec: 'auditor' | 'overrun' | 'pricing') {
  activeSection.value = sec;
  // Scroll smoothly to top
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<template>
  <div class="min-h-screen bg-parchment-50 flex flex-col font-sans text-ink-primary selection:bg-maritime-100 selection:text-maritime-800">
    <!-- Top Navigation Header -->
    <AppHeader
      :tier="tier"
      :usage-count="usageCount"
      :quota-limit="quotaLimit"
      :is-pro="isPro"
      :active-section="activeSection"
      @navigate="handleNavigate"
      @open-upgrade="openUpgradeModal"
      @toggle-sandbox="toggleSandboxTier"
    />

    <!-- Main Application Canvas -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <NuxtPage />
    </main>

    <!-- Global Footer -->
    <AppFooter />

    <!-- Global Upgrade Modal -->
    <UpgradeModal
      :open="isUpgradeModalOpen"
      @update:open="(val) => isUpgradeModalOpen = val"
      :tier="tier"
      :usage-count="usageCount"
      :quota-limit="quotaLimit"
      :is-sandbox="isSandbox"
      :is-loading="isLoading"
      @checkout="initiateCheckout"
      @simulate-pro="toggleSandboxTier"
    />
  </div>
</template>
