<script setup lang="ts">
import { computed } from 'vue';
import {
  Sparkles,
  RotateCcw,
  FileCheck2,
  AlertCircle
} from 'lucide-vue-next';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';
import SampleContractSelector from './SampleContractSelector.vue';
import type { SampleContract } from '~/server/data/sampleContracts';

interface Props {
  modelValue: string;
  title: string;
  contractType: string;
  isAnalyzing: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'update:title', val: string): void;
  (e: 'update:contractType', val: string): void;
  (e: 'analyze'): void;
  (e: 'clear'): void;
  (e: 'load-sample', sample: SampleContract): void;
}>();

const characterCount = computed(() => props.modelValue.length);
const wordCount = computed(() => (props.modelValue.trim() ? props.modelValue.trim().split(/\s+/).length : 0));
const lineCount = computed(() => (props.modelValue ? props.modelValue.split('\n').length : 1));
const isMinimumMet = computed(() => characterCount.value >= 100);

const contractTypeOptions = [
  { value: 'msa', label: 'Master Services Agreement (MSA)' },
  { value: 'sow', label: 'Statement of Work (SOW)' },
  { value: 'retainer', label: 'Consulting Retainer' },
  { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
  { value: 'custom', label: 'Custom Contract' }
];

function handleTextareaInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="flex flex-col h-full bg-white rounded-xl border border-parchment-200 shadow-card overflow-hidden">
    <!-- Header Toolbar -->
    <div class="p-4 border-b border-parchment-200 bg-parchment-50/60 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3 flex-wrap">
        <SampleContractSelector
          :selected-title="title"
          @select="(sample) => emit('load-sample', sample)"
        />

        <select
          :value="contractType"
          @change="(e) => emit('update:contractType', (e.target as HTMLSelectElement).value)"
          class="text-xs bg-white border border-parchment-200 rounded-md px-2.5 py-1.5 text-ink-primary font-medium outline-none focus:border-maritime-500 shadow-sm"
        >
          <option v-for="opt in contractTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <Button
          v-if="modelValue.length > 0"
          variant="ghost"
          size="sm"
          @click="emit('clear')"
          title="Clear editor text"
        >
          <RotateCcw class="w-3.5 h-3.5 text-ink-muted" />
          <span class="text-xs">Clear</span>
        </Button>
      </div>
    </div>

    <!-- Contract Title Input Well -->
    <div class="px-4 py-2.5 border-b border-parchment-100 bg-white">
      <input
        type="text"
        :value="title"
        @input="(e) => emit('update:title', (e.target as HTMLInputElement).value)"
        placeholder="Contract Title (e.g. Acme Enterprise Cloud MSA)"
        class="w-full text-sm font-semibold text-ink-primary placeholder:text-ink-muted outline-none bg-transparent"
      />
    </div>

    <!-- Textarea Workspace -->
    <div class="relative flex-1 min-h-[380px] p-4 bg-white flex flex-col">
      <textarea
        :value="modelValue"
        @input="handleTextareaInput"
        placeholder="Paste your client agreement, statement of work, or retainer contract text here (minimum 100 characters) to analyze legal risks and generate protective counter-clauses..."
        class="w-full flex-1 resize-none font-mono-code text-xs leading-relaxed text-ink-primary placeholder:text-ink-muted placeholder:font-sans outline-none custom-scrollbar"
        spellcheck="false"
      />
    </div>

    <!-- Footer Stats & CTA Toolbar -->
    <div class="p-4 border-t border-parchment-200 bg-parchment-50/80 flex flex-wrap items-center justify-between gap-3">
      <!-- Word / Character Badges -->
      <div class="flex items-center gap-3 text-xs text-ink-secondary">
        <div class="flex items-center gap-1.5 font-mono-code">
          <span class="text-ink-primary font-semibold">{{ wordCount }}</span>
          <span class="text-ink-muted">words</span>
        </div>
        <span class="text-parchment-300">•</span>
        <div class="flex items-center gap-1.5 font-mono-code">
          <span class="text-ink-primary font-semibold">{{ characterCount }}</span>
          <span class="text-ink-muted">characters</span>
        </div>
        <span class="text-parchment-300">•</span>
        <div class="flex items-center gap-1.5 font-mono-code">
          <span class="text-ink-primary font-semibold">{{ lineCount }}</span>
          <span class="text-ink-muted">lines</span>
        </div>

        <Badge
          v-if="!isMinimumMet && characterCount > 0"
          variant="warning"
          class="ml-2"
        >
          <AlertCircle class="w-3 h-3 mr-1 text-amber-600" />
          <span>Needs 100+ chars</span>
        </Badge>
        <Badge
          v-else-if="isMinimumMet"
          variant="safe"
          class="ml-2"
        >
          <FileCheck2 class="w-3 h-3 mr-1 text-emerald-600" />
          <span>Ready to Audit</span>
        </Badge>
      </div>

      <!-- Action Button -->
      <Button
        variant="primary"
        size="md"
        :loading="isAnalyzing"
        :disabled="!isMinimumMet || isAnalyzing"
        @click="emit('analyze')"
        class="shadow-sm"
      >
        <Sparkles class="w-4 h-4 text-white" />
        <span>Analyze Contract</span>
      </Button>
    </div>
  </div>
</template>
