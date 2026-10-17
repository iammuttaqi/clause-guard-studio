<script setup lang="ts">
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb
} from 'radix-vue';

interface Props {
  modelValue: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: number[]): void;
}>();
</script>

<template>
  <SliderRoot
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val as number[])"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    class="relative flex items-center select-none touch-none w-full h-5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
  >
    <SliderTrack class="bg-parchment-200 relative grow rounded-full h-2">
      <SliderRange class="absolute bg-maritime-600 rounded-full h-full" />
    </SliderTrack>
    <SliderThumb
      class="block w-4 h-4 bg-white border-2 border-maritime-600 shadow-sm rounded-full hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-maritime-500 transition-transform"
      aria-label="Slider Value"
    />
  </SliderRoot>
</template>
