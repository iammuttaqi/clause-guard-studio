<script setup lang="ts">
import {
  Check,
  Minus,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  FlaskConical,
  Zap
} from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';

interface Props {
  currentTier?: string;
  isSandbox?: boolean;
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  currentTier: 'FREE',
  isSandbox: false,
  isLoading: false
});

const emit = defineEmits<{
  (e: 'checkout', plan: 'monthly' | 'lifetime'): void;
  (e: 'simulate-pro'): void;
}>();

const features = [
  { name: 'Monthly Contract Audits', free: '3 scans / month', pro: 'Unlimited', lifetime: 'Unlimited' },
  { name: '25+ Lexical Pattern Risk Scanner', free: true, pro: true, lifetime: true },
  { name: 'Overall Protection Index (0-100)', free: true, pro: true, lifetime: true },
  { name: '5-Vector Risk Breakdown Accordion', free: true, pro: true, lifetime: true },
  { name: '1-Click Counter-Clause Generator', free: 'Teaser Preview', pro: 'Full Access (3 Postures)', lifetime: 'Full Access (3 Postures)' },
  { name: 'Collaborative / Firm / Assertive Postures', free: false, pro: true, lifetime: true },
  { name: 'Deliverable & Scope Overrun Calculator', free: 'View Calculations', pro: 'Full + Custom SLA Rider', lifetime: 'Full + Custom SLA Rider' },
  { name: 'Visual Redline Diff Comparison', free: false, pro: true, lifetime: true },
  { name: 'Clean Markdown & PDF Briefing Export', free: 'Watermarked Preview', pro: 'Watermark-Free', lifetime: 'Watermark-Free' },
  { name: 'Commercial Agency & Subcontractor License', free: false, pro: true, lifetime: true },
  { name: 'Stripe Customer Portal Self-Serve Access', free: false, pro: true, lifetime: true }
];
</script>

