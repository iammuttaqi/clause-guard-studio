<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'radix-vue';

export interface TabOption {
  value: string;
  label: string;
  icon?: any;
  badge?: string | number;
}

interface Props {
  modelValue: string;
  tabs: TabOption[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
}>();
</script>

<template>
  <TabsRoot
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val as string)"
    class="flex flex-col w-full"
  >
    <TabsList class="inline-flex items-center gap-1 p-1 bg-parchment-100/80 rounded-lg border border-parchment-200">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md text-ink-secondary transition-all data-[state=active]:bg-white data-[state=active]:text-ink-primary data-[state=active]:shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-maritime-500"
      >
        <component :is="tab.icon" v-if="tab.icon" class="w-3.5 h-3.5 shrink-0" />
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge !== undefined"
          class="text-[10px] px-1.5 py-0.2 rounded bg-parchment-200 text-ink-secondary"
        >
          {{ tab.badge }}
        </span>
      </TabsTrigger>
    </TabsList>

    <div class="mt-3">
      <slot />
    </div>
  </TabsRoot>
</template>
