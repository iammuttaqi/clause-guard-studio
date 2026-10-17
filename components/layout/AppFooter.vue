<script setup lang="ts">
import { Shield, Lock, FileCheck2, Github } from 'lucide-vue-next';
</script>

<template>
  <footer class="w-full border-t border-parchment-200 bg-white py-12 mt-20 text-xs text-ink-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Studio Brand Overview -->
        <div class="md:col-span-2 space-y-3">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-ink-primary flex items-center justify-center text-white">
              <Shield class="w-3.5 h-3.5 text-maritime-400" />
            </div>
            <span class="font-serif-title font-bold text-base text-ink-primary">
              ClauseGuard Studio
            </span>
          </div>
          <p class="text-xs text-ink-secondary leading-relaxed max-w-md">
            Privacy-first contract risk auditor, toxic clause redliner, and protective counter-clause generator engineered for independent software engineers, consultants, and boutique agencies.
          </p>
          <div class="flex items-center gap-3 pt-2 text-[11px] text-ink-muted">
            <span class="inline-flex items-center gap-1">
              <Lock class="w-3 h-3 text-emerald-600" />
              <span>Zero-Telemetry Lexical Scanning</span>
            </span>
            <span>•</span>
            <span class="inline-flex items-center gap-1">
              <FileCheck2 class="w-3 h-3 text-maritime-600" />
              <span>Standards 4.0 Studio Architecture</span>
            </span>
          </div>
        </div>

        <!-- 5 Risk Vectors Covered -->
        <div class="space-y-2">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-ink-primary">
            Threat Vectors Covered
          </h4>
          <ul class="space-y-1.5 text-[11px] text-ink-secondary">
            <li>Unlimited Liability & Indemnity</li>
            <li>Scope Creep & Vague Acceptance</li>
            <li>Extended Net-60/90 Payment Lag</li>
            <li>Premature IP Assignment Traps</li>
            <li>Non-Compete & Restrictive Covenants</li>
          </ul>
        </div>

        <!-- Commercial Terms & Guarantees -->
        <div class="space-y-2">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-ink-primary">
            Commercial Packaging
          </h4>
          <ul class="space-y-1.5 text-[11px] text-ink-secondary">
            <li>Free Starter (3 scans / month)</li>
            <li>Pro Monthly ($29 / month)</li>
            <li>Founder Lifetime Deal ($79 one-time)</li>
            <li>Interactive Sandbox Mode</li>
            <li>Watermark-Free PDF & Markdown</li>
          </ul>
        </div>
      </div>

      <!-- Legal Disclaimer & Copyright -->
      <div class="pt-6 border-t border-parchment-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-muted">
        <p class="leading-relaxed max-w-3xl">
          <strong>Commercial Legal Disclaimer:</strong> ClauseGuard Studio operates via deterministic heuristics, pattern matching, and commercial contract benchmarks. Findings and counter-clauses constitute business risk guidance and negotiation templates, not formal legal advice or an attorney-client relationship. Consult qualified legal counsel for high-stakes litigation matters.
        </p>
        <div class="shrink-0 text-right">
          <span>&copy; {{ new Date().getFullYear() }} ClauseGuard Studio. Version 1.0.0</span>
        </div>
      </div>
    </div>
  </footer>
</template>
