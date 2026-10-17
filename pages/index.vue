<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  Sparkles,
  Download,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Scale
} from 'lucide-vue-next';
import ContractEditor from '~/components/audit/ContractEditor.vue';
import HealthScoreCard from '~/components/audit/HealthScoreCard.vue';
import ThreatVectorList from '~/components/audit/ThreatVectorList.vue';
import OverrunCalculatorWidget from '~/components/audit/OverrunCalculatorWidget.vue';
import ExportModal from '~/components/audit/ExportModal.vue';
import UpgradeModal from '~/components/billing/UpgradeModal.vue';
import PricingTable from '~/components/billing/PricingTable.vue';
import Button from '~/components/ui/Button.vue';
import Badge from '~/components/ui/Badge.vue';
import { useClauseGuard } from '~/composables/useClauseGuard';
import { useBilling } from '~/composables/useBilling';
import { SAMPLE_CONTRACTS } from '~/server/data/sampleContracts';

const route = useRoute();
const {
  rawText,
  contractTitle,
  contractType,
  isAnalyzing,
  auditResult,
  analyzeContract,
  loadSampleContract,
  resetEditor,
  generateMarkdownReport
} = useClauseGuard();

const {
  tier,
  usageCount,
  quotaLimit,
  isPro,
  isSandbox,
  isUpgradeModalOpen,
  isLoading: isBillingLoading,
  bannerMessage,
  fetchTier,
  initiateCheckout,
  toggleSandboxTier,
  openUpgradeModal
} = useBilling();

const activeSection = ref<'auditor' | 'overrun' | 'pricing'>('auditor');
const isExportModalOpen = ref<boolean>(false);
const exportMarkdown = ref<string>('');

onMounted(async () => {
  await fetchTier();

  // If URL has sandbox_success=true, flip to Pro
  if (route.query.sandbox_success === 'true') {
    tier.value = 'PRO';
    quotaLimit.value = 999999;
    bannerMessage.value = 'Simulated Pro Plan activated. All protective counter-clauses and exports are now unlocked.';
  }

  // Pre-load default sample if empty
  if (!rawText.value) {
    loadSampleContract(SAMPLE_CONTRACTS[0]);
  }
});

function handleOpenExport() {
  exportMarkdown.value = generateMarkdownReport();
  isExportModalOpen.value = true;
}

