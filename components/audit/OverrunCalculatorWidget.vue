<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  Sliders,
  DollarSign,
  Clock,
  TrendingDown,
  ShieldCheck,
  Copy,
  Check,
  Lock,
  FileText
} from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';
import Slider from '~/components/ui/Slider.vue';
import { calculateOverrunRisk } from '~/server/utils/overrunCalculator';
import { useClipboard } from '@vueuse/core';

interface Props {
  isPro?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isPro: false
});

const emit = defineEmits<{
  (e: 'unlock'): void;
}>();

// Interactive Model State
const baseFee = ref<number>(12000);
const estimatedHours = ref<number>(80);
const targetHourlyRate = ref<number>(150);
const includedRevisions = ref<number>(2);
const anticipatedRevisions = ref<number>(5);
const clientReviewWindowDays = ref<number>(5);

// Reactive calculation result
const calculation = computed(() => {
  return calculateOverrunRisk({
    baseFee: baseFee.value,
    estimatedHours: estimatedHours.value,
    targetHourlyRate: targetHourlyRate.value,
    includedRevisions: includedRevisions.value,
    anticipatedRevisions: anticipatedRevisions.value,
    clientReviewWindowDays: clientReviewWindowDays.value
  });
});

const { copy, copied } = useClipboard({ copiedDuring: 2000 });

function handleCopySla() {
  copy(calculation.value.protectiveSlaClause.clauseText);
}
</script>

