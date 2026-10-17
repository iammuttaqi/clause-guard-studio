<script setup lang="ts">
import { ref } from 'vue';
import {
  Download,
  Copy,
  Check,
  FileText,
  Lock,
  Printer
} from 'lucide-vue-next';
import Dialog from '~/components/ui/Dialog.vue';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';
import { useClipboard } from '@vueuse/core';

interface Props {
  open: boolean;
  markdownContent: string;
  isPro?: boolean;
  contractTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isPro: false,
  contractTitle: 'Contract'
});

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void;
  (e: 'unlock'): void;
}>();

const { copy, copied } = useClipboard({ copiedDuring: 2000 });

function downloadMarkdown() {
  const blob = new Blob([props.markdownContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${props.contractTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}_Redline_Report.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handlePrint() {
  window.print();
}
</script>

<template>
  <Dialog
    :open="open"
    @update:open="(val) => emit('update:open', val)"
    title="Export Executive Redline Briefing"
    description="Export a clean, structured commercial redline report with Protection Index scoring and counter-clauses."
    max-width="xl"
  >
    <div class="space-y-4 pt-2">
      <!-- Watermark Notice for Free Tier -->
      <div
        v-if="!isPro"
        class="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs"
      >
        <div class="flex items-center gap-2 text-amber-800">
          <Lock class="w-4 h-4 text-amber-600 shrink-0" />
          <span>Free Tier exports include ClauseGuard evaluation watermark.</span>
        </div>
        <Button
          variant="amber"
          size="sm"
          @click="emit('unlock')"
          class="h-7 text-[11px]"
        >
          <span>Unlock Clean PDF / MD</span>
        </Button>
      </div>

      <!-- Markdown Preview Box -->
      <div class="relative rounded-lg border border-parchment-200 bg-parchment-50 p-4 max-h-72 overflow-y-auto custom-scrollbar font-mono-code text-xs text-ink-primary whitespace-pre-wrap leading-relaxed">
        {{ markdownContent }}
      </div>

      <!-- Action Buttons Toolbar -->
      <div class="flex items-center justify-between gap-3 pt-3 border-t border-parchment-100 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          @click="copy(markdownContent)"
        >
          <Check v-if="copied" class="w-4 h-4 text-emerald-600" />
          <Copy v-else class="w-4 h-4 text-ink-secondary" />
          <span>{{ copied ? 'Copied Markdown' : 'Copy Raw Markdown' }}</span>
        </Button>

        <div class="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            @click="handlePrint"
          >
            <Printer class="w-4 h-4" />
            <span>Print Report</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            @click="downloadMarkdown"
          >
            <Download class="w-4 h-4 text-white" />
            <span>Download .MD Report</span>
          </Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>
