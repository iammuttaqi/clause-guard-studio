<script setup lang="ts">
import { ShieldCheck, Lock, Sparkles } from 'lucide-vue-next';

interface Props {
  tier: string;
  usageCount: number;
  quotaLimit: number;
  isPro: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all cursor-pointer shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-maritime-500"
    :class="[
      isPro
        ? 'bg-maritime-50 border-maritime-200 text-maritime-800 hover:bg-maritime-100'
        : 'bg-white border-parchment-200 text-ink-primary hover:bg-parchment-50'
    ]"
    title="Click to manage subscription or upgrade"
  >
    <ShieldCheck v-if="isPro" class="w-3.5 h-3.5 text-maritime-600" />
    <Lock v-else class="w-3.5 h-3.5 text-amber-600" />

    <span v-if="isPro" class="font-semibold">
      {{ tier === 'LIFETIME' ? 'Founder Pass' : 'Pro Member' }}
    </span>
    <span v-else class="text-ink-secondary">
      Free: <strong class="text-ink-primary font-mono-code">{{ Math.max(0, quotaLimit - usageCount) }}/{{ quotaLimit }}</strong> left
    </span>

    <span v-if="!isPro" class="ml-1 text-[10px] text-maritime-600 font-semibold underline decoration-dotted">
      Upgrade
    </span>
  </button>
</template>
