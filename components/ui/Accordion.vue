<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
} from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';

export interface AccordionItemData {
  value: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'critical' | 'warning' | 'safe' | 'neutral';
  icon?: any;
}

interface Props {
  items: AccordionItemData[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

withDefaults(defineProps<Props>(), {
  type: 'single'
});
</script>

<template>
  <AccordionRoot
    :type="type as any"
    :default-value="defaultValue as any"
    class="space-y-2 w-full"
    collapsible
  >
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="group rounded-lg border border-parchment-200 bg-white overflow-hidden shadow-parchment transition-all"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger
          class="flex flex-1 items-center justify-between p-3.5 text-left text-sm font-medium text-ink-primary hover:bg-parchment-50 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-maritime-500"
        >
          <div class="flex items-center gap-2.5">
            <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0 text-ink-secondary" />
            <div>
              <div class="flex items-center gap-2">
                <span class="font-medium text-ink-primary text-xs tracking-tight">{{ item.title }}</span>
                <span
                  v-if="item.badge"
                  :class="[
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full border',
                    item.badgeVariant === 'critical' ? 'bg-crimson-50 text-crimson-700 border-crimson-200' :
                    item.badgeVariant === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    item.badgeVariant === 'safe' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-parchment-100 text-ink-secondary border-parchment-200'
                  ]"
                >
                  {{ item.badge }}
                </span>
              </div>
              <p v-if="item.subtitle" class="text-[11px] text-ink-secondary mt-0.5">
                {{ item.subtitle }}
              </p>
            </div>
          </div>
          <ChevronDown
            class="w-4 h-4 text-ink-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        class="border-t border-parchment-100 bg-parchment-50/50 p-4 text-xs text-ink-secondary leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden"
      >
        <slot :name="item.value" :item="item" />
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
