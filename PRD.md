# Product Requirements Document (PRD)
## ClauseGuard Studio

**Document Version:** 1.0.0  
**Status:** Approved for Implementation (Standards 4.0)  
**Author:** Lead Product Manager, Autonomous Software Studio  
**Target Repository:** `/Users/muttaqi/ai-engineering-team/projects/clause-guard-studio`

---

## 1. Executive Summary & Value Proposition

### 1.1 Executive Summary
**ClauseGuard Studio** is a privacy-first, autonomous contract risk auditor, toxic clause redliner, and protective counter-clause generator engineered specifically for independent software engineers, boutique digital agencies, creative directors, and management consultants. 

In standard commercial transactions, service providers face severe asymmetric legal risk when handed client-drafted Master Services Agreements (MSAs), Statements of Work (SOWs), or Independent Contractor Agreements. Because retaining specialized legal counsel costs between $600 and $1,500 per agreement, freelancers and small studios routinely sign predatory contracts unreviewed. These agreements routinely contain hidden clauses transferring unlimited liability, enforcing delayed or conditional payment terms ("paid-when-paid"), seizing intellectual property prior to invoice clearance, and imposing uncapped revisions under subjective "client satisfaction" traps.

ClauseGuard Studio dismantles this asymmetry in seconds. Powered by an offline-capable, deterministic lexical scanning engine, it audits contract language against 25+ toxic patterns across 5 core risk vectors, calculates exact scope-creep financial downside exposure, and generates calibrated, negotiation-ready counter-clauses in three distinct postures (Collaborative, Firm, Assertive).

### 1.2 Commercial Problem & Quantified ROI
| Client Legal Trap | Solopreneur/Agency Downside | ClauseGuard Studio Protection | Quantified Direct ROI |
| :--- | :--- | :--- | :--- |
| **Unlimited Liability & One-Way Indemnity** | Single dispute threatens contractor's personal bank accounts and business assets for damages far exceeding contract value. | Flags uncapped exposure; generates mutual liability caps tied to aggregate fees paid in prior 12 months. | **$25,000 to $250,000+** in avoided catastrophic litigation liability. |
| **Premature IP Assignment** | Client defaults on final 50% milestone payment while retaining full ownership of code/designs. | Inserts strict conditional assignment clause stating IP transfers only upon 100% cleared settlement. | **$5,000 to $40,000** recovered project fee leverage. |
| **Subjective Scope & Uncapped Revisions** | Client demands endless changes under "satisfaction" clause, dropping effective hourly rate from $150/hr to $28/hr. | Calculates exact overrun losses; injects numerical revision caps (e.g., 2 rounds) and automatic change-order rates. | **$2,500 to $7,500** in billable scope-creep recapture per project. |
| **Net-60/90 & "Paid-When-Paid"** | Freelancers act as zero-interest commercial lenders, creating lethal working capital gaps. | Flags conditional payment traps; inserts Net-15/30 terms with mandatory 1.5%/month statutory late fees and work stoppage rights. | **$1,200 to $4,500** saved in financing/cashflow delay costs. |

**Return on Investment (ROI):**  
At **$29/month** or a **$79 Lifetime Deal**, preventing a single scope-creep overrun cycle ($2,775 average based on 18.5 unbilled hours at $150/hr) delivers an immediate **35x to 95x ROI** on day one.

---

## 2. Target Paying Personas

```
+--------------------------------------------------------------------------------------------------+
|                                    TARGET PAYING PERSONAS                                        |
+------------------------------------+-------------------------------------------------------------+
| 1. Freelance Software Engineer     | High day rate ($800 - $1,500/day); risks unlimited code     |
|    & DevOps Consultant             | warranties, open-ended bug fixes, and third-party indemnity.|
+------------------------------------+-------------------------------------------------------------+
| 2. Creative Director & Brand       | High project fees ($10k - $50k); vulnerable to subjective   |
|    Strategist                      | "until Client is completely satisfied" revision black holes.|
+------------------------------------+-------------------------------------------------------------+
| 3. Boutique Digital Agency         | 3-15 person web/product studio; manages 10-30 client SOWs/yr;|
|    (Web, Mobile, Marketing)        | risks "paid-when-paid" subcontractor cash-flow crunches.    |
+------------------------------------+-------------------------------------------------------------+
| 4. Independent Management &        | High-billing advisory ($200 - $450/hr); risks overreaching  |
|    Technical Consultant            | 2-year non-competes paralyzing their industry vertical.     |
+------------------------------------+-------------------------------------------------------------+
```

