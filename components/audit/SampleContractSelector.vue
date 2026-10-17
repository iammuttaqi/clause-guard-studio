<script setup lang="ts">
import { ref } from 'vue';
import { FileText, ChevronDown, Check } from 'lucide-vue-next';
import { SAMPLE_CONTRACTS, type SampleContract } from '~/server/data/sampleContracts';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem
} from 'radix-vue';
import Badge from '~/components/ui/Badge.vue';

interface Props {
  selectedTitle?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'select', sample: SampleContract): void;
}>();

const samples = ref(SAMPLE_CONTRACTS);
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white hover:bg-parchment-50 border border-parchment-200 hover:border-parchment-300 rounded-md text-ink-primary shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-maritime-500"
      >
        <FileText class="w-3.5 h-3.5 text-maritime-600 shrink-0" />
        <span class="truncate max-w-[170px] sm:max-w-[240px]">
          {{ selectedTitle || 'Load Sample Agreement' }}
        </span>
        <ChevronDown class="w-3.5 h-3.5 text-ink-muted ml-auto shrink-0" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="start"
        :side-offset="6"
        class="z-50 w-80 max-w-sm rounded-lg border border-parchment-200 bg-white p-1.5 shadow-card outline-none animate-in fade-in zoom-in-95 duration-100"
      >
        <div class="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Pre-Loaded Realistic Agreements
        </div>

        <DropdownMenuItem
          v-for="sample in samples"
          :key="sample.id"
          @select="emit('select', sample)"
          class="relative flex flex-col items-start gap-1 rounded-md px-3 py-2 text-xs text-ink-primary hover:bg-parchment-100 focus:bg-parchment-100 cursor-pointer outline-none transition-colors"
        >
          <div class="flex items-center justify-between w-full">
            <span class="font-semibold text-ink-primary">{{ sample.category }}</span>
            <Badge
              :variant="sample.simulatedRiskLevel === 'CRITICAL' ? 'critical' : 'warning'"
              size="sm"
            >
              {{ sample.simulatedRiskLevel === 'CRITICAL' ? 'Critical Risk' : 'Warning Risk' }}
            </Badge>
          </div>
          <p class="text-[11px] text-ink-secondary leading-normal line-clamp-2">
            {{ sample.description }}
          </p>
          <div class="flex items-center gap-2 text-[10px] text-ink-muted mt-1 font-mono-code">
            <span>{{ sample.wordCount }} words</span>
            <span>•</span>
            <span>Index ~{{ sample.estimatedProtectionIndex }}/100</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
