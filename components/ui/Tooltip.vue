<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent
} from 'radix-vue';

interface Props {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

withDefaults(defineProps<Props>(), {
  side: 'top',
  align: 'center'
});
</script>

<template>
  <TooltipProvider :delay-duration="150">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="side"
          :align="align"
          :side-offset="5"
          class="z-50 max-w-xs rounded-md bg-ink-primary px-3 py-1.5 text-xs text-white shadow-card animate-in fade-in zoom-in-95 duration-100"
        >
          <span>{{ content }}</span>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