### 2.1 Persona 1: The Senior Freelance Software / DevOps Engineer
- **Profile:** Marcus, 34. Senior Full-Stack/Cloud Engineer contracting for enterprise scale-ups.
- **Contract Volume:** 4 to 8 contracts/year, valued at $20,000 to $90,000 each.
- **Core Frustration:** Enterprise procurement teams drop 45-page standard vendor MSAs filled with indemnification traps for open-source code and uncapped consequential damages.
- **Trigger to Pay:** Needs to immediately redline an enterprise MSA before a Monday morning kickoff call without spending $1,200 on a corporate attorney.

### 2.2 Persona 2: The Independent Creative Director & Brand Designer
- **Profile:** Elena, 29. Solopreneur delivering brand identities, design systems, and UI/UX.
- **Contract Volume:** 12 to 20 client SOWs/year, valued at $6,000 to $25,000 each.
- **Core Frustration:** Clients demand 7+ revision rounds because the SOW lacked explicit review windows and numerical milestone sign-offs.
- **Trigger to Pay:** Experiences an unbilled 3-week project delay on a fixed-fee contract; needs the Scope Overrun Calculator and protective revision-limiting clauses.

### 2.3 Persona 3: Boutique Digital Agency Founder / Operations Lead
- **Profile:** David, 41. Co-founder of a 9-person custom web application agency.
- **Contract Volume:** 25 to 50 active SOWs, MSAs, and contractor pass-through agreements annually.
- **Core Frustration:** Enterprise clients insert "paid-when-paid" clauses, leaving the agency on the hook for employee payroll while waiting 120 days for client accounts payable.
- **Trigger to Pay:** Purchases the $79 Lifetime Deal or $29/mo Pro Tier to standardize risk scanning across all outbound client SOWs and inbound subcontractor agreements.

### 2.4 Persona 4: Independent Management & Strategy Consultant
- **Profile:** Priya, 38. B2B go-to-market advisor consulting for FinTech and HealthTech founders.
- **Contract Volume:** 6 to 10 retainer agreements/year, valued at $5,000 to $12,000/month.
- **Core Frustration:** Clients slip 24-month global non-compete clauses into NDAs, restricting her from advising other companies in the same sector.
- **Trigger to Pay:** Instant detection of non-compete overreach and copy-paste replacement carve-outs that protect her consulting pipeline.

---

## 3. Monetization & Pricing Tiers (Standards 4.0 Architecture)

```
+--------------------------------------------------------------------------------------------------+
|                                       PRICING & PACKAGING                                        |
+------------------------------------+------------------------------------+------------------------+
| FEATURE / ENTITLEMENT              | FREE STARTER ($0)                  | PRO PASS ($29/mo or $79 LTD) |
+------------------------------------+------------------------------------+------------------------+
| Monthly Contract Audits            | 3 Scans / calendar month           | Unlimited Audits       |
| Lexical Threat Scanner (5 Vectors) | Full Access (Badges & Health Score)| Full Access            |
| Toxic Clause Identification        | High-Level Severity Badges         | Full Redline Highlighting|
| Protective Counter-Clause Generator| Locked (Teaser Preview)            | Full Access (3 Postures)|
| Posture Switching                  | Unavailable                        | Collaborative / Firm / |
|                                    |                                    | Assertive Modes        |
| Scope-Creep Overrun Calculator     | View-only Calculations             | Full Unlocked + Custom |
|                                    |                                    | Protective SLA Addenda |
| Watermark-Free Export              | Watermarked Preview                | Markdown & Clean PDF   |
| Commercial Agency License          | Personal Use Only                  | Included               |
| Stripe Customer Portal Access      | N/A                                | Full Self-Serve Billing|
+------------------------------------+------------------------------------+------------------------+
```

