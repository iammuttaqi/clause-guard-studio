<script setup lang="ts">
import { computed } from 'vue';
import {
  ShieldCheck,
  Check,
  Zap,
  Sparkles,
  Sliders,
  Download,
  CreditCard,
  Lock,
  ArrowRight,
  FlaskConical
} from 'lucide-vue-next';
import Dialog from '~/components/ui/Dialog.vue';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';

interface Props {
  open: boolean;
  tier?: string;
  usageCount?: number;
  quotaLimit?: number;
  isSandbox?: boolean;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tier: 'FREE',
  usageCount: 0,
  quotaLimit: 3,
  isSandbox: false,
  isLoading: false
});

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void;
  (e: 'checkout', plan: 'monthly' | 'lifetime'): void;
  (e: 'simulate-pro'): void;
}>();

const proFeatures = [
  {
    title: 'Unlimited Contract Audits',
    description: 'No monthly quota or scanning caps across MSAs, SOWs, and NDAs.',
    icon: Sparkles
  },
  {
    title: '3-Posture Protective Counter-Clauses',
    description: 'Instant copy-paste redlines in Collaborative, Firm, and Assertive postures.',
    icon: ShieldCheck
  },
  {
    title: 'Scope Overrun Financial Calculator',
    description: 'Quantify unbilled iteration hours and export protective SLA Addenda.',
    icon: Sliders
  },
  {
    title: 'Watermark-Free Executive Exports',
    description: 'Download clean Markdown briefings and print-ready styled legal redlines.',
    icon: Download
  },
  {
    title: 'Commercial Agency License',
    description: 'Audit inbound subcontractor and outbound enterprise vendor contracts.',
    icon: Zap
  }
];
</script>

<template>
  <Dialog
    :open="open"
    @update:open="(val) => emit('update:open', val)"
    max-width="2xl"
    title="Upgrade to ClauseGuard Pro"
    description="Protect your agency, consulting pipeline, and personal assets against asymmetric contract liabilities."
  >
    <div class="space-y-6 pt-2">
      <!-- Current Quota Usage Banner (if near or at limit) -->
      <div
        v-if="tier === 'FREE'"
        class="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs"
      >
        <div class="flex items-center gap-2 text-amber-800">
          <Lock class="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Current Status: <strong>{{ usageCount }} of {{ quotaLimit }} complimentary audits</strong> used this month.
          </span>
        </div>
        <Badge variant="warning">Free Plan</Badge>
      </div>

      <!-- Comparison Pricing Matrix Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Pro Monthly Card -->
        <div class="rounded-xl border-2 border-parchment-200 bg-white p-5 flex flex-col justify-between hover:border-parchment-300 transition-all shadow-card relative">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-ink-secondary">Pro Monthly</span>
              <Badge variant="neutral">Recurring</Badge>
            </div>
            <div class="flex items-baseline gap-1 mb-3">
              <span class="text-3xl font-bold tracking-tight text-ink-primary font-mono-code">$29</span>
              <span class="text-xs text-ink-muted">/ month</span>
            </div>
            <p class="text-xs text-ink-secondary leading-relaxed mb-4">
              Continuous protection for active freelancers and boutique agencies with routine client contract flow.
            </p>
            <ul class="space-y-2 text-xs text-ink-secondary mb-6">
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unlimited contract risk audits</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Full 3-posture counter-clauses</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Scope overrun SLA addendum export</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cancel self-serve anytime</span>
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            block
            :loading="isLoading"
            @click="emit('checkout', 'monthly')"
            class="mt-auto"
          >
            <CreditCard class="w-4 h-4" />
            <span>Select Pro Monthly ($29/mo)</span>
          </Button>
        </div>

        <!-- Founder Lifetime Deal Card (Featured) -->
        <div class="rounded-xl border-2 border-maritime-600 bg-maritime-50/20 p-5 flex flex-col justify-between transition-all shadow-card relative">
          <div class="absolute -top-3 right-4">
            <span class="bg-maritime-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm">
              Best Commercial Value
            </span>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-maritime-800">Founder Lifetime</span>
              <Badge variant="pro">One-Time</Badge>
            </div>
            <div class="flex items-baseline gap-1 mb-3">
              <span class="text-3xl font-bold tracking-tight text-ink-primary font-mono-code">$79</span>
              <span class="text-xs text-ink-muted">single payment</span>
            </div>
            <p class="text-xs text-ink-secondary leading-relaxed mb-4">
              Permanent unrestricted access. Pay once, safeguard every commercial contract you ever sign.
            </p>
            <ul class="space-y-2 text-xs text-ink-secondary mb-6">
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-maritime-600 shrink-0" />
                <span class="font-medium text-ink-primary">Perpetual lifetime audit entitlement</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-maritime-600 shrink-0" />
                <span>Instant counter-clause posture generator</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-maritime-600 shrink-0" />
                <span>Export clean Markdown & PDF redlines</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-maritime-600 shrink-0" />
                <span>Commercial agency & subcontractor license</span>
              </li>
            </ul>
          </div>

          <Button
            variant="primary"
            block
            :loading="isLoading"
            @click="emit('checkout', 'lifetime')"
            class="mt-auto shadow-md"
          >
            <span>Claim Lifetime Pass ($79)</span>
            <ArrowRight class="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <!-- Feature Breakdown Strip -->
      <div class="border-t border-parchment-200 pt-4">
        <h4 class="text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-3">
          What is included with Pro Access:
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="feat in proFeatures"
            :key="feat.title"
            class="flex items-start gap-2.5 p-2 rounded bg-parchment-50 border border-parchment-200/60"
          >
            <component :is="feat.icon" class="w-4 h-4 text-maritime-600 shrink-0 mt-0.5" />
            <div>
              <div class="text-xs font-semibold text-ink-primary">{{ feat.title }}</div>
              <div class="text-[11px] text-ink-secondary leading-tight mt-0.5">{{ feat.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sandbox Developer Simulation Banner -->
      <div class="rounded-lg border border-dashed border-parchment-300 bg-parchment-100/70 p-3.5 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <FlaskConical class="w-4 h-4 text-ink-secondary shrink-0" />
          <div>
            <div class="text-xs font-medium text-ink-primary">Developer / Evaluator Sandbox Mode</div>
            <div class="text-[11px] text-ink-secondary">
              Simulate an instant upgrade to Pro without a live payment method.
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          @click="emit('simulate-pro')"
          class="shrink-0"
        >
          <span>Simulate Pro Upgrade</span>
        </Button>
      </div>
    </div>
  </Dialog>
</template>
