<script setup lang="ts">
interface Props {
  className?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="[
      'animate-pulse bg-parchment-200/70 rounded',
      className
    ]"
  />
</template>