### 3.1 Pricing Tiers

#### Free Starter Tier ($0 / No Credit Card Required)
- **Target:** First-time visitors and trial operators verifying the engine's precision.
- **Entitlements:**
  - 3 contract scans per calendar month.
  - Overall Contract Health Score (0 - 100 Protection Index).
  - Risk categorization across 5 vectors (Critical, Warning, Safe).
  - Identification of flagged problematic sentences.
  - Basic web preview with ClauseGuard evaluation watermark.

#### Pro Tier ($29 / month recurring OR $79 Founder Lifetime Deal)
- **Target:** Active freelancers, consultants, and agency operators.
- **Entitlements:**
  - **Unlimited** contract audits and document scans.
  - **1-Click Protective Counter-Clause Generator** with dynamic posture toggling:
    - *Collaborative / Gentle* (Relational phrasing for trusted or early-stage clients).
    - *Firm / Standard* (Balanced commercial industry standard).
    - *Assertive / Strict* (Hard-line corporate protections for aggressive enterprise legal teams).
  - **Deliverable & Overrun Calculator** with exportable protective SLA Addendum clause.
  - **Watermark-Free Export**: One-click download of Executive Redline Briefings in clean Markdown and print-ready styled PDF format.
  - **Commercial Agency License**: Rights to audit subcontractor and partner contracts.

### 3.2 Paywall Triggers & Conversion Touchpoints
1. **Quota Exhaustion Trigger:**
   - When a Free user initiates their 4th contract scan within a 30-day window, execution halts and opens the `UpgradeModal` displaying: *"You've used all 3 free audits this month. Upgrade to Pro for unlimited scans."*
2. **Pro Feature Lock on Counter-Clause Generator:**
   - In Free mode, counter-clause replacement cards display the first sentence followed by an editorial blur overlay and an inline button: *"Unlock Protective Counter-Clause & Negotiation Script (Pro)"*.
3. **Pro Feature Lock on Watermark-Free Export:**
   - Attempting to click "Export PDF" or "Export Markdown" triggers the `UpgradeModal` with a clear side-by-side comparison.
4. **Header Pro Upgrade CTA:**
   - Persistent top-navigation badge displaying the user's current status (e.g., `Free Plan: 2/3 Audits Left` or `Pro Member`). Clicking opens the pricing modal with 1-click upgrade options.

### 3.3 Commercial Infrastructure & Sandbox Mode
- **Stripe Hosted Checkout (`/api/checkout`):**
  - Accepts `priceId` or `planType` (`monthly` @ $29/mo or `lifetime` @ $79 one-time).
  - Generates secure Stripe Checkout sessions with pre-filled metadata.
