<script setup lang="ts">
import { FlaskConical, Check } from 'lucide-vue-next';

interface Props {
  isPro?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();
</script>

<template>
  <button
    type="button"
    @click="emit('toggle')"
    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border border-parchment-200 bg-white hover:bg-parchment-100/70 transition-colors shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-maritime-500"
    :title="isPro ? 'Click to switch back to Free plan' : 'Click to simulate instant Pro plan'"
  >
    <FlaskConical :class="['w-3.5 h-3.5', isPro ? 'text-maritime-600' : 'text-ink-secondary']" />
    <span class="text-ink-secondary">Sandbox:</span>
    <span :class="['font-semibold', isPro ? 'text-maritime-700' : 'text-ink-primary']">
      {{ isPro ? 'Pro Active' : 'Free Mode' }}
    </span>
    <span
      :class="[
        'w-1.5 h-1.5 rounded-full ml-0.5',
        isPro ? 'bg-emerald-500 animate-pulse' : 'bg-parchment-400'
      ]"
    />
  </button>
</template>
