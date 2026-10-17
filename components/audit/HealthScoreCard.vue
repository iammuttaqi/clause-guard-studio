<script setup lang="ts">
import { computed } from 'vue';
import {
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Scale
} from 'lucide-vue-next';
import Badge from '~/components/ui/Badge.vue';
import type { RiskSeverity } from '~/types';

interface Props {
  score: number;
  riskLevel: RiskSeverity;
  criticalCount: number;
  warningCount: number;
  safeCount: number;
  characterCount: number;
  wordCount: number;
}

const props = withDefaults(defineProps<Props>(), {
  score: 100,
  riskLevel: 'SAFE',
  criticalCount: 0,
  warningCount: 0,
  safeCount: 0,
  characterCount: 0,
  wordCount: 0
});

// Calculate SVG circle stroke properties
const radius = 42;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = computed(() => {
  const progress = Math.max(0, Math.min(100, props.score));
  return circumference - (progress / 100) * circumference;
});

const scoreColorClass = computed(() => {
  if (props.score < 50 || props.riskLevel === 'CRITICAL') {
    return {
      stroke: '#dc2626',
      text: 'text-crimson-700',
      bg: 'bg-crimson-50',
      border: 'border-crimson-200'
    };
  }
  if (props.score < 80 || props.riskLevel === 'WARNING') {
    return {
      stroke: '#d97706',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    };
  }
  return {
    stroke: '#16a34a',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  };
});

const summaryAdvisory = computed(() => {
  if (props.score < 50 || props.riskLevel === 'CRITICAL') {
    return 'Severe asymmetric legal exposure detected. This agreement contains predatory indemnity, uncapped damages, or premature intellectual property transfer. Do not sign without defensive redlining.';
  }
  if (props.score < 80 || props.riskLevel === 'WARNING') {
    return 'Moderate commercial downside traps identified. The agreement contains unbilled revision risks, extended payment cycles, or vague subjective sign-off traps that require balanced amendment.';
  }
  return 'Contract exhibits sound commercial balance. Liabilities are reasonably bounded and payment milestones align with standard freelance and agency commercial practices.';
});
</script>

<template>
  <div class="rounded-xl border border-parchment-200 bg-white p-5 shadow-card">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-parchment-100">
      <div>
        <div class="flex items-center gap-2">
          <Scale class="w-4 h-4 text-maritime-600" />
          <h3 class="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
            Contract Health Audit
          </h3>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <Badge
            :variant="riskLevel === 'CRITICAL' ? 'critical' : riskLevel === 'WARNING' ? 'warning' : 'safe'"
            size="md"
          >
            <ShieldAlert v-if="riskLevel === 'CRITICAL'" class="w-3.5 h-3.5 mr-1" />
            <AlertTriangle v-else-if="riskLevel === 'WARNING'" class="w-3.5 h-3.5 mr-1" />
            <ShieldCheck v-else class="w-3.5 h-3.5 mr-1" />
            <span>{{ riskLevel === 'CRITICAL' ? 'Critical Risk Exposure' : riskLevel === 'WARNING' ? 'Warning Risk Exposure' : 'Well-Protected Contract' }}</span>
          </Badge>
        </div>
      </div>

      <!-- Radial Protection Index Gauge -->
      <div class="flex items-center gap-3">
        <div class="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg class="w-20 h-20 -rotate-90 transform" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle
              cx="50"
              cy="50"
              :r="radius"
              stroke="#e7e5e4"
              stroke-width="8"
              fill="transparent"
            />
            <!-- Progress circle -->
            <circle
              cx="50"
              cy="50"
              :r="radius"
              :stroke="scoreColorClass.stroke"
              stroke-width="8"
              stroke-linecap="round"
              fill="transparent"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              class="transition-all duration-700 ease-out"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span :class="['text-xl font-bold font-mono-code leading-none', scoreColorClass.text]">
              {{ score }}
            </span>
            <span class="text-[9px] uppercase tracking-wider font-semibold text-ink-muted mt-0.5">
              / 100
            </span>
          </div>
        </div>

        <div class="text-left">
          <div class="text-xs font-semibold text-ink-primary">Protection Index</div>
          <div class="text-[11px] text-ink-muted">Commercial Security Grade</div>
        </div>
      </div>
    </div>

    <!-- Stat Pill Highlights -->
    <div class="grid grid-cols-3 gap-2.5 my-4">
      <div class="p-2.5 rounded-lg bg-crimson-50/60 border border-crimson-200/70 flex flex-col">
        <div class="flex items-center gap-1.5 text-crimson-700 mb-1">
          <AlertOctagon class="w-3.5 h-3.5 shrink-0" />
          <span class="text-[11px] font-semibold uppercase tracking-wider">Critical</span>
        </div>
        <span class="text-xl font-bold font-mono-code text-crimson-800 leading-tight">
          {{ criticalCount }}
        </span>
        <span class="text-[10px] text-crimson-700/80 mt-0.5">predatory clauses</span>
      </div>

      <div class="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 flex flex-col">
        <div class="flex items-center gap-1.5 text-amber-700 mb-1">
          <AlertTriangle class="w-3.5 h-3.5 shrink-0" />
          <span class="text-[11px] font-semibold uppercase tracking-wider">Warning</span>
        </div>
        <span class="text-xl font-bold font-mono-code text-amber-800 leading-tight">
          {{ warningCount }}
        </span>
        <span class="text-[10px] text-amber-700/80 mt-0.5">commercial traps</span>
      </div>

      <div class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/70 flex flex-col">
        <div class="flex items-center gap-1.5 text-emerald-700 mb-1">
          <CheckCircle2 class="w-3.5 h-3.5 shrink-0" />
          <span class="text-[11px] font-semibold uppercase tracking-wider">Safe</span>
        </div>
        <span class="text-xl font-bold font-mono-code text-emerald-800 leading-tight">
          {{ safeCount }}
        </span>
        <span class="text-[10px] text-emerald-700/80 mt-0.5">protective clauses</span>
      </div>
    </div>

    <!-- Executive Counsel Advisory Notice -->
    <div class="p-3 rounded-lg bg-parchment-50 border border-parchment-200 text-xs text-ink-secondary leading-relaxed">
      <p class="font-medium text-ink-primary mb-1">Executive Legal Advisory:</p>
      <p>{{ summaryAdvisory }}</p>
    </div>
  </div>
</template>