- **Stripe Webhook Pipeline (`/api/webhooks/stripe`):**
  - Handles `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.
  - Atomically updates customer tier in the local SQLite database.
- **Stripe Customer Portal (`/api/portal`):**
  - Enables self-service subscription cancellation, card updates, and invoice receipts.
- **Interactive Sandbox Simulation Fallback:**
  - In local development or zero-credential environments (`STRIPE_SECRET_KEY` unset or sandbox toggled), the system provides an immediate **"Simulate Pro Upgrade"** switch.
  - Users and QA evaluators can toggle between `Free` (0/3 used), `Free (Quota Exhausted)` (3/3 used), and `Pro Active` states with instantaneous reactive UI updates and zero payment friction.

---

## 4. User Stories & Gherkin Acceptance Criteria

```
+--------------------------------------------------------------------------------------------------+
|                                    CORE FEATURE FLOW PIPELINE                                    |
|                                                                                                  |
|  [Ingest Text / Samples] --> [Lexical Heuristics] --> [Risk Matrix & Redlines]                   |
|                                                                |                                 |
|                                           +--------------------+---------------------+           |
|                                           |                                          |           |
|                                           v                                          v           |
|                              [Overrun Calculator]                   [Counter-Clause Generator]   |
|                                           |                                          |           |
|                                           +--------------------+---------------------+           |
|                                                                |                                 |
|                                                                v                                 |
|                                              [Export & Paywall Gating]                           |
+--------------------------------------------------------------------------------------------------+
```

### 4.1 Ingestion & Sample Agreement Loader
**User Story:** As an independent contractor, I want to quickly paste my client agreement or load realistic sample contracts, so that I can immediately audit my exposure without manual setup.

#### Scenario 4.1.1: Loading realistic sample contract templates
```gherkin
Given the user is on the ClauseGuard Studio auditor workspace
When the user clicks on the "Sample Templates" dropdown
And selects "Enterprise Master Services Agreement"
Then the editor text area is populated with the complete realistic enterprise MSA text
And the agreement character count and word count update immediately
And the "Analyze Contract" action button becomes active
```

#### Scenario 4.1.2: Pasting custom agreement text
```gherkin
Given the user has raw contract text on their clipboard
When the user pastes the content into the raw agreement editor
Then the application validates that the text length is greater than 100 characters
And renders a ready status badge with the detected paragraph count
```

---

### 4.2 Lexical Clause Risk Scanner (5 Critical Vectors)
**User Story:** As a freelancer or agency owner, I want the auditor to detect predatory language across the 5 core contract risk vectors, so that I am never blindsided by toxic legal terms.

```
+--------------------------------------------------------------------------------------------------+
|                                      5 SCANNER RISK VECTORS                                      |
+----+--------------------------------+------------------------------------------------------------+
| #1 | Unlimited Liability &          | Uncapped damages, indirect/consequential damages, one-way  |
|    | Asymmetric Indemnity           | contractor indemnification without client reciprocity.     |
+----+--------------------------------+------------------------------------------------------------+
| #2 | Vague Scope Creep &            | Subjective acceptance ("to Client's satisfaction"),        |
|    | Open-Ended Revisions           | missing revision caps, indefinite warranty windows.        |
+----+--------------------------------+------------------------------------------------------------+
| #3 | Extended Payment Terms &       | Net-60/90 terms, "paid-when-paid" clauses, missing late    |
|    | "Paid-When-Paid" Traps         | interest fees, absence of right to pause services.         |
+----+--------------------------------+------------------------------------------------------------+
| #4 | Premature Intellectual         | Work product assigned "upon creation" before payment,      |
|    | Property Assignment            | forfeiture of developer toolkits and pre-existing IP.      |
+----+--------------------------------+------------------------------------------------------------+
| #5 | Non-Compete Overreach &        | Multi-year geographic restrictions, non-solicitation >12m, |
|    | Restrictive Covenants          | exclusivity preventing engagement in core vertical.        |
+----+--------------------------------+------------------------------------------------------------+
```

#### Scenario 4.2.1: Scanning contract and grading risk severity
```gherkin
Given an agreement containing "Contractor shall indemnify, defend, and hold harmless Client from any and all claims without limitation"
When the user triggers "Analyze Contract"
Then the engine flags the clause under Vector #1: "Unlimited Liability & Asymmetric Indemnity"
And assigns it a severity grade of "Critical Risk"
And highlights the exact offending sentence with a crimson warning border
And deducts 25 points from the Overall Protection Index
```

#### Scenario 4.2.2: Detecting conditional payment ("Paid-When-Paid")
```gherkin
Given an agreement containing "Payment to Contractor is contingent upon Client receiving payment from the end customer"
When the lexical analysis completes
Then the engine flags the clause under Vector #3: "Extended Payment Terms"
And tags the threat label as "Paid-When-Paid Conditional Cashflow Trap"
And provides an explanatory commercial risk advisory in plain human English
```

---

### 4.3 1-Click Protective Counter-Clause Generator
**User Story:** As a negotiating professional, I want battle-tested, balanced counter-clauses with adjustable negotiation postures, so that I can send a professional redline without alienating my client.

#### Scenario 4.3.1: Toggling negotiation postures
```gherkin
Given an identified critical risk clause for "Premature IP Assignment"
And the user holds an active Pro subscription or Sandbox Pro mode
When the user selects the "Firm" posture tab
Then the counter-clause card displays: "Ownership of Work Product transfers to Client exclusively upon Contractor's receipt of full and final payment"
When the user switches posture to "Collaborative"
Then the text dynamically adjusts to a gentler commercial formulation with shared interim licenses
When the user switches posture to "Assertive"
Then the text adjusts to strict escrow/holding terms with statutory interest penalties
```

#### Scenario 4.3.2: Visual diff comparison
```gherkin
Given a flagged toxic clause and its generated counter-clause
When the user toggles the "Diff View" switch
Then the UI displays an inline visual diff showing red strikethrough for deleted predatory terms
And green highlights for inserted protective language
And provides a "Copy Redline" button that copies the clean text to clipboard
```

---

### 4.4 Deliverable & Scope Overrun Calculator
**User Story:** As an agency owner or solopreneur, I want to calculate the direct financial loss of unbilled revision cycles, so that I can attach a protective SLA addendum to my statement of work.

#### Scenario 4.4.1: Interactive financial risk calculation
```gherkin
Given the user inputs:
  | Project Quoted Fee   | $12,000 |
  | Estimated Work Hours | 80 hrs  |
  | Target Hourly Rate   | $150/hr |
  | Included Revisions   | 2       |
