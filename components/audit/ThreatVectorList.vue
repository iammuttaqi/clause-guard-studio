<script setup lang="ts">
import { computed } from 'vue';
import {
  ShieldAlert,
  Layers,
  CreditCard,
  KeyRound,
  FileLock2,
  CheckCircle2
} from 'lucide-vue-next';
import Accordion from '~/components/ui/Accordion.vue';
import ClauseFlagCard from './ClauseFlagCard.vue';
import type { VectorSummary } from '~/types';

interface Props {
  vectorBreakdown: VectorSummary[];
  isPro?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isPro: false
});

const emit = defineEmits<{
  (e: 'unlock'): void;
}>();

const vectorIcons: Record<string, any> = {
  liability: ShieldAlert,
  scope: Layers,
  payment: CreditCard,
  ip: KeyRound,
  restrictive: FileLock2
};

const accordionItems = computed(() => {
  return props.vectorBreakdown.map((vec) => {
    return {
      value: vec.vectorId,
      title: vec.name,
      subtitle: vec.flagCount === 0
        ? 'Zero predatory patterns identified'
        : `${vec.flagCount} ${vec.flagCount === 1 ? 'clause flagged' : 'clauses flagged'} requiring review`,
      badge: vec.flagCount === 0
        ? 'Safe'
        : vec.severity === 'CRITICAL' ? 'Critical' : 'Warning',
      badgeVariant: vec.flagCount === 0
        ? ('safe' as const)
        : vec.severity === 'CRITICAL' ? ('critical' as const) : ('warning' as const),
      icon: vectorIcons[vec.vectorId] || ShieldAlert
    };
  });
});

// Default open vector: first vector with flags, or first vector
const defaultOpenVector = computed(() => {
  const flagged = props.vectorBreakdown.find((v) => v.flagCount > 0);
  return flagged ? flagged.vectorId : 'liability';
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
        5-Vector Risk Breakdown
      </h3>
      <span class="text-xs text-ink-muted">
        Select a vector to view redline terms
      </span>
    </div>

    <Accordion
      :items="accordionItems"
      type="single"
      :default-value="defaultOpenVector"
    >
      <template
        v-for="vec in vectorBreakdown"
        :key="vec.vectorId"
        #[vec.vectorId]
      >
        <div class="space-y-3 pt-1">
          <!-- Flag cards list if flags exist -->
          <template v-if="vec.flags && vec.flags.length > 0">
            <ClauseFlagCard
              v-for="flag in vec.flags"
              :key="flag.id"
              :flag="flag"
              :is-pro="isPro"
              @unlock="emit('unlock')"
            />
          </template>

          <!-- Safe State if 0 flags in this vector -->
          <div
            v-else
            class="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/60 text-xs text-emerald-800"
          >
            <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p class="font-semibold text-emerald-900">Protected Vector</p>
              <p class="text-emerald-700/90 mt-0.5">
                No predatory or toxic contract clauses detected for this category.
              </p>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>
