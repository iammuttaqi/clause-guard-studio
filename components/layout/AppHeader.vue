<script setup lang="ts">
import { Shield, Sparkles, Sliders, CreditCard } from 'lucide-vue-next';
import SandboxToggleSwitch from '~/components/billing/SandboxToggleSwitch.vue';
import TierStatusBadge from '~/components/billing/TierStatusBadge.vue';

interface Props {
  tier: string;
  usageCount: number;
  quotaLimit: number;
  isPro: boolean;
  activeSection?: 'auditor' | 'overrun' | 'pricing';
}

withDefaults(defineProps<Props>(), {
  activeSection: 'auditor'
});

const emit = defineEmits<{
  (e: 'navigate', section: 'auditor' | 'overrun' | 'pricing'): void;
  (e: 'open-upgrade'): void;
  (e: 'toggle-sandbox'): void;
}>();
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-parchment-200 bg-white/95 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Logo & Brand Identity -->
      <div class="flex items-center gap-6">
        <a
          href="#"
          @click.prevent="emit('navigate', 'auditor')"
          class="flex items-center gap-2.5 group outline-none"
        >
          <div class="w-8 h-8 rounded-lg bg-ink-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Shield class="w-4 h-4 text-maritime-400" />
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5 leading-none">
              <span class="font-bold text-sm tracking-tight text-ink-primary font-serif-title text-base sm:text-lg">
                ClauseGuard
              </span>
              <span class="text-[10px] font-semibold uppercase tracking-wider text-maritime-700 bg-maritime-50 px-1.5 py-0.5 rounded border border-maritime-200/60">
                Studio
              </span>
            </div>
            <span class="text-[10px] text-ink-muted leading-tight mt-0.5 hidden sm:inline">
              Contract Risk Auditor & Redliner
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Tabs -->
        <nav class="hidden md:flex items-center gap-1 text-xs font-medium text-ink-secondary">
          <button
            type="button"
            @click="emit('navigate', 'auditor')"
            :class="[
              'px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
              activeSection === 'auditor'
                ? 'bg-parchment-100 text-ink-primary font-semibold'
                : 'hover:text-ink-primary hover:bg-parchment-50'
            ]"
          >
            <Sparkles class="w-3.5 h-3.5 text-maritime-600" />
            <span>Risk Auditor</span>
          </button>

          <button
            type="button"
            @click="emit('navigate', 'overrun')"
            :class="[
              'px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
              activeSection === 'overrun'
                ? 'bg-parchment-100 text-ink-primary font-semibold'
                : 'hover:text-ink-primary hover:bg-parchment-50'
            ]"
          >
            <Sliders class="w-3.5 h-3.5 text-ink-secondary" />
            <span>Scope Overrun</span>
          </button>

          <button
            type="button"
            @click="emit('navigate', 'pricing')"
            :class="[
              'px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
              activeSection === 'pricing'
                ? 'bg-parchment-100 text-ink-primary font-semibold'
                : 'hover:text-ink-primary hover:bg-parchment-50'
            ]"
          >
            <CreditCard class="w-3.5 h-3.5 text-ink-secondary" />
            <span>Pricing & Pro</span>
          </button>
        </nav>
      </div>

      <!-- Right Action Controls -->
      <div class="flex items-center gap-3">
        <!-- Sandbox Mode Switch -->
        <SandboxToggleSwitch
          :is-pro="isPro"
          @toggle="emit('toggle-sandbox')"
        />

        <!-- Tier Status Badge -->
        <TierStatusBadge
          :tier="tier"
          :usage-count="usageCount"
          :quota-limit="quotaLimit"
          :is-pro="isPro"
          @click="emit('open-upgrade')"
        />
      </div>
    </div>
  </header>
</template>