When the user adjusts the "Anticipated Revision Rounds" slider to 5 rounds
Then the calculator computes:
  | Unbilled Overrun Hours  | 24 hours |
  | Hidden Financial Loss   | $3,600   |
  | Effective Realized Rate | $115.38/hr (-23.1% loss) |
And generates a customized "Revision Cap & Overrun Rate Clause" set at $150/hr with a 5-day client review SLA
```

---

### 4.5 Built-in Monetization & Stripe Checkout
**User Story:** As a product operator, I want quota gating, upgrade modals, Stripe checkout session generation, and instant sandbox simulation, so that the studio captures revenue cleanly without friction.

#### Scenario 4.5.1: Enforcing free tier quota gating
```gherkin
Given a Free Tier user who has executed 3 scans in the current 30-day window
When the user clicks "Analyze Contract" for a 4th time
Then the audit is not executed
And the "UpgradeModal" opens automatically
And displays the current quota usage "3 of 3 Free Audits Used"
And presents the Pro Monthly ($29/mo) and Lifetime Pass ($79) checkout buttons
```

#### Scenario 4.5.2: Initiating Stripe Checkout
```gherkin
Given a user viewing the upgrade modal with live Stripe keys configured
When the user clicks "Upgrade to Pro Monthly ($29/mo)"
Then a POST request is sent to "/api/checkout" with body { "plan": "monthly" }
And the user is redirected to the official Stripe Hosted Checkout page
```

#### Scenario 4.5.3: Sandbox simulation toggle
```gherkin
Given the application is running in development or sandbox mode
When the user clicks the "Sandbox Mode" switch in the header or upgrade modal
Then the entitlement store immediately toggles user status to "Pro"
And all locked counter-clauses and exports unlock reactively without page reload
And a toast notification confirms: "Simulated Pro Plan Activated"
```

---

## 5. Standards 4.0 Design & Quality Specifications

### 5.1 Color Palette & Editorial Art Direction
ClauseGuard Studio adopts an editorial, high-craft **Warm Parchment** design system inspired by high-end legal publishing and modern Swiss typography.

```
+--------------------------------------------------------------------------------------------------+
|                                  STANDARDS 4.0 COLOR TOKENS                                      |
+----------------------+-----------+---------------------------------------------------------------+
| Token Name           | Hex Code  | Semantic Purpose                                              |
+----------------------+-----------+---------------------------------------------------------------+
| Canvas Background    | #fafaf9   | Warm stone / parchment base canvas                            |
| Card Surface         | #ffffff   | Pure crisp editorial white elevated container cards          |
| Card Surface Muted   | #f5f5f4   | Subtle warm inset backgrounds and input wells                 |
| Stone Borders        | #e7e5e4   | Refined, high-contrast structural borders                     |
| Stone Borders Active | #d6d3d1   | Interactive focus and active element borders                  |
| Typography Primary   | #0f172a   | Deep slate ink for maximum legibility                         |
| Typography Secondary | #475569   | Medium slate for metadata, labels, and secondary guidance     |
| Typography Muted     | #94a3b8   | Muted slate for placeholders and captions                     |
| Brand Action Accent  | #0284c7   | Slate blue / maritime primary interactive tone                |
| Brand Action Hover   | #0369a1   | Deepened maritime blue for hover/active states                |
| Critical Risk        | #b91c1c   | Deep crimson for dangerous clauses and liabilities            |
| Critical Surface     | #fef2f2   | Soft crimson tint for critical risk pill badges               |
| Warning Risk         | #d97706   | Warm amber for moderate scope-creep and payment delays        |
| Warning Surface      | #fffbeb   | Soft amber tint for warning risk pill badges                  |
| Safe / Protective    | #15803d   | Forest green for verified protective clauses                  |
| Safe Surface         | #f0fdf4   | Soft green tint for safe status pills                         |
+----------------------+-----------+---------------------------------------------------------------+
```

### 5.2 Strict Iconography Rules (Zero AI Slop)
- **Zero Emojis Policy:** Strictly **0 emojis** in buttons, badges, headers, alerts, modals, or cards. (e.g., No 🚀, ⚠️, 🔒, 💡, 🛡️).
- **100% Lucide SVG Icons:** Every visual symbol must be an authentic, crisp Lucide stroke icon rendered at standard 1.5px to 2px stroke width:
  - `ShieldAlert`, `ShieldCheck`, `Scale`, `FileText`, `AlertTriangle`, `CheckCircle2`, `Copy`, `Sliders`, `Download`, `Sparkles`, `ExternalLink`, `Lock`, `RefreshCw`, `ArrowRight`.

### 5.3 Headless UI Primitives & Bespoke Art Direction
- Built using **Radix Vue** unstyled headless components (`radix-vue`):
  - `Dialog` (Modal containers for Checkout and Upgrade flows)
  - `Tabs` (Clean line-under-text tabs for negotiation postures)
  - `Accordion` (Smooth animated risk vector breakdowns)
  - `Tooltip` (Risk definition and legal term glossaries)
  - `DropdownMenu` (Sample template selectors)
- Tailored with bespoke Tailwind classes avoiding boilerplate generic templates.

### 5.4 Motion & Micro-Interactions
- Smooth micro-interactions:
  - Button state transitions: `transition-colors duration-150 ease-out`
  - Accordion expand/collapse: `transition-all duration-200 ease-in-out`
  - Score meter fill: Progressive spring animation from 0 to calculated score.
- **Accessibility & Reduced Motion:** All animations must respect `prefers-reduced-motion: reduce` by degrading instantly to static state changes.

### 5.5 Authoritative, Human Business Copy
- No hyperbolic AI buzzwords ("magic", "revolutionize", "hyper-charge", "unleash").
- Crisp, direct, authoritative legal and commercial terminology ("Statutory late interest", "Reciprocal indemnification", "Conditional work-product assignment", "Scope containment SLA").

---

## 6. Lightweight, Modern Tech Stack

```
+--------------------------------------------------------------------------------------------------+
|                                      ARCHITECTURE STACK                                          |
+-----------------------+--------------------------------------------------------------------------+
| Application Framework | Nuxt 3 (v3.14+) with full Vue 3 Composition API & TypeScript             |
| UI / Styling          | Tailwind CSS v3 with custom warm parchment palette & typography plugin   |
| Headless Components   | Radix Vue (radix-vue) for robust accessibility & keyboard navigation    |
| Iconography           | lucide-vue-next (Strictly 100% Lucide SVG stroke icons)                  |
| State Management      | Pinia & VueUse (useStorage, useClipboard, useMediaQuery)                 |
| Database & ORM        | Prisma ORM with SQLite engine located in /tmp/clauseguard.db             |
| Billing & Payments    | Stripe API SDK (@stripe/stripe-js, stripe) + Native Sandbox Simulator    |
| Package Manager       | pnpm exclusively                                                         |
+-----------------------+--------------------------------------------------------------------------+
```

### 6.1 Database Schema (Prisma / SQLite)
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:/tmp/clauseguard.db"
}

generator client {
  provider = "prisma-client-js"
}

model UserSession {
  id              String         @id @default(cuid())
  sessionToken    String         @unique
  planTier        String         @default("free") // "free" | "pro"
  monthlyScans    Int            @default(0)
  lastScanAt      DateTime?
  stripeCustomerId String?
  stripeSubId     String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  auditRecords    AuditRecord[]
}

model AuditRecord {
  id             String       @id @default(cuid())
  userSessionId  String
  userSession    UserSession  @relation(fields: [userSessionId], references: [id], onDelete: Cascade)
  title          String       @default("Untitled Contract")
  contractType   String       // "msa" | "sow" | "retainer" | "nda" | "custom"
  characterCount Int
  protectionIndex Int
  criticalCount  Int
  warningCount   Int
  safeCount      Int
  summaryJson    String       // JSON payload of detected clause vectors
  createdAt      DateTime     @default(now())
}
```

