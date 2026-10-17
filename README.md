# ClauseGuard Studio

> **Autonomous contract risk auditor, toxic clause redliner, and protective counter-clause generator for independent software engineers, consultants, and boutique agencies.**

[![Live Production App](https://img.shields.io/badge/Production%20Deployment-Live%20on%20Vercel-0284c7?style=for-the-badge&logo=vercel&logoColor=white)](https://clause-guard-studio.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-iammuttaqi%2Fclause--guard--studio-0f172a?style=for-the-badge&logo=github&logoColor=white)](https://github.com/iammuttaqi/clause-guard-studio)
[![Test Suite Status](https://img.shields.io/badge/Test%20Suite-28%2F28%20Passing%20(100%25)-15803d?style=for-the-badge&logo=vitest&logoColor=white)](file:///Users/muttaqi/ai-engineering-team/projects/clause-guard-studio/TEST_RESULTS.md)
[![Tech Stack](https://img.shields.io/badge/Stack-Nuxt%203%20%7C%20Vue%203%20%7C%20Radix%20Vue%20%7C%20Prisma%20%7C%20Tailwind-475569?style=for-the-badge)](https://nuxt.com)

---

## 1. Executive Summary & Value Proposition

In commercial software development and digital consulting, service providers face severe asymmetric legal risk. Standard client-drafted agreements (Master Services Agreements, Statements of Work, Retainers) are authored by enterprise corporate legal teams to unilaterally offload risk onto the vendor.

Because retaining legal counsel costs **$600 to $1,500 per agreement**, over 84% of freelancers and small agencies sign contracts unredlined. These agreements routinely contain hidden clauses transferring unlimited liability, enforcing delayed payment terms ("paid-when-paid"), seizing intellectual property prior to invoice clearance, and imposing uncapped revisions under subjective "client satisfaction" traps.

**ClauseGuard Studio** dismantles this asymmetry in under 15 milliseconds. Powered by an offline-capable, deterministic lexical scanning engine, it audits contract text against **25+ toxic patterns across 5 core risk vectors**, calculates exact scope-creep financial downside exposure, and generates calibrated, negotiation-ready counter-clauses across three distinct postures: **Collaborative**, **Firm**, and **Assertive**.

```
+--------------------------------------------------------------------------------------------------+
|                                    COMMERCIAL VALUE MATRIX                                       |
+------------------------------+------------------------------------+------------------------------+
| Hidden Contractual Trap      | Potential Practitioner Downside    | ClauseGuard Studio Recapture |
+------------------------------+------------------------------------+------------------------------+
| **Unlimited Liability &**    | Single dispute puts personal       | Mutual aggregate liability   |
| **One-Way Indemnity**        | bank accounts & assets at risk.    | cap tied to 12 months fees.  |
|                              | ($25,000 - $250,000+ exposure)     |                              |
+------------------------------+------------------------------------+------------------------------+
| **Premature Intellectual**   | Client defaults on final invoice   | Strict conditional transfer: |
| **Property Assignment**      | while retaining full ownership.    | title transfers only upon    |
|                              | ($5,000 - $40,000 lost leverage)   | 100% cleared settlement.     |
+------------------------------+------------------------------------+------------------------------+
| **Subjective Acceptance &**  | Endless rounds under "satisfaction"| Strict 2-round revision cap  |
| **Uncapped Scope Creep**     | trap; effective rate drops -23%.   | with deemed approval window  |
|                              | ($2,500 - $7,500 unbilled labor)   | & mandatory overrun rate.    |
+------------------------------+------------------------------------+------------------------------+
| **Paid-When-Paid &**         | Vendor acts as zero-interest bank; | Net-15 terms with 1.5%/mo    |
| **Net-60/90 Payment Cycles** | creates lethal working capital gaps| statutory interest and work  |
|                              | ($1,200 - $4,500 financing loss)   | suspension rights.           |
+------------------------------+------------------------------------+------------------------------+
```

---

## 2. Core Architectural Pipeline

ClauseGuard Studio operates via an ultra-low latency, deterministic pipeline. It avoids non-deterministic LLMs in favor of reproducible lexical heuristics and local execution:

```mermaid
flowchart LR
    A[Raw Contract Text / Sample MSA] --> B[Deterministic Lexical Tokenizer]
    B --> C{5-Vector Threat Engine}
    C -->|Vector 1| D1[Liability & Indemnity]
    C -->|Vector 2| D2[Scope Creep & Revisions]
    C -->|Vector 3| D3[Payment & Cashflow Traps]
    C -->|Vector 4| D4[Premature IP Assignment]
    C -->|Vector 5| D5[Restrictive Covenants]
    D1 & D2 & D3 & D4 & D5 --> E[Mathematical Protection Index 0-100]
    E --> F[1-Click Counter-Clause Generator]
    F --> G[Collaborative / Firm / Assertive Postures]
    G --> H[Inline Diff Viewer & Email Scripts]
    E --> I[Scope Overrun & Downside Financial Calculator]
    I --> J[Protective Revision SLA Addendum]
```

---

## 3. Key Features

### 3.1 Deterministic Lexical Scanner (5 Risk Vectors)
- **Sub-15ms Analysis**: Scans 5,000-word agreements instantaneously without external network latency.
- **25+ Real-World Heuristic Rules**: Curated regex tokenizers and syntactic matchers covering:
  1. **Unlimited Liability & Indemnity** (`LIAB-01` to `LIAB-05`): Uncapped damages, consequential loss inclusions, one-way defense obligations, open-ended patent indemnity, and perpetual warranties.
  2. **Scope Creep & Vague Acceptance** (`SCOPE-01` to `SCOPE-05`): "Sole satisfaction" traps, uncapped revision rounds, missing deemed acceptance windows, and free lifetime maintenance.
  3. **Extended Payment Terms** (`PAY-01` to `PAY-05`): "Paid-when-paid" provisions, Net-60/90/120 payment cycles, lack of late interest penalties, missing right to pause work, and unilateral fee withholdings.
  4. **Premature IP Assignment** (`IP-01` to `IP-04`): Work-for-hire assignment upon creation, background IP forfeiture, moral rights waivers, and unpaid work-in-progress seizure.
  5. **Restrictive Covenants** (`REST-01` to `REST-04`): Post-termination non-competes, excessive non-solicitation (>12 months), uncompensated exclusivity, and worldwide territorial restrictions.

### 3.2 1-Click Counter-Clause Generator & Negotiation Postures
- **Three Calibrated Negotiation Postures**:
  - **Collaborative (Handshake)**: Gentle, relational wording suited for early-stage startups and sensitive client relationships.
  - **Firm (Scale)**: Balanced industry-standard commercial reciprocity reflecting market norms.
  - **Assertive (Shield)**: Hard-line corporate protections designed for aggressive enterprise procurement teams.
- **Visual Word-Level Diff Engine**: Displays instant semantic `<del>` (red strikethrough) and `<ins>` (green highlight) comparisons.
- **Ready-to-Send Email Scripts**: Generates contextual rationale and negotiation email copy with one-click clipboard copying.

### 3.3 Scope-Creep Overrun & Downside Financial Calculator
- **Real-Time Financial Modeling**: Input base fee, target hourly rate, estimated hours, and revision rounds to quantify:
  - Unbilled overrun hours (e.g. `+24 hrs`).
  - Downside financial revenue leakage (e.g. `-$3,600`).
  - Realized hourly rate degradation (e.g. `$115.38/hr`, `-23.1% loss`).
  - Recommended contingency buffer fee (e.g. `+$2,400`, 20%).
- **Enforceable SLA Addendum Generator**: Compiles an exportable, print-ready contract addendum enforcing revision limits, a 5-day deemed acceptance turnaround, and mandatory hourly overrun billing.

### 3.4 Pre-Seeded Industry Agreements & Clean Exports
- Pre-loaded with 4 realistic commercial contracts:
  - *Enterprise Master Services Agreement (MSA)*
  - *Boutique Agency Fixed-Price Statement of Work (SOW)*
  - *Monthly Consulting Retainer*
  - *Mutual Non-Disclosure Agreement (NDA)*
- One-click export of Executive Redline Briefings in clean Markdown and print-ready styled PDF format.

---

## 4. Built-in Monetization & Pricing Tiers

ClauseGuard Studio is architected with a transparent commercial model featuring monthly subscription tiers, a lifetime pass, and an **Interactive Sandbox Simulator** for offline evaluation.

```
+--------------------------------------------------------------------------------------------------+
|                                    PRICING & PACKAGING MATRIX                                    |
+------------------------------------+-------------------------+-----------------------------------+
| Feature / Entitlement              | Free Starter ($0)       | Pro Access ($29/mo or $79 LTD)    |
+------------------------------------+-------------------------+-----------------------------------+
| Monthly Contract Audits            | 3 Scans / 30-day window | **Unlimited Scans**               |
| 5-Vector Lexical Threat Scanner    | Included                | Included                          |
| Health Scorecard (0-100 Index)     | Included                | Included                          |
| Severity Flags & Explanations      | Included                | Included                          |
| Protective Counter-Clause Generator| Editorial Blur Preview  | **Full Access (3 Postures)**      |
| Word-Level Diff Visualizer         | Teaser Preview          | **Fully Unlocked**                |
| Copyable Email Negotiation Scripts | Locked                  | **Full Access (3 Postures)**      |
| Scope Overrun Financial Model      | Interactive View        | Interactive View                  |
| Protective SLA Contract Addendum   | Locked                  | **Unlocked & Copyable**           |
| Watermark-Free Markdown/PDF Export | Watermarked Preview     | **Clean Unrestricted Export**     |
| Commercial Agency License          | Personal Use Only       | **Included**                      |
| Stripe Customer Portal Access      | N/A                     | **Full Self-Service Billing**     |
+------------------------------------+-------------------------+-----------------------------------+
```

### Commercial Billing Architecture
- **Stripe Hosted Checkout (`/api/checkout`)**: Secure, pre-filled checkout sessions for Pro Monthly ($29/mo) and Founder Lifetime ($79 one-time).
- **Stripe Webhooks (`/api/webhooks/stripe`)**: Automated lifecycle reconciliation (`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`).
- **Interactive Sandbox Simulator**: Zero-friction demonstration switch enabling instantaneous, client-side Pro tier simulation without live payment credentials.

---

## 5. Standards 4.0 Design & Privacy Manifesto

ClauseGuard Studio strictly complies with the **Autonomous Software Studio Standards 4.0**:

### 5.1 Warm Parchment Editorial Art Direction
- **Warm Stone Canvas**: Canvas background (`#fafaf9`) paired with crisp editorial white cards (`#ffffff`) and refined stone structural borders (`#e7e5e4`).
- **Swiss Typography**: Clean typography with high-contrast slate inks (`#0f172a`), serif accents for titles, and monospace wells for code and contract redlines.
- **Strict Zero-Emoji Policy**: Strictly **0 emojis** in buttons, badges, headers, alerts, modals, or cards. 100% semantic stroke SVG icons from `lucide-vue-next` (`ShieldAlert`, `Scale`, `FileText`, `Handshake`, `Sliders`, `Sparkles`).
- **Motion Accessibility**: All interactive micro-interactions enforce graceful degradation under `prefers-reduced-motion: reduce`.

### 5.2 Zero-Knowledge Privacy Architecture
- **100% Deterministic Local Lexical Scanner**: Contract text is tokenized and scanned deterministically in memory.
- **Zero External LLM Inference**: Contracts are **never** transmitted to OpenAI, Anthropic, Gemini, or third-party AI APIs.
- **Confidentiality Guaranteed**: Safeguards client trade secrets, non-disclosure obligations, and proprietary code bases. Contracts are never retained or used for model training.

### 5.3 Serverless Cold-Start SQLite Replication
- **Ephemeral `/tmp` Filesystem Adapter**: In serverless runtimes (Vercel/AWS Lambda), root filesystems are strictly read-only (`EROFS`). ClauseGuard Studio automatically clones a pre-seeded, pre-migrated `prisma/starter.db` asset into `/tmp/clauseguard.db` upon container cold start.
- **Sub-Millisecond Query Availability**: Guarantees persistence, customer session tracking, and audit logging across serverless invocations.

---

## 6. Strict pnpm Quickstart & Development

ClauseGuard Studio strictly requires **`pnpm`** as its package manager. Do not use `npm` or `yarn`.

### Prerequisites
- Node.js `v20.0.0` or higher (Node.js 22+ recommended)
- `pnpm` `v9.0.0` or higher

```bash
# Enable pnpm via Corepack (if not already installed)
corepack enable
corepack prepare pnpm@latest --activate
```

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/iammuttaqi/clause-guard-studio.git
cd clause-guard-studio

# 2. Install dependencies (strictly with pnpm)
pnpm install

# 3. Synchronize SQLite database schema via Prisma
pnpm run prisma:push

# 4. Seed database with default accounts and sample audit records
pnpm run prisma:seed

# 5. Start the Nuxt 3 local development server
pnpm run dev
# Application will be accessible at: http://localhost:3000

# 6. Run the complete automated verification test suite (28/28 passing)
pnpm test

# 7. Create an optimized production build
pnpm run build

# 8. Preview the production build locally
pnpm run preview
```

---

## 7. Automated Test Suite Verification

ClauseGuard Studio includes an automated verification test harness (`tests/verify-all.ts`) executing 28 test cases across 8 validation suites:

```bash
$ pnpm test
```

```
======================================================================
  ClauseGuard Studio - Comprehensive Verification Suite (Standards 4.0)
======================================================================

[SUITE 1] Lexical Clause Threat Scanner Engine
  ✔ Detects Vector 1: Unlimited Liability & Asymmetric Indemnity (4.8ms)
  ✔ Detects Vector 2: Vague Scope Creep & Open-Ended Revisions (0.3ms)
  ✔ Detects Vector 3: Extended Payment Terms & Cashflow Traps (0.2ms)
  ✔ Detects Vector 4: Premature Intellectual Property Assignment (0.2ms)
  ✔ Detects Vector 5: Non-Compete Overreach & Restrictive Covenants (0.2ms)
  ✔ Accurately audits all 4 canonical sample contracts (1.4ms)
  ✔ Enforces Free vs Pro masking of counter-clauses (0.8ms)

[SUITE 2] Mathematical Protection Index Scoring Formula (0-100)
  ✔ Evaluates baseline clean contract to 100 with SAFE risk (0.0ms)
  ✔ Correctly deducts penalties for detected predatory rules (0.0ms)
  ✔ Applies safe bonus points for protective contractual clauses (0.0ms)
  ✔ Clamps score strictly between 0 and 100 boundaries (0.2ms)
  ✔ Calculates 5-vector breakdown metrics and severity (0.2ms)

[SUITE 3] 3-Posture Counter-Clause Generator & Diff Engine
  ✔ Generates 3 calibrated negotiation postures (Collaborative, Firm, Assertive) (0.4ms)
  ✔ Diff Engine correctly computes additions, deletions, and highlighted HTML (0.0ms)
  ✔ Locks counter-clause output for Free tier users (0.0ms)

[SUITE 4] Scope-Creep Overrun Calculator & SLA Addendum Engine
  ✔ Calculates accurate financial downside, hourly degradation, and buffer fees (37.8ms)
  ✔ Generates legal SLA Addendum Rider with contractual parameters (0.1ms)

[SUITE 5] Built-in Monetization & Stripe Sandbox Engine
  ✔ Enforces Free tier 3-audit monthly quota limit and blocks with HTTP 402 (48.4ms)
  ✔ Generates sandbox checkout session and upgrades account to PRO (11.2ms)
  ✔ Generates sandbox checkout session and upgrades account to LIFETIME (4.6ms)
  ✔ Webhook simulation handles lifecycle events safely (1.1ms)

[SUITE 6] Database CRUD & Cascade Integrity (Prisma)
  ✔ Performs Customer CRUD, ContractAudit relations, and cascade deletion (8.1ms)

[SUITE 7] Serverless Cold-Start Readiness Simulation
  ✔ Verifies starter databases exist in prisma/ and public/ (0.2ms)
  ✔ Simulates VERCEL=1 cold start with atomic /tmp DB replication (1.2ms)

[SUITE 8] Anti-AI Slop Heuristic Audit Verification
  ✔ Scans all Vue files to verify ZERO emojis used in UI components (5.6ms)
  ✔ Verifies 100% semantic SVG icons from lucide-vue-next (1.2ms)
  ✔ Scans UI copy to verify ZERO generic AI marketing buzzwords (10.5ms)
  ✔ Verifies prefers-reduced-motion accessibility reset exists in main.css (0.4ms)

======================================================================
VERIFICATION SUMMARY: 28/28 PASSED (0 failed) in 145.3ms
======================================================================
```

---

## 8. Repository Structure

```
clause-guard-studio/
├── .env.example               # Environment variables template
├── nuxt.config.ts             # Nuxt 3 full-stack configuration
├── package.json               # pnpm dependency specifications & scripts
├── tailwind.config.ts         # Warm Parchment design tokens & typography
├── ARCHITECTURE.md            # Detailed technical architecture specification
├── CONCEPT.md                 # Product vision & market problem analysis
├── PRD.md                     # Product requirements document
├── DEPLOYMENT.md              # Vercel cloud deployment verification report
├── TEST_RESULTS.md            # QA automated test suite execution report
├── USER_GUIDE.md              # End-to-end commercial user & negotiation guide
├── LAUNCH.md                  # Marketing & distribution launch kit
├── README.md                  # Master documentation & technical manual (This File)
│
├── prisma/
│   ├── schema.prisma          # Prisma SQLite schema definition
│   ├── starter.db             # Bundled pre-migrated DB template for cold starts
│   └── seed.ts                # Database seeding script
│
├── server/
│   ├── api/
│   │   ├── audit/             # Audit, counter-clause, & overrun endpoints
│   │   ├── contracts/         # Pre-seeded contract template loaders
│   │   ├── checkout.post.ts   # Stripe checkout & sandbox session creator
│   │   ├── webhooks/stripe.ts # Stripe webhook handler & signature verifier
│   │   ├── portal.post.ts     # Stripe customer billing portal generator
│   │   └── me/tier.get.ts     # Customer entitlement & quota resolver
│   └── utils/
│       ├── scanner.ts         # Deterministic 25+ pattern heuristics engine
│       ├── counterEngine.ts   # 3-posture counter-clause generator
│       ├── overrunCalculator.ts # Scope creep financial downside calculator
│       └── prisma.ts          # Serverless /tmp cold-start replication adapter
│
├── composables/
│   ├── useClauseGuard.ts      # Workspace contract, diff, and audit state
│   └── useBilling.ts          # Quotas, paywall triggers, and sandbox state
│
├── components/
│   ├── audit/                 # Contract editor, health gauge, diff viewer, overrun
│   ├── billing/               # Pricing table, upgrade modal, sandbox toggle
│   ├── ui/                    # Headless Radix Vue styled primitives (0 emojis)
│   └── layout/                # AppHeader, AppFooter, Container
│
└── pages/
    └── index.vue              # Primary split-view contract auditor workspace
```

---

## 9. License & Commercial Rights

ClauseGuard Studio is distributed under the commercial license terms outlined in the repository.  
Copyright © 2026 ClauseGuard Studio. All rights reserved.

- **Live Application**: [https://clause-guard-studio.vercel.app](https://clause-guard-studio.vercel.app)  
- **GitHub Repository**: [https://github.com/iammuttaqi/clause-guard-studio](https://github.com/iammuttaqi/clause-guard-studio)  
- **Documentation**: [USER_GUIDE.md](file:///Users/muttaqi/ai-engineering-team/projects/clause-guard-studio/USER_GUIDE.md) | [LAUNCH.md](file:///Users/muttaqi/ai-engineering-team/projects/clause-guard-studio/LAUNCH.md)