<template>
  <div class="rounded-xl border border-parchment-200 bg-white p-5 shadow-card space-y-6">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 border-b border-parchment-100 pb-4">
      <div>
        <div class="flex items-center gap-2">
          <Sliders class="w-4 h-4 text-maritime-600" />
          <h3 class="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
            Deliverable & Scope Overrun Calculator
          </h3>
        </div>
        <p class="text-xs text-ink-secondary mt-1">
          Quantify the direct financial revenue exposure of subjective feedback cycles and unbilled revision loops.
        </p>
      </div>

      <Badge variant="pro" size="sm">
        Financial Model
      </Badge>
    </div>

    <!-- Sliders and Inputs Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Base Fee Input -->
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs">
          <label class="font-medium text-ink-primary">Quoted Project Fee ($)</label>
          <span class="font-mono-code font-semibold text-ink-primary">${{ baseFee.toLocaleString() }}</span>
        </div>
        <Slider
          :model-value="[baseFee]"
          @update:model-value="(val) => baseFee = val[0]"
          :min="1000"
          :max="50000"
          :step="500"
        />
        <div class="flex justify-between text-[10px] text-ink-muted">
          <span>$1,000</span>
          <span>$50,000</span>
        </div>
      </div>

      <!-- Target Hourly Rate -->
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs">
          <label class="font-medium text-ink-primary">Target Hourly Rate ($/hr)</label>
          <span class="font-mono-code font-semibold text-ink-primary">${{ targetHourlyRate }}/hr</span>
        </div>
        <Slider
          :model-value="[targetHourlyRate]"
          @update:model-value="(val) => targetHourlyRate = val[0]"
          :min="50"
          :max="350"
          :step="5"
        />
        <div class="flex justify-between text-[10px] text-ink-muted">
          <span>$50/hr</span>
          <span>$350/hr</span>
        </div>
      </div>

      <!-- Quoted Development Hours -->
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs">
          <label class="font-medium text-ink-primary">Quoted Scope Hours (hrs)</label>
          <span class="font-mono-code font-semibold text-ink-primary">{{ estimatedHours }} hrs</span>
        </div>
        <Slider
          :model-value="[estimatedHours]"
          @update:model-value="(val) => estimatedHours = val[0]"
          :min="20"
          :max="300"
          :step="5"
        />
        <div class="flex justify-between text-[10px] text-ink-muted">
          <span>20 hrs</span>
          <span>300 hrs</span>
        </div>
      </div>

      <!-- Included Revision Rounds -->
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs">
          <label class="font-medium text-ink-primary">Included Revision Rounds</label>
          <span class="font-mono-code font-semibold text-ink-primary">{{ includedRevisions }} rounds</span>
        </div>
        <Slider
          :model-value="[includedRevisions]"
          @update:model-value="(val) => includedRevisions = val[0]"
          :min="0"
          :max="5"
          :step="1"
        />
        <div class="flex justify-between text-[10px] text-ink-muted">
          <span>0 (Strict)</span>
          <span>5 rounds</span>
        </div>
      </div>

      <!-- Anticipated Actual Revisions -->
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs">
          <label class="font-medium text-ink-primary">Anticipated Client Revisions</label>
          <span class="font-mono-code font-semibold text-crimson-700">{{ anticipatedRevisions }} rounds</span>
        </div>
        <Slider
          :model-value="[anticipatedRevisions]"
          @update:model-value="(val) => anticipatedRevisions = val[0]"
          :min="1"
          :max="10"
          :step="1"
        />
        <div class="flex justify-between text-[10px] text-ink-muted">
          <span>1 round</span>
          <span>10 rounds</span>
        </div>
      </div>

      <!-- Client Review Window Days -->
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs">
          <label class="font-medium text-ink-primary">Review Turnaround Window</label>
          <span class="font-mono-code font-semibold text-ink-primary">{{ clientReviewWindowDays }} business days</span>
        </div>
        <Slider
          :model-value="[clientReviewWindowDays]"
          @update:model-value="(val) => clientReviewWindowDays = val[0]"
          :min="2"
          :max="14"
          :step="1"
        />
        <div class="flex justify-between text-[10px] text-ink-muted">
          <span>2 days</span>
          <span>14 days</span>
        </div>
      </div>
    </div>

    <!-- Live Computed Outputs Strip -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
      <!-- Unbilled Hours -->
      <div class="p-3 rounded-lg bg-parchment-100/70 border border-parchment-200">
        <div class="flex items-center gap-1 text-ink-secondary text-[11px] mb-1 font-medium">
          <Clock class="w-3.5 h-3.5 text-amber-600" />
          <span>Unbilled Overrun</span>
        </div>
        <div class="text-lg font-bold font-mono-code text-ink-primary">
          +{{ calculation.metrics.unbilledOverrunHours }} hrs
        </div>
        <div class="text-[10px] text-ink-muted mt-0.5">uncompensated effort</div>
      </div>

      <!-- Downside Financial Exposure -->
      <div class="p-3 rounded-lg bg-crimson-50/60 border border-crimson-200">
        <div class="flex items-center gap-1 text-crimson-700 text-[11px] mb-1 font-medium">
          <DollarSign class="w-3.5 h-3.5" />
          <span>Downside Loss</span>
        </div>
        <div class="text-lg font-bold font-mono-code text-crimson-800">
          -${{ calculation.metrics.calculatedDownsideLoss.toLocaleString() }}
        </div>
        <div class="text-[10px] text-crimson-700/80 mt-0.5">unbilled fee leakage</div>
      </div>

      <!-- Effective Realized Rate -->
      <div class="p-3 rounded-lg bg-parchment-100/70 border border-parchment-200">
        <div class="flex items-center gap-1 text-ink-secondary text-[11px] mb-1 font-medium">
          <TrendingDown class="w-3.5 h-3.5 text-crimson-600" />
          <span>Realized Rate</span>
        </div>
        <div class="text-lg font-bold font-mono-code text-ink-primary">
          ${{ calculation.metrics.effectiveRealizedRate }}/hr
        </div>
        <div class="text-[10px] text-crimson-700 mt-0.5 font-medium">
          {{ calculation.metrics.rateDegradationPercent }}% degradation
        </div>
      </div>

      <!-- Recommended Buffer Fee -->
      <div class="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
        <div class="flex items-center gap-1 text-emerald-700 text-[11px] mb-1 font-medium">
          <ShieldCheck class="w-3.5 h-3.5" />
          <span>SLA Buffer Fee</span>
        </div>
        <div class="text-lg font-bold font-mono-code text-emerald-800">
          +${{ calculation.metrics.recommendedBufferFee.toLocaleString() }}
        </div>
        <div class="text-[10px] text-emerald-700/80 mt-0.5">20% contingency</div>
      </div>
    </div>

    <!-- Protective SLA Addendum Clause Box -->
    <div class="space-y-3 pt-3 border-t border-parchment-100">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <FileText class="w-4 h-4 text-maritime-600" />
          <h4 class="text-xs font-semibold text-ink-primary">
            Protective Scope Containment SLA Addendum
          </h4>
        </div>

        <Button
          v-if="isPro"
          variant="outline"
          size="sm"
          @click="handleCopySla"
          class="h-7 text-[11px]"
        >
          <Check v-if="copied" class="w-3 h-3 text-emerald-600" />
          <Copy v-else class="w-3 h-3 text-ink-secondary" />
          <span>{{ copied ? 'Copied SLA Rider' : 'Copy SLA Clause' }}</span>
        </Button>
      </div>

      <div class="relative rounded-lg border border-parchment-200 bg-parchment-50/70 p-4 font-mono-code text-xs leading-relaxed text-ink-primary">
        <template v-if="isPro">
          <pre class="whitespace-pre-wrap font-mono-code text-xs leading-relaxed text-ink-primary">{{ calculation.protectiveSlaClause.clauseText }}</pre>
        </template>
        <template v-else>
          <pre class="whitespace-pre-wrap font-mono-code text-xs leading-relaxed text-ink-secondary blur-[2.5px] select-none pointer-events-none">{{ calculation.protectiveSlaClause.clauseText }}</pre>
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] p-4 text-center rounded">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold mb-2">
              <Lock class="w-3 h-3 text-amber-600" />
              <span>Pro Protective SLA Addendum</span>
            </div>
            <p class="text-xs text-ink-secondary max-w-sm mb-3">
              Unlock the customized, print-ready contract addendum clause set at ${{ targetHourlyRate }}/hr with deemed acceptance terms.
            </p>
            <Button
              variant="primary"
              size="sm"
              @click="emit('unlock')"
              class="shadow-sm"
            >
              <span>Unlock Protective SLA Addendum (Pro)</span>
            </Button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