---

## 7. Explicit MVP Scope Boundaries

```
+--------------------------------------------------------------------------------------------------+
|                                      MVP SCOPE BOUNDARIES                                        |
+--------------------------------------------------+-----------------------------------------------+
| IN-SCOPE (Phase 1 MVP Release)                   | OUT-OF-SCOPE (Post-MVP / Future Roadmaps)     |
+--------------------------------------------------+-----------------------------------------------+
| • Instant raw contract text input & editor       | • PDF / DOCX file parser engine (OCR upload)  |
| • 4 Pre-loaded realistic sample agreements:      | • Multi-party live legal collaboration        |
|   (Enterprise MSA, Agency SOW, Retainer, NDA)    | • E-signature workflow (DocuSign integration) |
| • Deterministic 25+ pattern lexical risk engine  | • Multi-seat agency team workspace accounts   |
| • 5-Vector risk breakdown with severity badges   | • LLM runtime API token consumption / backend |
| • 1-Click Counter-Clause Generator (3 postures)  |   telemetry (all analysis must run locally /  |
| • Deliverable & Overrun Financial Calculator     |   serverless deterministic heuristics)        |
| • Diff comparison view (Redline strikethrough)   | • Custom localized jurisdiction laws (e.g.,   |
| • Monthly quota tracking (3 audits / month)      |   German civil code BGB vs California Labor)  |
| • Stripe Checkout integration & Sandbox switch   | • Direct CRM syncing (Hubspot / Salesforce)   |
| • Watermark-free Markdown and Styled PDF export  |                                               |
+--------------------------------------------------+-----------------------------------------------+
```