<template>
  <div class="rounded-2xl border border-parchment-200 bg-white p-6 md:p-8 shadow-card space-y-8">
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <Badge variant="pro" size="md">Transparent Commercial Protection</Badge>
      <h2 class="text-2xl md:text-3xl font-serif-title font-normal tracking-tight text-ink-primary">
        Predictable, Transparent Legal Safeguards
      </h2>
      <p class="text-xs md:text-sm text-ink-secondary leading-relaxed">
        Save an average of $2,775 per client contract by eliminating uncapped revisions, indemnification traps, and delayed payment lag.
      </p>
    </div>

    <!-- 3-Column Plan Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Free Starter Card -->
      <div class="rounded-xl border border-parchment-200 bg-white p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-ink-secondary">Free Starter</span>
            <Badge variant="neutral">Evaluation</Badge>
          </div>
          <div class="flex items-baseline gap-1 mb-3">
            <span class="text-3xl font-bold font-mono-code text-ink-primary">$0</span>
            <span class="text-xs text-ink-muted">forever free</span>
          </div>
          <p class="text-xs text-ink-secondary leading-relaxed mb-6">
            Verify our deterministic threat engine on up to 3 client contracts per month.
          </p>
          <ul class="space-y-2.5 text-xs text-ink-secondary mb-6 border-t border-parchment-100 pt-4">
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3 contract scans per calendar month</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Overall Protection Index score</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>High-level risk severity badges</span>
            </li>
            <li class="flex items-center gap-2 text-ink-muted">
              <Minus class="w-4 h-4 text-parchment-300 shrink-0" />
              <span>Counter-clauses locked (preview only)</span>
            </li>
          </ul>
        </div>

        <Button
          variant="outline"
          block
          disabled
          class="mt-auto"
        >
          <span>{{ currentTier === 'FREE' ? 'Current Plan' : 'Free Starter' }}</span>
        </Button>
      </div>

      <!-- Pro Monthly Card -->
      <div class="rounded-xl border-2 border-parchment-200 bg-white p-6 flex flex-col justify-between hover:border-parchment-300 transition-all shadow-sm">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-ink-secondary">Pro Monthly</span>
            <Badge variant="neutral">Recurring</Badge>
          </div>
          <div class="flex items-baseline gap-1 mb-3">
            <span class="text-3xl font-bold font-mono-code text-ink-primary">$29</span>
            <span class="text-xs text-ink-muted">/ month</span>
          </div>
          <p class="text-xs text-ink-secondary leading-relaxed mb-6">
            For active freelancers and boutique studios managing regular inbound client MSAs and SOWs.
          </p>
          <ul class="space-y-2.5 text-xs text-ink-secondary mb-6 border-t border-parchment-100 pt-4">
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span class="font-medium text-ink-primary">Unlimited monthly contract audits</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1-click 3-posture counter-clauses</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Scope overrun financial calculator</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Watermark-free PDF & Markdown exports</span>
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
          <span>Subscribe Pro ($29/mo)</span>
        </Button>
      </div>

      <!-- Founder Lifetime Pass (Featured) -->
      <div class="rounded-xl border-2 border-maritime-600 bg-maritime-50/20 p-6 flex flex-col justify-between shadow-elevation relative">
        <div class="absolute -top-3 right-6">
          <span class="bg-maritime-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm">
            Highest Value Deal
          </span>
        </div>

        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-maritime-800">Founder Lifetime Pass</span>
            <Badge variant="pro">Single Payment</Badge>
          </div>
          <div class="flex items-baseline gap-1 mb-3">
            <span class="text-3xl font-bold font-mono-code text-ink-primary">$79</span>
            <span class="text-xs text-ink-muted">one-time payment</span>
          </div>
          <p class="text-xs text-ink-secondary leading-relaxed mb-6">
            Permanent unlimited protection. Protect every future contract without monthly software subscriptions.
          </p>
          <ul class="space-y-2.5 text-xs text-ink-secondary mb-6 border-t border-parchment-200 pt-4">
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-maritime-600 shrink-0" />
              <span class="font-medium text-ink-primary">Perpetual lifetime audit entitlement</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-maritime-600 shrink-0" />
              <span>Instant counter-clause posture generator</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-maritime-600 shrink-0" />
              <span>Protective SLA addendum exports</span>
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 text-maritime-600 shrink-0" />
              <span>Full commercial agency license</span>
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
          <span>Get Lifetime Access ($79)</span>
          <ArrowRight class="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>

    <!-- Detailed Feature Comparison Table -->
    <div class="border-t border-parchment-200 pt-8 overflow-x-auto">
      <h3 class="text-sm font-semibold text-ink-primary mb-4">Detailed Feature Matrix</h3>
      <table class="w-full text-xs text-left">
        <thead>
          <tr class="border-b border-parchment-200 text-ink-muted uppercase tracking-wider text-[10px]">
            <th class="py-2.5 pr-4 font-semibold">Capability</th>
            <th class="py-2.5 px-4 font-semibold text-center">Free Starter</th>
            <th class="py-2.5 px-4 font-semibold text-center">Pro Monthly</th>
            <th class="py-2.5 pl-4 font-semibold text-center text-maritime-700">Founder Lifetime</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-parchment-100">
          <tr v-for="feat in features" :key="feat.name" class="hover:bg-parchment-50/60 transition-colors">
            <td class="py-2.5 pr-4 text-ink-primary font-medium">{{ feat.name }}</td>
            <td class="py-2.5 px-4 text-center text-ink-secondary">
              <span v-if="typeof feat.free === 'boolean'">
                <Check v-if="feat.free" class="w-4 h-4 text-emerald-600 mx-auto" />
                <Minus v-else class="w-4 h-4 text-parchment-300 mx-auto" />
              </span>
              <span v-else>{{ feat.free }}</span>
            </td>
            <td class="py-2.5 px-4 text-center text-ink-secondary">
              <span v-if="typeof feat.pro === 'boolean'">
                <Check v-if="feat.pro" class="w-4 h-4 text-emerald-600 mx-auto" />
                <Minus v-else class="w-4 h-4 text-parchment-300 mx-auto" />
              </span>
              <span v-else class="font-medium text-ink-primary">{{ feat.pro }}</span>
            </td>
            <td class="py-2.5 pl-4 text-center text-ink-secondary bg-maritime-50/10">
              <span v-if="typeof feat.lifetime === 'boolean'">
                <Check v-if="feat.lifetime" class="w-4 h-4 text-maritime-600 mx-auto" />
                <Minus v-else class="w-4 h-4 text-parchment-300 mx-auto" />
              </span>
              <span v-else class="font-medium text-maritime-800">{{ feat.lifetime }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sandbox Simulation Bar -->
    <div class="rounded-xl border border-dashed border-parchment-300 bg-parchment-100/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <FlaskConical class="w-5 h-5 text-maritime-600 shrink-0" />
        <div>
          <div class="text-xs font-semibold text-ink-primary">Developer & Evaluator Sandbox Mode</div>
          <p class="text-[11px] text-ink-secondary">
            Testing ClauseGuard Studio? Flip your current session to Pro instantly with zero payment credentials.
          </p>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        @click="emit('simulate-pro')"
        class="shrink-0"
      >
        <span>Toggle Simulated Pro Plan</span>
      </Button>
    </div>
  </div>
</template>
