<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'radix-vue';
import { X } from 'lucide-vue-next';

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'lg'
});

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void;
}>();

const maxWidthClass = computed(() => {
  switch (props.maxWidth) {
    case 'sm': return 'max-w-sm';
    case 'md': return 'max-w-md';
    case 'lg': return 'max-w-lg';
    case 'xl': return 'max-w-xl';
    case '2xl': return 'max-w-2xl';
    default: return 'max-w-lg';
  }
});
</script>

<template>
  <DialogRoot :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-ink-primary/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-150" />
      <DialogContent
        :class="[
          'fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] border border-parchment-200 bg-white p-6 shadow-elevation rounded-xl outline-none focus:outline-none max-h-[90vh] overflow-y-auto custom-scrollbar',
          maxWidthClass
        ]"
      >
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <DialogTitle v-if="title" class="text-lg font-semibold tracking-tight text-ink-primary">
              {{ title }}
            </DialogTitle>
            <DialogDescription v-if="description" class="text-xs text-ink-secondary mt-1">
              {{ description }}
            </DialogDescription>
          </div>
          <DialogClose class="rounded-md p-1.5 text-ink-muted hover:text-ink-primary hover:bg-parchment-100 transition-colors">
            <X class="w-4 h-4" />
            <span class="sr-only">Close modal</span>
          </DialogClose>
        </div>

        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
