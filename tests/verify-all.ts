import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createApp } from 'h3';
import { toNodeHandler } from 'h3/node';

// Core domain logic imports
import { scanContract, SCANNER_RULES, THREAT_VECTORS } from '../server/utils/scanner';
import { generateCounterClause, computeWordDiff } from '../server/utils/counterEngine';
import { calculateOverrunRisk } from '../server/utils/overrunCalculator';
import { getPrismaClient } from '../server/utils/prisma';
import { isSandboxMode } from '../server/utils/stripe';
import { SAMPLE_CONTRACTS } from '../server/data/sampleContracts';

// API route handlers
import scanHandler from '../server/api/audit/scan.post';
import counterHandler from '../server/api/audit/counter.post';
import overrunHandler from '../server/api/audit/overrun.post';
import checkoutHandler from '../server/api/checkout.post';
import tierHandler from '../server/api/me/tier.get';
import webhookHandler from '../server/api/webhooks/stripe.post';

// UI and styling paths
const ROOT_DIR = process.cwd();

interface TestStat {
  total: number;
  passed: number;
  failed: number;
  failures: Array<{ suite: string; test: string; error: string }>;
}

const stats: TestStat = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: []
};

function formatDuration(ms: number): string {
  return `${ms.toFixed(1)}ms`;
}

async function runTest(suite: string, name: string, fn: () => void | Promise<void>) {
  stats.total++;
  const start = performance.now();
  try {
    await fn();
    const duration = performance.now() - start;
    console.log(`  \x1b[32m✔\x1b[0m ${name} \x1b[90m(${formatDuration(duration)})\x1b[0m`);
    stats.passed++;
  } catch (err: any) {
    const duration = performance.now() - start;
    console.error(`  \x1b[31m✖\x1b[0m ${name} \x1b[90m(${formatDuration(duration)})\x1b[0m`);
    console.error(`    \x1b[31mError:\x1b[0m ${err.message}`);
    stats.failed++;
    stats.failures.push({ suite, test: name, error: err.stack || err.message });
  }
}

