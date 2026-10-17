<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'critical' | 'warning' | 'safe' | 'neutral' | 'pro' | 'outline';
  size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm'
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'critical':
      return 'bg-crimson-50 text-crimson-700 border-crimson-200';
    case 'warning':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'safe':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pro':
      return 'bg-maritime-50 text-maritime-700 border-maritime-200 font-semibold';
    case 'neutral':
      return 'bg-parchment-100 text-ink-secondary border-parchment-200';
    case 'outline':
      return 'bg-white text-ink-secondary border-parchment-200';
    case 'default':
    default:
      return 'bg-parchment-100 text-ink-primary border-parchment-200';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'md':
      return 'text-xs px-2.5 py-1 gap-1.5 rounded-md';
    case 'sm':
    default:
      return 'text-[11px] px-2 py-0.5 gap-1 rounded';
  }
});
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium border tracking-wide select-none',
      variantClasses,
      sizeClasses
    ]"
  >
    <slot />
  </span>
</template>
