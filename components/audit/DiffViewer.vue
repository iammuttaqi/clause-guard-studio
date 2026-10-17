<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Check, GitCommitHorizontal } from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';
import { useClipboard } from '@vueuse/core';

interface Props {
  originalText: string;
  counterText: string;
  diffHtml?: string;
  additions?: number;
  deletions?: number;
}

const props = withDefaults(defineProps<Props>(), {
  additions: 0,
  deletions: 0
});

const { copy, copied } = useClipboard({ copiedDuring: 2000 });

function handleCopy() {
  copy(props.counterText);
}
</script>

<template>
  <div class="rounded-lg border border-parchment-200 bg-white overflow-hidden shadow-sm">
    <!-- Diff Header Toolbar -->
    <div class="p-3 bg-parchment-50 border-b border-parchment-200 flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <GitCommitHorizontal class="w-4 h-4 text-maritime-600 shrink-0" />
        <span class="text-xs font-semibold text-ink-primary">Redline Revision Comparison</span>
        <Badge variant="critical" size="sm">-{{ deletions }} terms</Badge>
        <Badge variant="safe" size="sm">+{{ additions }} safeguards</Badge>
      </div>

      <Button
        variant="outline"
        size="sm"
        @click="handleCopy"
        class="h-7 text-[11px]"
      >
        <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-600" />
        <Copy v-else class="w-3.5 h-3.5 text-ink-secondary" />
        <span>{{ copied ? 'Copied Redline' : 'Copy Counter-Clause' }}</span>
      </Button>
    </div>

    <!-- Highlighted Diff Container -->
    <div class="p-4">
      <div v-if="diffHtml" v-html="diffHtml" />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono-code text-xs leading-relaxed">
        <div class="p-3 bg-crimson-50/50 rounded border border-crimson-200/60">
          <span class="block text-[10px] font-semibold text-crimson-700 uppercase tracking-wider mb-1">
            Original Predatory Clause
          </span>
          <p class="text-ink-secondary line-through decoration-crimson-400">
            {{ originalText }}
          </p>
        </div>
        <div class="p-3 bg-emerald-50/50 rounded border border-emerald-200/60">
          <span class="block text-[10px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            Proposed Protective Revision
          </span>
          <p class="text-ink-primary font-medium">
            {{ counterText }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
