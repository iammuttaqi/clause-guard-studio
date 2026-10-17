<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  AlertOctagon,
  AlertTriangle,
  Copy,
  Check,
  Lock,
  GitCommitHorizontal,
  Mail,
  Shield,
  Scale,
  Handshake
} from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';
import Tabs from '~/components/ui/Tabs.vue';
import DiffViewer from './DiffViewer.vue';
import type { DetectedFlag, NegotiationPosture } from '~/types';
import { useClipboard } from '@vueuse/core';

interface Props {
  flag: DetectedFlag;
  isPro?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isPro: false
});

const emit = defineEmits<{
  (e: 'unlock'): void;
}>();

const currentPosture = ref<NegotiationPosture>('firm');
const showDiff = ref<boolean>(false);

const { copy: copyClause, copied: clauseCopied } = useClipboard({ copiedDuring: 2000 });
const { copy: copyEmail, copied: emailCopied } = useClipboard({ copiedDuring: 2000 });

const postureTabs = [
  { value: 'collaborative', label: 'Collaborative', icon: Handshake },
  { value: 'firm', label: 'Firm (Standard)', icon: Scale },
  { value: 'assertive', label: 'Assertive', icon: Shield }
];

const activeCounterClause = computed(() => {
  switch (currentPosture.value) {
    case 'collaborative':
      return props.flag.counterClauseCollaborative;
    case 'assertive':
      return props.flag.counterClauseAssertive;
    case 'firm':
    default:
      return props.flag.counterClauseFirm;
  }
});

const strategicAdvice = computed(() => {
  switch (currentPosture.value) {
    case 'collaborative':
      return {
        stance: 'Relational wording suited for early-stage clients or trusted commercial partners.',
        email: `Hi team, we reviewed this section and proposed a slight modification to align with our insurer standard covenants. Please confirm if this updated wording works.`
      };
    case 'assertive':
      return {
        stance: 'Strict commercial boundaries suited for aggressive enterprise procurement teams.',
        email: `Our firm disclaims unilateral indemnity and uncapped liabilities. Please incorporate this redline to finalize the contract for execution.`
      };
    case 'firm':
    default:
      return {
        stance: 'Balanced industry-standard commercial protection with mutual reciprocity.',
        email: `Regarding this clause: as an independent professional firm, our standard practice requires mutual liability caps and cleared payment title transfer. Please approve this redline.`
      };
  }
});

function handleCopyClause() {
  copyClause(activeCounterClause.value);
}

function handleCopyEmail() {
  copyEmail(strategicAdvice.value.email);
}
</script>

<template>
  <div class="rounded-xl border border-parchment-200 bg-white p-5 shadow-sm space-y-4">
    <!-- Header with Severity & Title -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-2">
        <component
          :is="flag.severity === 'CRITICAL' ? AlertOctagon : AlertTriangle"
          :class="[
            'w-4 h-4 shrink-0',
            flag.severity === 'CRITICAL' ? 'text-crimson-600' : 'text-amber-600'
          ]"
        />
        <h4 class="text-xs font-bold text-ink-primary tracking-tight">
          {{ flag.name }}
        </h4>
      </div>

      <Badge
        :variant="flag.severity === 'CRITICAL' ? 'critical' : 'warning'"
        size="sm"
      >
        {{ flag.severity === 'CRITICAL' ? 'Critical Threat' : 'Warning Trap' }}
      </Badge>
    </div>

    <!-- Offending Snippet in Agreement -->
    <div class="p-3 rounded-lg bg-crimson-50/40 border border-crimson-200/60 font-mono-code text-xs leading-relaxed text-ink-primary">
      <span class="block text-[10px] font-semibold tracking-wider uppercase text-crimson-700 mb-1">
        Flagged Contract Language:
      </span>
      <p class="italic text-ink-secondary">"{{ flag.originalText }}"</p>
    </div>

    <!-- Plain English Risk Advisory -->
    <div class="text-xs text-ink-secondary leading-relaxed">
      <strong class="text-ink-primary font-semibold">Commercial Risk Advisory: </strong>
      <span>{{ flag.explanation }}</span>
    </div>

    <!-- Posture Negotiation Selector -->
    <div class="border-t border-parchment-100 pt-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[11px] font-semibold uppercase tracking-wider text-ink-secondary">
          Protective Counter-Clause Posture:
        </span>
        <button
          type="button"
          @click="showDiff = !showDiff"
          class="inline-flex items-center gap-1.5 text-[11px] font-medium text-maritime-600 hover:text-maritime-700 transition-colors"
        >
          <GitCommitHorizontal class="w-3.5 h-3.5" />
          <span>{{ showDiff ? 'Hide Redline Diff' : 'View Redline Diff' }}</span>
        </button>
      </div>

      <Tabs
        v-model="currentPosture"
        :tabs="postureTabs"
      />

      <!-- Posture Description Banner -->
      <p class="text-[11px] text-ink-muted italic mt-2">
        {{ strategicAdvice.stance }}
      </p>
    </div>

    <!-- Redline Diff View (Optional Toggle) -->
    <div v-if="showDiff" class="mt-3">
      <DiffViewer
        :original-text="flag.originalText"
        :counter-text="activeCounterClause"
      />
    </div>

    <!-- Counter-Clause Output Well -->
    <div class="relative rounded-lg border border-parchment-200 bg-parchment-50 p-4">
      <!-- Pro Content (if unlocked) -->
      <div v-if="isPro" class="space-y-3">
        <p class="font-mono-code text-xs text-ink-primary leading-relaxed">
          {{ activeCounterClause }}
        </p>

        <!-- Action Toolbar -->
        <div class="flex items-center justify-between gap-2 pt-2 border-t border-parchment-200/80 flex-wrap">
          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              @click="handleCopyClause"
              class="h-7 text-[11px]"
            >
              <Check v-if="clauseCopied" class="w-3 h-3 text-emerald-600" />
              <Copy v-else class="w-3 h-3 text-ink-secondary" />
              <span>{{ clauseCopied ? 'Copied Clause' : 'Copy Counter-Clause' }}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              @click="handleCopyEmail"
              class="h-7 text-[11px]"
            >
              <Check v-if="emailCopied" class="w-3 h-3 text-emerald-600" />
              <Mail v-else class="w-3 h-3 text-ink-secondary" />
              <span>{{ emailCopied ? 'Copied Email' : 'Copy Email Response' }}</span>
            </Button>
          </div>
        </div>
      </div>

      <!-- Locked Free Tier Teaser with Editorial Blur -->
      <div v-else class="relative">
        <p class="font-mono-code text-xs text-ink-secondary leading-relaxed blur-[3px] select-none pointer-events-none">
          {{ activeCounterClause }} To the maximum extent permitted by applicable law, Contractor's total aggregate liability arising out of or related to this Agreement shall be strictly capped at the total fees actually paid to Contractor hereunder in the twelve (12) months preceding the event giving rise to liability.
        </p>

        <div class="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] p-4 text-center rounded">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold mb-2">
            <Lock class="w-3 h-3 text-amber-600" />
            <span>Pro Protective Counter-Clause</span>
          </div>
          <p class="text-xs text-ink-secondary max-w-xs mb-3">
            Unlock negotiation-ready counter-clauses in 3 postures and executive email scripts.
          </p>
          <Button
            variant="primary"
            size="sm"
            @click="emit('unlock')"
            class="shadow-sm"
          >
            <span>Unlock Counter-Clauses (Pro)</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