---

## 8. Metrics for Success & Commercial KPIs

### 8.1 Primary Commercial Metrics
1. **Activation Rate:**  
   - *Target:* **≥ 65%** of all unique visitors load a sample agreement or paste contract text and complete an audit within their first 90 seconds.
2. **Paywall Hit Rate:**  
   - *Target:* **≥ 28%** of active users encounter a paywall trigger (exhaust 3 free audits, attempt counter-clause export, or click posture switcher).
3. **Free-to-Paid Conversion Rate:**  
   - *Target:* **≥ 6.5%** of activated users convert to either Pro Monthly ($29/mo) or the Founder Lifetime Deal ($79) within 14 days of activation.
4. **Counter-Clause Utility Rate:**  
   - *Target:* **≥ 55%** of Pro users copy at least 2 protective counter-clauses per audited agreement.

### 8.2 Operational & Technical Metrics
- **Analysis Latency:** Under **150ms** client-side or serverless scan response time for a 5,000-word agreement.
- **Engine Reliability:** 100% deterministic, zero external model failure dependencies.
- **Accessibility:** 100% keyboard navigable with strict ARIA compliance via Radix Vue primitives.

---

## 9. Conclusion & Implementation Directives
ClauseGuard Studio bridges the critical gap between hazardous blind signing and unaffordable attorney fees. By focusing on deterministic lexical threat detection, immediate negotiation utility, and transparent commercial gating, it delivers immediate, unassailable ROI to freelancers, agencies, and consultants worldwide.
