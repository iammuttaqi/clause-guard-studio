<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
  block: false
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-maritime-600 text-white hover:bg-maritime-700 active:bg-maritime-800 shadow-sm border border-transparent';
    case 'secondary':
      return 'bg-parchment-100 text-ink-primary hover:bg-parchment-200 active:bg-parchment-300 border border-parchment-200';
    case 'outline':
      return 'bg-white text-ink-primary hover:bg-parchment-50 active:bg-parchment-100 border border-parchment-200 hover:border-parchment-300 shadow-sm';
    case 'ghost':
      return 'bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-parchment-100 active:bg-parchment-200 border border-transparent';
    case 'danger':
      return 'bg-crimson-600 text-white hover:bg-crimson-700 active:bg-crimson-800 shadow-sm border border-transparent';
    case 'amber':
      return 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 shadow-sm border border-transparent';
    default:
      return 'bg-maritime-600 text-white hover:bg-maritime-700';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs px-2.5 py-1.5 h-8 gap-1.5 rounded-md';
    case 'lg':
      return 'text-base px-5 py-3 h-12 gap-2.5 rounded-lg';
    case 'md':
    default:
      return 'text-sm px-3.5 py-2 h-10 gap-2 rounded-md';
  }
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-colors duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-maritime-500 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
      variantClasses,
      sizeClasses,
      block ? 'w-full' : ''
    ]"
  >
    <Loader2 v-if="loading" class="w-4 h-4 animate-spin shrink-0" />
    <slot />
  </button>
</template>