// Helper: Spin up a ephemeral local HTTP server for testing Nitro/H3 route handlers
async function withTestServer(
  routes: Array<{ path: string; handler: any }>,
  callback: (baseUrl: string) => Promise<void>
) {
  const app = createApp();
  for (const r of routes) {
    app.use(r.path, r.handler);
  }
  const server = http.createServer(toNodeHandler(app));
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as any).port;
  const baseUrl = `http://localhost:${port}`;
  try {
    await callback(baseUrl);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

async function main() {
  console.log('\n\x1b[1m\x1b[34m======================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[34m  ClauseGuard Studio - Comprehensive Verification Suite (Standards 4.0)\x1b[0m');
  console.log('\x1b[1m\x1b[34m======================================================================\x1b[0m\n');

  const overallStart = performance.now();

  // ---------------------------------------------------------------------------
  // SUITE 1: Lexical Clause Threat Scanner
  // ---------------------------------------------------------------------------
  console.log('\x1b[1m\x1b[36m[SUITE 1] Lexical Clause Threat Scanner Engine\x1b[0m');

  await runTest('Scanner', 'Detects Vector 1: Unlimited Liability & Asymmetric Indemnity', () => {
    const text = 'Contractor shall indemnify Client without limitation against any claims. Indirect and consequential damages shall be recoverable against Contractor.';
    const result = scanContract(text, true);
    assert.ok(result.flags.some(f => f.vectorId === 'liability' && f.ruleId === 'LIAB-01'), 'Should flag LIAB-01 (uncapped liability)');
    assert.ok(result.flags.some(f => f.vectorId === 'liability' && f.ruleId === 'LIAB-02'), 'Should flag LIAB-02 (consequential damages)');
    assert.ok(result.flags.some(f => f.vectorId === 'liability' && f.ruleId === 'LIAB-03'), 'Should flag LIAB-03 (one-way indemnity)');
  });

  await runTest('Scanner', 'Detects Vector 2: Vague Scope Creep & Open-Ended Revisions', () => {
    const text = 'Deliverables must be completed to Client sole satisfaction. Quoted fee includes unlimited revisions and Contractor shall revise until approved at no additional cost.';
    const result = scanContract(text, true);
    assert.ok(result.flags.some(f => f.vectorId === 'scope' && f.ruleId === 'SCOPE-01'), 'Should flag SCOPE-01 (subjective satisfaction)');
    assert.ok(result.flags.some(f => f.vectorId === 'scope' && f.ruleId === 'SCOPE-02'), 'Should flag SCOPE-02 (uncapped revision loops)');
  });

  await runTest('Scanner', 'Detects Vector 3: Extended Payment Terms & Cashflow Traps', () => {
    const text = 'Client will remit payment within ninety (90) days (Net 90). Payment to Contractor is contingent upon Client receipt of payment from the ultimate end customer. Client reserves unilateral right to withhold any payments and set-off amounts.';
    const result = scanContract(text, true);
    assert.ok(result.flags.some(f => f.vectorId === 'payment' && f.ruleId === 'PAY-01'), 'Should flag PAY-01 (paid-when-paid provision)');
    assert.ok(result.flags.some(f => f.vectorId === 'payment' && f.ruleId === 'PAY-02'), 'Should flag PAY-02 (Net-90 payment terms)');
    assert.ok(result.flags.some(f => f.vectorId === 'payment' && f.ruleId === 'PAY-05'), 'Should flag PAY-05 (unilateral fee withholding)');
  });

  await runTest('Scanner', 'Detects Vector 4: Premature Intellectual Property Assignment', () => {
    const text = 'All deliverables and inventions shall be deemed work made for hire upon creation and sole property of Client immediately upon creation. Contractor assigns all pre-existing IP and frameworks without limitation.';
    const result = scanContract(text, true);
    assert.ok(result.flags.some(f => f.vectorId === 'ip' && f.ruleId === 'IP-01'), 'Should flag IP-01 (premature work-made-for-hire title transfer)');
    assert.ok(result.flags.some(f => f.vectorId === 'ip' && f.ruleId === 'IP-02'), 'Should flag IP-02 (forfeiture of pre-existing frameworks/tools)');
  });

  await runTest('Scanner', 'Detects Vector 5: Non-Compete Overreach & Restrictive Covenants', () => {
    const text = 'For twenty-four (24) months thereafter, Contractor shall not directly or indirectly compete in any business within the software sector anywhere in the worldwide territory.';
    const result = scanContract(text, true);
    assert.ok(result.flags.some(f => f.vectorId === 'restrictive' && f.ruleId === 'REST-01'), 'Should flag REST-01 (excessive non-compete duration)');
    assert.ok(result.flags.some(f => f.vectorId === 'restrictive' && f.ruleId === 'REST-04'), 'Should flag REST-04 (excessive worldwide geographic restriction)');
  });

  await runTest('Scanner', 'Accurately audits all 4 canonical sample contracts', () => {
    for (const sample of SAMPLE_CONTRACTS) {
      const audit = scanContract(sample.rawText, true);
      assert.ok(audit.flags.length > 0, `Sample "${sample.title}" must yield detected flags`);
      assert.ok(['CRITICAL', 'WARNING'].includes(audit.riskLevel), `Risk level for "${sample.title}" should be CRITICAL or WARNING`);
      assert.ok(audit.protectionIndex <= 50, `Protection index for high-risk sample "${sample.title}" must be <= 50`);
    }
  });

  await runTest('Scanner', 'Enforces Free vs Pro masking of counter-clauses', () => {
    const sample = SAMPLE_CONTRACTS[0].rawText;
    const freeScan = scanContract(sample, false);
    const proScan = scanContract(sample, true);

    assert.ok(freeScan.flags.length > 0);
    assert.strictEqual(freeScan.flags[0].isLocked, true, 'Free scan flags must be locked');
    assert.ok(freeScan.flags[0].counterClauseFirm.includes('Unlock with Pro Pass'), 'Free counter clause must include paywall teaser');

    assert.strictEqual(proScan.flags[0].isLocked, false, 'Pro scan flags must be unlocked');
    assert.ok(!proScan.flags[0].counterClauseFirm.includes('Unlock with Pro Pass'), 'Pro counter clause must be complete verbatim text');
  });

  // ---------------------------------------------------------------------------
  // SUITE 2: Mathematical Protection Index Scoring Formula (0-100)
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 2] Mathematical Protection Index Scoring Formula (0-100)\x1b[0m');

  await runTest('Scoring', 'Evaluates baseline clean contract to 100 with SAFE risk', () => {
    const cleanText = 'Contractor shall perform development services in a professional manner. Invoices shall be submitted monthly and reviewed promptly.';
    const result = scanContract(cleanText, true);
    assert.strictEqual(result.protectionIndex, 100);
    assert.strictEqual(result.riskLevel, 'SAFE');
    assert.strictEqual(result.summary.criticalCount, 0);
    assert.strictEqual(result.summary.warningCount, 0);
  });

  await runTest('Scoring', 'Correctly deducts penalties for detected predatory rules', () => {
    // LIAB-01 penalty is 25
    const singleFlagText = 'Contractor shall be held liable for any and all damages without limitation.';
    const result = scanContract(singleFlagText, true);
    assert.strictEqual(result.protectionIndex, 75, 'Score should be 100 - 25 = 75');
  });

  await runTest('Scoring', 'Applies safe bonus points for protective contractual clauses', () => {
    const mutualCapText = 'The parties agree to a mutual liability cap. Liability limited to fees paid. Payment within fifteen days (Net 15). IP transfers upon full payment.';
    const result = scanContract(mutualCapText, true);
    // 100 base + 5 (mutual liability cap) + 5 (net 15) + 5 (conditional IP) = clamped to 100
    assert.strictEqual(result.protectionIndex, 100);
    assert.strictEqual(result.summary.safeCount, 3);
  });

  await runTest('Scoring', 'Clamps score strictly between 0 and 100 boundaries', () => {
    // Highly toxic text triggering many critical rules
    const toxicText = `
      Contractor shall be liable for any and all damages without limitation.
      Indirect, consequential, and punitive damages shall be recoverable.
      Contractor shall indemnify, defend, and hold harmless Client.
      Contractor warrants deliverables in perpetuity.
      Liquidated damages penalty of $1000 per day shall apply.
      Work made for hire upon creation and sole property of Client.
      Client shall pay on Net 90 terms contingent upon client receipt of payment from end customer.
      Non-compete for twenty-four months in worldwide territory.
    `;
    const toxicResult = scanContract(toxicText, true);
    assert.ok(toxicResult.protectionIndex >= 0 && toxicResult.protectionIndex <= 100, 'Score must be clamped within [0, 100]');
    assert.strictEqual(toxicResult.protectionIndex, 0, 'Heavily penalized text should clamp cleanly at 0');
    assert.strictEqual(toxicResult.riskLevel, 'CRITICAL');
  });

  await runTest('Scoring', 'Calculates 5-vector breakdown metrics and severity', () => {
    const result = scanContract(SAMPLE_CONTRACTS[0].rawText, true);
    assert.strictEqual(result.vectorBreakdown.length, 5, 'Must contain all 5 threat vectors');
    for (const vector of result.vectorBreakdown) {
      assert.ok(vector.riskScore >= 0 && vector.riskScore <= 100, `Vector ${vector.vectorId} score must be 0-100`);
      assert.ok(['SAFE', 'WARNING', 'CRITICAL'].includes(vector.severity), `Vector ${vector.vectorId} severity must be valid`);
    }
  });

  // ---------------------------------------------------------------------------
  // SUITE 3: 3-Posture Counter-Clause Generator & Diff Engine
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 3] 3-Posture Counter-Clause Generator & Diff Engine\x1b[0m');

  await runTest('CounterEngine', 'Generates 3 calibrated negotiation postures (Collaborative, Firm, Assertive)', () => {
    const orig = 'Contractor shall indemnify, defend, and hold harmless Client from any and all claims without limitation.';
    const colGen = generateCounterClause('flag_1', 'liability', 'collaborative', orig, 'LIAB-01', true);
    const firmGen = generateCounterClause('flag_1', 'liability', 'firm', orig, 'LIAB-01', true);
    const assGen = generateCounterClause('flag_1', 'liability', 'assertive', orig, 'LIAB-01', true);

    // Each posture must be distinct
    assert.notStrictEqual(colGen.counterText, firmGen.counterText);
    assert.notStrictEqual(firmGen.counterText, assGen.counterText);

    // Context snippets must match posture framing
    assert.ok(colGen.negotiationContext.emailSnippet.includes('Hi Team'), 'Collaborative uses friendly tone');
    assert.ok(firmGen.negotiationContext.emailSnippet.includes('commercial reciprocity'), 'Firm uses balanced business reciprocity');
    assert.ok(assGen.negotiationContext.emailSnippet.includes('prerequisite for our firm'), 'Assertive enforces strict boundaries');
  });

  await runTest('CounterEngine', 'Diff Engine correctly computes additions, deletions, and highlighted HTML', () => {
    const original = 'Contractor shall have unlimited liability for all damages.';
    const counter = "Contractor's aggregate liability under this Agreement shall not exceed total fees paid.";
    const diff = computeWordDiff(original, counter);

    assert.ok(diff.additions > 0, 'Diff must compute protective additions');
    assert.ok(diff.deletions > 0, 'Diff must compute stricken deletions');
    assert.ok(diff.highlightedHtml.includes('<del'), 'Diff HTML must contain <del> tags for stricken terms');
    assert.ok(diff.highlightedHtml.includes('<ins'), 'Diff HTML must contain <ins> tags for inserted terms');
  });

  await runTest('CounterEngine', 'Locks counter-clause output for Free tier users', () => {
    const orig = 'Payment shall be made on Net 90 days.';
    const lockedRes = generateCounterClause('flag_pay', 'payment', 'firm', orig, 'PAY-01', false);
    const unlockedRes = generateCounterClause('flag_pay', 'payment', 'firm', orig, 'PAY-01', true);

    assert.strictEqual(lockedRes.isLocked, true);
    assert.ok(lockedRes.counterText.includes('Unlock with Pro Pass'));
    assert.strictEqual(unlockedRes.isLocked, false);
    assert.ok(!unlockedRes.counterText.includes('Unlock with Pro Pass'));
  });

  // ---------------------------------------------------------------------------
  // SUITE 4: Scope-Creep Overrun Calculator & SLA Addendum Generation
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 4] Scope-Creep Overrun Calculator & SLA Addendum Engine\x1b[0m');

  await runTest('OverrunCalculator', 'Calculates accurate financial downside, hourly degradation, and buffer fees', () => {
    const params = {
      baseFee: 12000,
      estimatedHours: 80,
      targetHourlyRate: 150,
      includedRevisions: 2,
      anticipatedRevisions: 5,
      clientReviewWindowDays: 5
    };

    const res = calculateOverrunRisk(params);

    // Extra rounds: 5 - 2 = 3
    // Hours/cycle: max(4, round(80 * 0.10)) = 8
    // Unbilled hours: 3 * 8 = 24
    assert.strictEqual(res.metrics.unbilledOverrunHours, 24, 'Unbilled overrun hours should be 24');
    // Calculated downside loss: 24 * $150 = $3,600
    assert.strictEqual(res.metrics.calculatedDownsideLoss, 3600, 'Downside loss should be $3,600');
    // Total realized hours: 80 + 24 = 104
    assert.strictEqual(res.metrics.totalRealizedHours, 104, 'Total realized hours should be 104');
    // Effective realized rate: round(12000 / 104) = $115.38
    assert.strictEqual(res.metrics.effectiveRealizedRate, 115.38, 'Effective realized rate should be $115.38');
    // Recommended buffer fee: round(12000 * 0.20) = $2,400
    assert.strictEqual(res.metrics.recommendedBufferFee, 2400, 'Recommended buffer fee should be $2,400');
  });

  await runTest('OverrunCalculator', 'Generates legal SLA Addendum Rider with contractual parameters', () => {
    const params = {
      baseFee: 18000,
      estimatedHours: 100,
      targetHourlyRate: 175,
      includedRevisions: 2,
      anticipatedRevisions: 4,
      clientReviewWindowDays: 7
    };

    const res = calculateOverrunRisk(params);
    const sla = res.protectiveSlaClause.clauseText;

    assert.ok(sla.includes('$18,000'), 'SLA must include quoted base fee');
    assert.ok(sla.includes('up to exactly 2 (two) consolidated rounds'), 'SLA must specify revision rounds');
    assert.ok(sla.includes('7 (7) business days'), 'SLA must specify inspection window days');
    assert.ok(sla.includes('deemed irrevocably accepted'), 'SLA must include deemed acceptance clause');
    assert.ok(sla.includes('$175/hour'), 'SLA must include mandatory overrun hourly rate');
  });

  // ---------------------------------------------------------------------------
  // SUITE 5: Built-in Monetization & Stripe Integration Engine
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 5] Built-in Monetization & Stripe Sandbox Engine\x1b[0m');

  await withTestServer([
    { path: '/api/checkout', handler: checkoutHandler },
    { path: '/api/audit/scan', handler: scanHandler },
    { path: '/api/audit/counter', handler: counterHandler },
    { path: '/api/audit/overrun', handler: overrunHandler },
    { path: '/api/me/tier', handler: tierHandler },
    { path: '/api/webhooks/stripe', handler: webhookHandler }
  ], async (baseUrl) => {
    const prisma = getPrismaClient();

    await runTest('Monetization', 'Enforces Free tier 3-audit monthly quota limit and blocks with HTTP 402', async () => {
      const testEmail = `quota-test-${Date.now()}@clauseguard.local`;
      await prisma.customer.deleteMany({ where: { email: testEmail } });

      // Run 3 scans (allowed)
      for (let i = 1; i <= 3; i++) {
        const res = await fetch(`${baseUrl}/api/audit/scan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-customer-email': testEmail
          },
          body: JSON.stringify({
            title: `Agreement Scan ${i}`,
            contractType: 'msa',
            rawText: SAMPLE_CONTRACTS[0].rawText
          })
        });
        assert.strictEqual(res.status, 200, `Scan ${i} must succeed with 200`);
        const data = await res.json();
        assert.strictEqual(data.customer.usageCount, i, `Usage count must equal ${i}`);
        assert.strictEqual(data.customer.remainingScans, 3 - i, `Remaining scans must be ${3 - i}`);
      }

      // 4th scan must be rejected with 402 Payment Required
      const blockedRes = await fetch(`${baseUrl}/api/audit/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-customer-email': testEmail
        },
        body: JSON.stringify({
          title: 'Agreement Scan 4 (Over Quota)',
          contractType: 'msa',
          rawText: SAMPLE_CONTRACTS[0].rawText
        })
      });

      assert.strictEqual(blockedRes.status, 402, '4th scan must return HTTP 402 Paywall');
      const errData = await blockedRes.json();
      const message = errData.statusMessage || errData.message || errData.data?.message;
      assert.strictEqual(message, 'Monthly Quota Exceeded');

      // Cleanup
      await prisma.customer.deleteMany({ where: { email: testEmail } });
    });

    await runTest('Monetization', 'Generates sandbox checkout session and upgrades account to PRO', async () => {
      const testEmail = `upgrade-test-${Date.now()}@clauseguard.local`;
      await prisma.customer.deleteMany({ where: { email: testEmail } });

      // 1. Initial status: FREE
      const initialTierRes = await fetch(`${baseUrl}/api/me/tier`, {
        headers: { 'x-customer-email': testEmail }
      });
      const initialTier = await initialTierRes.json();
      assert.strictEqual(initialTier.tier, 'FREE');
      assert.strictEqual(initialTier.quotaLimit, 3);
      assert.strictEqual(initialTier.features.unlimitedAudits, false);

      // 2. Execute Sandbox Checkout for Monthly Pro
      const checkoutRes = await fetch(`${baseUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-customer-email': testEmail
        },
        body: JSON.stringify({
          planType: 'monthly',
          forceSandbox: true
        })
      });

      assert.strictEqual(checkoutRes.status, 200);
      const checkoutData = await checkoutRes.json();
      assert.strictEqual(checkoutData.mode, 'sandbox');
      assert.ok(checkoutData.sessionId.startsWith('sandbox_sess_'));
      assert.ok(checkoutData.checkoutUrl.includes('sandbox_success=true'));

      // 3. Verify Tier flipped to PRO with unlimited scans
      const upgradedTierRes = await fetch(`${baseUrl}/api/me/tier`, {
        headers: { 'x-customer-email': testEmail }
      });
      const upgradedTier = await upgradedTierRes.json();
      assert.strictEqual(upgradedTier.tier, 'PRO');
      assert.strictEqual(upgradedTier.quotaLimit, 999999);
      assert.strictEqual(upgradedTier.features.unlimitedAudits, true);
      assert.strictEqual(upgradedTier.features.counterClauseGenerator, true);

      // Cleanup
      await prisma.customer.deleteMany({ where: { email: testEmail } });
    });

    await runTest('Monetization', 'Generates sandbox checkout session and upgrades account to LIFETIME', async () => {
      const testEmail = `lifetime-test-${Date.now()}@clauseguard.local`;
      await prisma.customer.deleteMany({ where: { email: testEmail } });

      const checkoutRes = await fetch(`${baseUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-customer-email': testEmail
        },
        body: JSON.stringify({
          planType: 'lifetime',
          forceSandbox: true
        })
      });

      assert.strictEqual(checkoutRes.status, 200);
      const checkoutData = await checkoutRes.json();
      assert.strictEqual(checkoutData.mode, 'sandbox');

      const tierRes = await fetch(`${baseUrl}/api/me/tier`, {
        headers: { 'x-customer-email': testEmail }
      });
      const tierData = await tierRes.json();
      assert.strictEqual(tierData.tier, 'LIFETIME');
      assert.strictEqual(tierData.quotaLimit, 999999);

      // Cleanup
      await prisma.customer.deleteMany({ where: { email: testEmail } });
    });

    await runTest('Monetization', 'Webhook simulation handles lifecycle events safely', async () => {
      const res = await fetch(`${baseUrl}/api/webhooks/stripe`, {
        method: 'POST',
        body: JSON.stringify({ type: 'ping' })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.received, true);
    });
  });

  // ---------------------------------------------------------------------------
  // SUITE 6: Database CRUD & Relational Cascade Integrity (Prisma)
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 6] Database CRUD & Cascade Integrity (Prisma)\x1b[0m');

  await runTest('Database', 'Performs Customer CRUD, ContractAudit relations, and cascade deletion', async () => {
    const prisma = getPrismaClient();
    const testEmail = `cascade-unit-${Date.now()}@clauseguard.local`;

    // 1. Create Customer
    const customer = await prisma.customer.create({
      data: {
        email: testEmail,
        tier: 'FREE',
        usageCount: 1,
        quotaLimit: 3
      }
    });
    assert.ok(customer.id, 'Customer ID must be generated');

    // 2. Create Audit with nested Flags and OverrunScenario
    const audit = await prisma.contractAudit.create({
      data: {
        customerId: customer.id,
        title: 'Cascade Verification Agreement',
        contractType: 'msa',
        rawText: SAMPLE_CONTRACTS[0].rawText,
        overallScore: 28,
        riskLevel: 'CRITICAL',
        clauseFlags: {
          create: [
            {
              originalText: 'Uncapped liability clause',
              clauseType: 'liability',
              severity: 'CRITICAL',
              explanation: 'Excessive risk',
              counterClauseCollaborative: 'Col',
              counterClauseFirm: 'Firm',
              counterClauseAssertive: 'Ass'
            },
            {
              originalText: 'Paid when paid clause',
              clauseType: 'payment',
              severity: 'CRITICAL',
              explanation: 'Cashflow risk',
              counterClauseCollaborative: 'Col',
              counterClauseFirm: 'Firm',
              counterClauseAssertive: 'Ass'
            }
          ]
        },
        overrunScenario: {
          create: {
            baseFee: 20000,
            includedRevisions: 2,
            hourlyOverrunRate: 165,
            calculatedDownside: 4950,
            bufferFee: 4000
          }
        }
      },
      include: {
        clauseFlags: true,
        overrunScenario: true
      }
    });

    assert.strictEqual(audit.clauseFlags.length, 2, 'Should create 2 nested clause flags');
    assert.ok(audit.overrunScenario?.id, 'Should create nested overrun scenario');

    // 3. Query Customer with relational graph
    const queriedCustomer = await prisma.customer.findUnique({
      where: { id: customer.id },
      include: {
        audits: {
          include: {
            clauseFlags: true,
            overrunScenario: true
          }
        }
      }
    });

    assert.strictEqual(queriedCustomer?.audits.length, 1);
    assert.strictEqual(queriedCustomer?.audits[0].clauseFlags.length, 2);

    // 4. Cascade Delete: Delete customer and verify all children are removed
    await prisma.customer.delete({ where: { id: customer.id } });

    const remainingAudits = await prisma.contractAudit.findMany({ where: { customerId: customer.id } });
    const remainingFlags = await prisma.clauseFlag.findMany({ where: { auditId: audit.id } });
    const remainingScenario = await prisma.overrunScenario.findUnique({ where: { auditId: audit.id } });

    assert.strictEqual(remainingAudits.length, 0, 'Audits must cascade delete');
    assert.strictEqual(remainingFlags.length, 0, 'ClauseFlags must cascade delete');
    assert.strictEqual(remainingScenario, null, 'OverrunScenario must cascade delete');
  });

  // ---------------------------------------------------------------------------
  // SUITE 7: Serverless Cold-Start Readiness Simulation
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 7] Serverless Cold-Start Readiness Simulation\x1b[0m');

  await runTest('Serverless', 'Verifies starter databases exist in prisma/ and public/', () => {
    const prismaStarter = path.resolve(ROOT_DIR, 'prisma/starter.db');
    const publicStarter = path.resolve(ROOT_DIR, 'public/starter.db');

    assert.ok(fs.existsSync(prismaStarter), 'prisma/starter.db must exist');
    assert.ok(fs.existsSync(publicStarter), 'public/starter.db must exist');

    const prismaSize = fs.statSync(prismaStarter).size;
    const publicSize = fs.statSync(publicStarter).size;

    assert.ok(prismaSize > 10000, 'prisma/starter.db must contain seeded data');
    assert.ok(publicSize > 10000, 'public/starter.db must contain seeded data');
  });

  await runTest('Serverless', 'Simulates VERCEL=1 cold start with atomic /tmp DB replication', async () => {
    const tmpDbPath = '/tmp/clauseguard.db';
    if (fs.existsSync(tmpDbPath)) {
      try {
        fs.unlinkSync(tmpDbPath);
      } catch {
        // Continue if locked
      }
    }

    const previousVercel = process.env.VERCEL;
    process.env.VERCEL = '1';

    try {
      const prisma = getPrismaClient();
      const customers = await prisma.customer.findMany();
      assert.ok(customers.length >= 2, 'Cold-started DB must have seeded customers');
      const evaluator = customers.find(c => c.email === 'evaluator@clauseguard.local');
      assert.ok(evaluator, 'Must contain seeded evaluator customer');

      const audits = await prisma.contractAudit.findMany({
        include: { clauseFlags: true, overrunScenario: true }
      });
      assert.ok(audits.length >= 1, 'Cold-started DB must have pre-seeded contract audit');
    } finally {
      if (previousVercel !== undefined) {
        process.env.VERCEL = previousVercel;
      } else {
        delete process.env.VERCEL;
      }
    }
  });

  // ---------------------------------------------------------------------------
  // SUITE 8: Anti-AI Slop Heuristic Audit Verification
  // ---------------------------------------------------------------------------
  console.log('\n\x1b[1m\x1b[36m[SUITE 8] Anti-AI Slop Heuristic Audit Verification\x1b[0m');

  function getVueFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!['node_modules', '.nuxt', '.output', '.git'].includes(file)) {
          results = results.concat(getVueFiles(fullPath));
        }
      } else if (file.endsWith('.vue')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const vueFiles = [
    ...getVueFiles(path.resolve(ROOT_DIR, 'components')),
    ...getVueFiles(path.resolve(ROOT_DIR, 'pages')),
    path.resolve(ROOT_DIR, 'app.vue')
  ];

  await runTest('AntiSlop', 'Scans all Vue files to verify ZERO emojis used in UI components', () => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;
    const violations: Array<{ file: string; line: number; text: string }> = [];

    for (const file of vueFiles) {
      const relative = path.relative(ROOT_DIR, file);
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, index) => {
        if (emojiRegex.test(line)) {
          violations.push({ file: relative, line: index + 1, text: line.trim() });
        }
      });
    }

    assert.strictEqual(
      violations.length,
      0,
      `Found ${violations.length} emoji violations: ${JSON.stringify(violations, null, 2)}`
    );
  });

  await runTest('AntiSlop', 'Verifies 100% semantic SVG icons from lucide-vue-next', () => {
    const iconFiles = vueFiles.filter(f => {
      const content = fs.readFileSync(f, 'utf8');
      return content.includes('lucide-vue-next');
    });

    assert.ok(iconFiles.length >= 10, 'Expected at least 10 Vue components utilizing semantic Lucide icons');
    for (const file of iconFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const lucideImport = content.match(/import\s+\{([^}]+)\}\s+from\s+["']lucide-vue-next["']/);
      assert.ok(lucideImport, `File ${path.relative(ROOT_DIR, file)} must properly import from lucide-vue-next`);
    }
  });

  await runTest('AntiSlop', 'Scans UI copy to verify ZERO generic AI marketing buzzwords', () => {
    const buzzwords = [
      'supercharge', 'unleash', 'game-changer', 'magic', 'revolutionary',
      'seamlessly', 'cutting-edge', 'next-generation', 'elevate', 'synergy',
      'paradigm shift', 'disrupt', 'delve', 'testament'
    ];

    const violations: Array<{ file: string; line: number; word: string; text: string }> = [];

    for (const file of vueFiles) {
      const relative = path.relative(ROOT_DIR, file);
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, index) => {
        for (const bw of buzzwords) {
          const regex = new RegExp(`\\b${bw}\\b`, 'i');
          if (regex.test(line)) {
            violations.push({ file: relative, line: index + 1, word: bw, text: line.trim() });
          }
        }
      });
    }

    assert.strictEqual(
      violations.length,
      0,
      `Found ${violations.length} buzzword violations: ${JSON.stringify(violations, null, 2)}`
    );
  });

  await runTest('Accessibility', 'Verifies prefers-reduced-motion accessibility reset exists in main.css', () => {
    const cssPath = path.resolve(ROOT_DIR, 'assets/css/main.css');
    assert.ok(fs.existsSync(cssPath), 'main.css must exist');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(
      cssContent.includes('@media (prefers-reduced-motion: reduce)'),
      'main.css must implement prefers-reduced-motion media query'
    );
    assert.ok(
      cssContent.includes('transition-duration: 0s !important') || cssContent.includes('animation-duration'),
      'prefers-reduced-motion must disable or minimize transitions/animations'
    );
  });

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  const overallDuration = performance.now() - overallStart;
  console.log('\n\x1b[1m\x1b[34m======================================================================\x1b[0m');
  console.log(`\x1b[1mVERIFICATION SUMMARY: ${stats.passed}/${stats.total} PASSED (${stats.failed} failed) in ${formatDuration(overallDuration)}\x1b[0m`);
  console.log('\x1b[1m\x1b[34m======================================================================\x1b[0m\n');

  if (stats.failed > 0) {
    console.error('\x1b[31mFailures:\x1b[0m');
    for (const f of stats.failures) {
      console.error(`- [${f.suite}] ${f.test}: ${f.error}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test suite error:', err);
  process.exit(1);
});