function handleLoadSampleFromCard(sample: any) {
  loadSampleContract(sample);
  activeSection.value = 'auditor';
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top System Notice Banner (if any) -->
    <div
      v-if="bannerMessage"
      class="rounded-xl border border-maritime-200 bg-maritime-50/80 p-4 flex items-center justify-between gap-3 text-xs text-maritime-900 transition-all shadow-sm"
    >
      <div class="flex items-center gap-2.5">
        <Sparkles class="w-4 h-4 text-maritime-600 shrink-0" />
        <span class="font-medium">{{ bannerMessage }}</span>
      </div>
      <button
        type="button"
        @click="bannerMessage = null"
        class="text-[11px] font-semibold text-maritime-700 hover:text-maritime-900 uppercase tracking-wider"
      >
        Dismiss
      </button>
    </div>

    <!-- Section Navigation Switcher for Mobile & Tablet -->
    <div class="flex md:hidden items-center justify-center p-1 bg-parchment-100 rounded-lg border border-parchment-200">
      <button
        type="button"
        @click="activeSection = 'auditor'"
        :class="[
          'flex-1 py-1.5 text-xs font-medium rounded-md transition-all',
          activeSection === 'auditor' ? 'bg-white text-ink-primary shadow-sm' : 'text-ink-secondary'
        ]"
      >
        Auditor
      </button>
      <button
        type="button"
        @click="activeSection = 'overrun'"
        :class="[
          'flex-1 py-1.5 text-xs font-medium rounded-md transition-all',
          activeSection === 'overrun' ? 'bg-white text-ink-primary shadow-sm' : 'text-ink-secondary'
        ]"
      >
        Overrun Calc
      </button>
      <button
        type="button"
        @click="activeSection = 'pricing'"
        :class="[
          'flex-1 py-1.5 text-xs font-medium rounded-md transition-all',
          activeSection === 'pricing' ? 'bg-white text-ink-primary shadow-sm' : 'text-ink-secondary'
        ]"
      >
        Pricing
      </button>
    </div>

    <!-- SECTION 1: CONTRACT AUDITOR WORKSPACE -->
    <div v-if="activeSection === 'auditor'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Column: Contract Text Editor (5 of 12 cols) -->
      <div class="lg:col-span-5 h-[680px]">
        <ContractEditor
          :model-value="rawText"
          @update:model-value="(val) => rawText = val"
          :title="contractTitle"
          @update:title="(val) => contractTitle = val"
          :contract-type="contractType"
          @update:contract-type="(val) => contractType = val"
          :is-analyzing="isAnalyzing"
          @analyze="analyzeContract"
          @clear="resetEditor"
          @load-sample="loadSampleContract"
        />
      </div>

      <!-- Right Column: Audit Findings & Redlines (7 of 12 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Audit Results Active View -->
        <template v-if="auditResult">
          <!-- Top Results Bar -->
          <div class="flex items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-parchment-200 shadow-sm flex-wrap">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-ink-primary truncate max-w-xs sm:max-w-md">
                {{ auditResult.title }}
              </span>
              <Badge variant="pro" size="sm">
                {{ auditResult.contractType.toUpperCase() }}
              </Badge>
            </div>

            <div class="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                @click="handleOpenExport"
                class="h-8 text-xs"
              >
                <Download class="w-3.5 h-3.5 text-maritime-600 mr-1.5" />
                <span>Export Redlines</span>
              </Button>
            </div>
          </div>

          <!-- Overall Health Scorecard Gauge -->
          <HealthScoreCard
            :score="auditResult.protectionIndex"
            :risk-level="auditResult.riskLevel"
            :critical-count="auditResult.summary.criticalCount"
            :warning-count="auditResult.summary.warningCount"
            :safe-count="auditResult.summary.safeCount"
            :character-count="auditResult.characterCount"
            :word-count="auditResult.wordCount"
          />

          <!-- 5-Vector Risk Breakdown Accordion -->
          <ThreatVectorList
            :vector-breakdown="auditResult.vectorBreakdown"
            :is-pro="isPro"
            @unlock="openUpgradeModal"
          />

          <!-- Scope Overrun Calculator Mini Widget -->
          <OverrunCalculatorWidget
            :is-pro="isPro"
            @unlock="openUpgradeModal"
          />
        </template>

        <!-- Initial Welcome / Empty State (Prior to running first scan) -->
        <template v-else>
          <div class="rounded-xl border border-parchment-200 bg-white p-6 md:p-8 shadow-card space-y-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <Badge variant="pro" size="md">Autonomous Threat Detection</Badge>
                <span class="text-xs text-ink-muted font-mono-code">25+ Rules Engine</span>
              </div>
              <h2 class="text-xl md:text-2xl font-serif-title text-ink-primary font-normal tracking-tight">
                Inspect Toxic Contract Terms in Milliseconds
              </h2>
              <p class="text-xs md:text-sm text-ink-secondary leading-relaxed">
                Paste your client agreement or choose one of the pre-loaded templates below to test our deterministic risk engine across 5 commercial threat vectors.
              </p>
            </div>

            <!-- 4 Preset Sample Agreement Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                v-for="sample in SAMPLE_CONTRACTS"
                :key="sample.id"
                @click="handleLoadSampleFromCard(sample)"
                class="group p-4 rounded-xl border border-parchment-200 bg-parchment-50/50 hover:bg-white hover:border-maritime-300 hover:shadow-card transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-ink-primary group-hover:text-maritime-700 transition-colors">
                      {{ sample.category }}
                    </span>
                    <Badge
                      :variant="sample.simulatedRiskLevel === 'CRITICAL' ? 'critical' : 'warning'"
                      size="sm"
                    >
                      {{ sample.simulatedRiskLevel === 'CRITICAL' ? 'Critical' : 'Warning' }}
                    </Badge>
                  </div>
                  <p class="text-[11px] text-ink-secondary leading-normal line-clamp-2 mb-3">
                    {{ sample.description }}
                  </p>
                </div>
                <div class="flex items-center justify-between text-[10px] text-ink-muted border-t border-parchment-200/60 pt-2 font-mono-code">
                  <span>{{ sample.wordCount }} words</span>
                  <span class="text-maritime-600 font-semibold group-hover:underline flex items-center gap-1 font-sans">
                    Load & Audit
                    <ArrowRight class="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            <!-- Quantified ROI Summary Strip -->
            <div class="rounded-xl border border-parchment-200 bg-parchment-100/50 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-base font-bold font-mono-code text-ink-primary">$2,775</div>
                <div class="text-[10px] text-ink-muted">Avg. Scope Creep Recaptured</div>
              </div>
              <div class="border-t sm:border-t-0 sm:border-l border-parchment-200 pt-2 sm:pt-0">
                <div class="text-base font-bold font-mono-code text-ink-primary">15ms</div>
                <div class="text-[10px] text-ink-muted">Deterministic Scan Latency</div>
              </div>
              <div class="border-t sm:border-t-0 sm:border-l border-parchment-200 pt-2 sm:pt-0">
                <div class="text-base font-bold font-mono-code text-emerald-700">100% Private</div>
                <div class="text-[10px] text-ink-muted">Zero External Model Training</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- SECTION 2: STANDALONE SCOPE OVERRUN CALCULATOR -->
    <div v-else-if="activeSection === 'overrun'" class="max-w-4xl mx-auto space-y-6">
      <OverrunCalculatorWidget
        :is-pro="isPro"
        @unlock="openUpgradeModal"
      />
    </div>

    <!-- SECTION 3: COMMERCIAL PRICING & PRO -->
    <div v-else-if="activeSection === 'pricing'" class="max-w-5xl mx-auto space-y-6">
      <PricingTable
        :current-tier="tier"
        :is-sandbox="isSandbox"
        :is-loading="isBillingLoading"
        @checkout="initiateCheckout"
        @simulate-pro="toggleSandboxTier"
      />
    </div>

    <!-- MODALS -->
    <!-- Upgrade Modal (Dialog) -->
    <UpgradeModal
      :open="isUpgradeModalOpen"
      @update:open="(val) => isUpgradeModalOpen = val"
      :tier="tier"
      :usage-count="usageCount"
      :quota-limit="quotaLimit"
      :is-sandbox="isSandbox"
      :is-loading="isBillingLoading"
      @checkout="initiateCheckout"
      @simulate-pro="toggleSandboxTier"
    />

    <!-- Export Modal (Dialog) -->
    <ExportModal
      :open="isExportModalOpen"
      @update:open="(val) => isExportModalOpen = val"
      :markdown-content="exportMarkdown"
      :is-pro="isPro"
      :contract-title="contractTitle"
      @unlock="openUpgradeModal"
    />
  </div>
</template>
