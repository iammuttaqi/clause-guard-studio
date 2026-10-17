<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from 'radix-vue';

export interface DropdownItem {
  id: string;
  label: string;
  description?: string;
  icon?: any;
  danger?: boolean;
}

interface Props {
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
}

withDefaults(defineProps<Props>(), {
  align: 'end'
});

const emit = defineEmits<{
  (e: 'select', item: DropdownItem): void;
}>();
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :align="align"
        :side-offset="6"
        class="z-50 min-w-[220px] overflow-hidden rounded-lg border border-parchment-200 bg-white p-1.5 shadow-card outline-none text-ink-primary animate-in fade-in zoom-in-95 duration-100"
      >
        <template v-for="(item, idx) in items" :key="item.id">
          <DropdownMenuItem
            @select="emit('select', item)"
            :class="[
              'relative flex cursor-pointer select-none items-center gap-2.5 rounded-md px-3 py-2 text-xs outline-none transition-colors duration-100',
              item.danger
                ? 'text-crimson-700 hover:bg-crimson-50 focus:bg-crimson-50'
                : 'text-ink-primary hover:bg-parchment-100 focus:bg-parchment-100'
            ]"
          >
            <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0 text-ink-secondary" />
            <div class="flex flex-col">
              <span class="font-medium leading-none">{{ item.label }}</span>
              <span v-if="item.description" class="text-[11px] text-ink-secondary mt-1">
                {{ item.description }}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator
            v-if="idx < items.length - 1 && item.id.includes('divider')"
            class="my-1 h-px bg-parchment-200"
          />
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
