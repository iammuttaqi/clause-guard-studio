import type { ScannerRule, DetectedFlag, VectorSummary, RiskSeverity, ThreatVectorId } from '~/types';

export const THREAT_VECTORS: Record<ThreatVectorId, { name: string; description: string }> = {
  liability: {
    name: 'Unlimited Liability & Asymmetric Indemnity',
    description: 'Uncapped damages, consequential loss exposure, and one-way legal defense obligations.'
  },
  scope: {
    name: 'Vague Scope Creep & Open-Ended Revisions',
    description: 'Subjective satisfaction criteria, infinite revision cycles, and unpaid change orders.'
  },
  payment: {
    name: 'Extended Payment Terms & Cashflow Traps',
    description: 'Paid-when-paid provisions, Net-60/90 delays, unilateral withholding, and denied work suspension.'
  },
  ip: {
    name: 'Premature Intellectual Property Assignment',
    description: 'Transfer of title prior to cleared payment, forfeiture of developer toolkits, and moral rights waivers.'
  },
  restrictive: {
    name: 'Non-Compete Overreach & Restrictive Covenants',
    description: 'Multi-year non-competes, global territory lock-outs, and uncompensated full-time exclusivity.'
  }
};

export const SCANNER_RULES: ScannerRule[] = [
  // -------------------------------------------------------------------------
  // VECTOR 1: Unlimited Liability & Asymmetric Indemnity
  // -------------------------------------------------------------------------
  {
    id: 'LIAB-01',
    vectorId: 'liability',
    name: 'Uncapped Contractor Liability',
    severity: 'CRITICAL',
    penalty: 25,
    pattern: /(without\s+(limitation|limit)|unlimited\s+liability|liable\s+for\s+any\s+and\s+all\s+damages)/i,
    explanation: 'This clause imposes unlimited financial exposure on the contractor. A single dispute could threaten personal and business assets far exceeding the total value of the contract.',
    counterCollaborative: "Each party's aggregate liability under this Agreement shall be limited to direct damages and shall not exceed the total fees paid or payable by Client to Contractor in the three (3) months preceding the claim.",
    counterFirm: "To the maximum extent permitted by applicable law, Contractor's total aggregate liability arising out of or related to this Agreement shall be strictly capped at the total fees actually paid to Contractor hereunder in the twelve (12) months preceding the event giving rise to liability.",
    counterAssertive: "Notwithstanding anything to the contrary, Contractor's cumulative aggregate liability for all claims of any kind shall be strictly limited to the total fees received by Contractor under the specific Statement of Work giving rise to the claim, excluding all indirect, incidental, or consequential damages."
  },
  {
    id: 'LIAB-02',
    vectorId: 'liability',
    name: 'Consequential & Indirect Damages Inclusion',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(indirect|consequential|punitive|special|lost\s+profits)\s+damages.*(shall\s+be\s+recoverable|liable\s+for)/i,
    explanation: 'Allows the client to sue for speculative losses such as anticipated business profits or lost customer opportunities resulting from software downtime or project delays.',
    counterCollaborative: 'Neither party shall be liable to the other for indirect, incidental, consequential, or punitive damages, including loss of profits, arising from or related to this Agreement.',
    counterFirm: 'In no event shall either party be liable for any lost profits, loss of data, loss of goodwill, or incidental, indirect, punitive, or consequential damages, even if advised of the possibility of such damages.',
    counterAssertive: 'Under no circumstances shall Contractor be held responsible or liable for any consequential, punitive, special, exemplary, or indirect damages, lost revenue, or business interruption, regardless of legal theory.'
  },
  {
    id: 'LIAB-03',
    vectorId: 'liability',
    name: 'One-Way Defense and Indemnification',
    severity: 'CRITICAL',
    penalty: 25,
    pattern: /contractor\s+shall\s+(indemnify|defend|hold\s+harmless)\s+client/i,
    explanation: "Obligates the contractor to fund the client's legal defense and pay settlements without requiring reciprocal legal protection from the client.",
    counterCollaborative: "Each party agrees to defend and indemnify the other party against third-party claims arising solely from the indemnifying party's gross negligence or willful misconduct.",
    counterFirm: "Contractor shall indemnify Client solely against third-party infringement claims arising directly from Contractor's proprietary custom deliverables, provided Client gives prompt written notice, sole control of defense, and Client provides reciprocal indemnity for Client materials.",
    counterAssertive: "Indemnification obligations under this Agreement shall be strictly reciprocal. Contractor's duty to defend or indemnify shall be conditioned upon Contractor's final, non-appealable legal adjudication of gross misconduct."
  },
  {
    id: 'LIAB-04',
    vectorId: 'liability',
    name: 'Open-Ended Third-Party IP Indemnity',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(infringe|infringement|misappropriation).*(indemnify|hold\s+harmless).*(all|any)\s+third\s*party/i,
    explanation: 'Forces the contractor to guarantee that software deliverables do not violate any existing worldwide patents or copyrights, an impossible standard for independent developers.',
    counterCollaborative: "Contractor warrants that deliverables will not knowingly infringe valid intellectual property rights, and agrees to modify infringing components at Contractor's expense as Client's sole remedy.",
    counterFirm: "Contractor's indemnification for IP infringement shall be limited to direct copyright and trade secret violations within the United States, excluding open-source software and client-provided assets.",
    counterAssertive: "Contractor disclaims all patent indemnification. For any identified IP conflict, Contractor's sole obligation is to: (a) procure the right to continue use, (b) replace with non-infringing code, or (c) refund the unamortized portion of the fee."
  },
  {
    id: 'LIAB-05',
    vectorId: 'liability',
    name: 'Unlimited Warranty Period',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(warranty\s+period\s+of\s+(one|two|1|2)\s+year|warrants\s+in\s+perpetuity|lifetime\s+warranty)/i,
    explanation: 'Requires the contractor to provide complimentary bug fixes and maintenance for 1-2+ years, creating indefinite unbilled labor liabilities.',
    counterCollaborative: 'Contractor warrants that deliverables will substantially conform to agreed specifications for a period of thirty (30) days following initial delivery.',
    counterFirm: "Contractor provides a limited warranty for thirty (30) calendar days following client delivery. Any bug fixes or modifications requested after this period shall be billed at Contractor's standard hourly rate.",
    counterAssertive: "All deliverables are provided 'AS IS' following the expiration of a strict fourteen (14) day post-launch inspection window. Ongoing support requires an executed Retainer SLA."
  },
  {
    id: 'LIAB-06',
    vectorId: 'liability',
    name: 'Liquidated Damages & Punitive Penalties',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(liquidated\s+damages|penalty\s+of\s+\$|deduct\s+\$\d+\s+per\s+day)/i,
    explanation: 'Imposes automatic per-day financial penalties for missed milestones regardless of client-caused project bottlenecks or scope revisions.',
    counterCollaborative: 'Delivery targets are good-faith estimates. Milestones shall be extended day-for-day for any delays resulting from client review or third-party dependencies.',
    counterFirm: 'Contractor shall not be subject to liquidated damages, financial withholdings, or punitive penalties for milestone variations. All delivery dates are dependent on timely Client feedback.',
    counterAssertive: 'Liquidated damages and delay penalty provisions are expressly disclaimed and struck from this Agreement in their entirety.'
  },

  // -------------------------------------------------------------------------
  // VECTOR 2: Vague Scope Creep & Open-Ended Revisions
  // -------------------------------------------------------------------------
  {
    id: 'SCOPE-01',
    vectorId: 'scope',
    name: 'Subjective Satisfaction Acceptance Trap',
    severity: 'WARNING',
    penalty: 15,
    pattern: /(to\s+(the\s+)?(client'?s?|company'?s?)\s+(sole\s+)?satisfaction|in\s+(the\s+)?(client'?s?|company'?s?)\s+sole\s+discretion)/i,
    explanation: "Conditions project milestone sign-off and payment on the client's subjective aesthetic feelings rather than objective, measurable technical specifications.",
    counterCollaborative: 'Deliverables shall be deemed accepted upon satisfying the objective functional specifications defined in Exhibit A.',
    counterFirm: 'Client acceptance shall be evaluated solely against the objective functional criteria set forth in the SOW. Acceptance shall not be unreasonably withheld, delayed, or conditioned upon subjective preferences.',
    counterAssertive: 'Milestones are accepted upon demonstration of core functionality against written specifications. Aesthetic alterations shall be processed exclusively as paid Change Orders.'
  },
  {
    id: 'SCOPE-02',
    vectorId: 'scope',
    name: 'Uncapped Revision Loops',
    severity: 'WARNING',
    penalty: 15,
    pattern: /(unlimited\s+revisions|revise\s+until\s+approved|further\s+modifications\s+at\s+no\s+(additional\s+)?cost)/i,
    explanation: 'Leaves the number of design or code iteration cycles undefined, allowing clients to demand infinite revisions under a fixed-price contract.',
    counterCollaborative: 'Quoted fees include up to two (2) rounds of consolidated stakeholder feedback. Subsequent revision rounds will be scoped and billed collaboratively.',
    counterFirm: "The fixed project fee includes exactly two (2) rounds of revisions submitted within five (5) business days of deliverable submission. Additional revisions shall be billed at Contractor's overrun rate of $150/hr.",
    counterAssertive: 'Deliverable includes one (1) unified feedback round. Additional change requests require a signed Change Order specifying supplementary budget and schedule extension.'
  },
  {
    id: 'SCOPE-03',
    vectorId: 'scope',
    name: 'Missing Deemed Acceptance Window',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(review\s+period|client\s+shall\s+review)(?!.*(deemed\s+accepted|automatically\s+accepted))/i,
    explanation: 'Permits the client to remain silent indefinitely after receiving deliverables, stalling final invoice payments and project closeouts.',
    counterCollaborative: 'Client will review deliverables within seven (7) business days. Deliverables are considered approved if no specific written deficiencies are received within this period.',
    counterFirm: 'Client shall have five (5) business days from delivery to inspect and provide written itemized feedback. In the absence of written notice within five (5) days, the deliverable shall be deemed irrevocably accepted.',
    counterAssertive: 'Failure by Client to provide itemized written objection within five (5) business days of delivery constitutes final acceptance, triggering immediate milestone invoice release.'
  },
  {
    id: 'SCOPE-04',
    vectorId: 'scope',
    name: 'Open-Ended Scope Catch-Alls',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(including\s+but\s+not\s+limited\s+to\s+any\s+tasks|all\s+necessary\s+and\s+incidental\s+services|any\s+other\s+duties\s+as\s+requested)/i,
    explanation: "A catch-all clause that expands the contractor's duties to encompass unquoted tasks that the client deems 'incidental' to the core project.",
    counterCollaborative: 'Contractor will perform the specific deliverables enumerated in the SOW. Incidental work outside this scope will be evaluated in good faith under a new SOW.',
    counterFirm: "Contractor's services are strictly limited to the explicit line items set forth in Exhibit A. All additional requests require a bilateral written Change Order.",
    counterAssertive: 'Any task, feature, or service not explicitly specified in the Statement of Work is expressly excluded. Out-of-scope work performed at Client request shall be invoiced at 1.5x standard rates.'
  },
  {
    id: 'SCOPE-05',
    vectorId: 'scope',
    name: 'Free Lifetime Support & Bug Remediation',
    severity: 'WARNING',
    penalty: 15,
    pattern: /(promptly\s+correct\s+all\s+(errors|bugs)\s+at\s+no\s+charge|free\s+maintenance|ongoing\s+support\s+without\s+compensation)/i,
    explanation: 'Requires the contractor to fix software issues forever without an active maintenance retainer or support agreement.',
    counterCollaborative: 'Contractor will remediate reproducible critical defects identified within thirty (30) days of deployment at no charge. Subsequent maintenance will be covered under a retainer.',
    counterFirm: 'Warranty remediation applies exclusively to material non-conformities reported within thirty (30) days of acceptance. Routine maintenance and third-party API changes are billed separately.',
    counterAssertive: "Bug fixes post-acceptance are strictly billable under Contractor's standard time-and-materials support agreement ($175/hr, 4-hour monthly minimum)."
  },
  {
    id: 'SCOPE-06',
    vectorId: 'scope',
    name: 'Unilateral Delivery Timeline Acceleration',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(accelerate\s+delivery\s+at\s+client'?s?\s+request|unilaterally\s+shorten\s+deadlines|time\s+is\s+of\s+the\s+essence\s+without\s+reciprocity)/i,
    explanation: 'Allows client to advance deadlines without compensating the contractor for overtime, night shifts, or additional sprint staffing.',
    counterCollaborative: 'Adjustments to milestone delivery schedules must be agreed upon mutually in writing with proportional fee adjustments for compressed sprints.',
    counterFirm: 'Any acceleration of delivery dates requested by Client shall be subject to Contractor resource availability and an expedited rush surcharge of 35% on remaining milestone fees.',
    counterAssertive: 'Delivery schedules are fixed commitments. Client requests for priority deadline acceleration require an executed Expedited Delivery Addendum at double the base rate.'
  },

  // -------------------------------------------------------------------------
  // VECTOR 3: Extended Payment Terms & Cashflow Traps
  // -------------------------------------------------------------------------
  {
    id: 'PAY-01',
    vectorId: 'payment',
    name: 'Paid-When-Paid Conditional Cashflow Trap',
    severity: 'CRITICAL',
    penalty: 25,
    pattern: /(contingent\s+upon\s+(client'?s?|company'?s?)\s+receipt\s+of\s+payment|paid\s*when\s*paid|paid\s*if\s*paid)/i,
    explanation: 'Contractor is treated as an unsecured commercial lender; if the end customer fails or delays payment to the client, the contractor is not paid for completed work.',
    counterCollaborative: "Payment to Contractor is independent of Client's billing arrangement with third parties and shall be disbursed within fifteen (15) days of invoice date.",
    counterFirm: "Contractor's compensation is an absolute obligation of Client and is in no way contingent upon Client receiving payment from third parties or end clients.",
    counterAssertive: "Under no circumstances shall Contractor's compensation be delayed or made contingent upon third-party remittances ('paid-when-paid' provisions are void and unenforceable under this contract)."
  },
  {
    id: 'PAY-02',
    vectorId: 'payment',
    name: 'Extended Payment Cycles (Net-60 / Net-90)',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(net\s*(60|90|120)|payment\s+within\s+(sixty|ninety|60|90)\s+days)/i,
    explanation: 'Forces the contractor to float the client\'s working capital for 2 to 3 months, creating severe cashflow distress and risk of insolvency.',
    counterCollaborative: 'Client shall pay all undisputed invoices within twenty (20) calendar days of receipt.',
    counterFirm: 'Invoices are payable within fifteen (15) calendar days from the invoice date (Net-15). Invoices not disputed in writing within five (5) days are deemed approved.',
    counterAssertive: 'Payment terms are strictly Net-14 from date of invoice submission. Invoices past due by more than seven (7) days shall incur automatic statutory late charges.'
  },
  {
    id: 'PAY-03',
    vectorId: 'payment',
    name: 'Absence of Late Interest & Fee Enforcement',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(invoices\s+shall\s+be\s+paid|due\s+date)(?!.*(interest|late\s+fee|finance\s+charge))/i,
    explanation: 'Without contractual late payment penalties, corporate clients prioritize other vendor invoices, leaving the contractor unpaid for months.',
    counterCollaborative: 'Overdue balances will accrue interest at the rate of 1.0% per month or the legal maximum, whichever is lower.',
    counterFirm: 'Late payments shall accrue interest at 1.5% per month (18% per annum) or the maximum legal rate, plus all reasonable collection costs and attorney fees.',
    counterAssertive: 'Delinquent payments incur an immediate $150 late fee plus 2.0% monthly compounded interest. Client shall reimburse all costs incurred in collection.'
  },
  {
    id: 'PAY-04',
    vectorId: 'payment',
    name: 'Missing Right to Suspend Services',
    severity: 'WARNING',
    penalty: 15,
    pattern: /(continue\s+performing\s+services\s+during\s+any\s+dispute|contractor\s+shall\s+not\s+suspend\s+work)/i,
    explanation: 'Deprives the contractor of their primary leverage by legally forcing them to continue working even when the client refuses to pay past invoices.',
    counterCollaborative: 'In the event an invoice remains unpaid for more than fifteen (15) days, Contractor may pause ongoing work upon five (5) days written notice.',
    counterFirm: 'If any payment is past due by more than ten (10) calendar days, Contractor reserves the right to immediately suspend all services and withhold deliverables until the balance is cleared.',
    counterAssertive: 'Contractor maintains the unconditional right to suspend operations, revoke software licenses, and pause hosting upon five (5) days non-payment without incurring liability.'
  },
  {
    id: 'PAY-05',
    vectorId: 'payment',
    name: 'Unilateral Fee Withholding and Set-Off',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(withhold\s+(any\s+)?payments?|deduct\s+from\s+fees|set-?off\s+any\s+amounts)/i,
    explanation: 'Authorizes the client to withhold entire invoice amounts or unilaterally deduct arbitrary damages based on alleged minor discrepancies.',
    counterCollaborative: 'Client may withhold only the specific disputed portion of an invoice while releasing the remaining undisputed balance immediately.',
    counterFirm: 'Client shall have no right of set-off or unilateral deduction. In the event of a good-faith dispute, Client shall pay all undisputed line items and submit written notice within five (5) days.',
    counterAssertive: 'Withholding of fees or unilateral offset is strictly prohibited. Any disputed amount must be deposited into an escrow account pending formal resolution.'
  },
  {
    id: 'PAY-06',
    vectorId: 'payment',
    name: 'Mandatory Unreimbursable Expenses',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(all\s+expenses\s+borne\s+solely\s+by\s+contractor|no\s+reimbursement\s+for\s+travel\s+or\s+licensing)/i,
    explanation: 'Obligates the contractor to absorb unpredictable project disbursements such as third-party API subscriptions, software licenses, and client travel.',
    counterCollaborative: 'Pre-approved direct out-of-pocket project expenses, including specialized software licenses and travel, shall be reimbursed at actual cost within fifteen (15) days.',
    counterFirm: 'Client shall reimburse Contractor for all pre-approved out-of-pocket project disbursements, hosting, and API subscription costs upon receipt of itemized expense receipts.',
    counterAssertive: 'All third-party infrastructure, font licenses, SaaS subscriptions, and travel expenses shall be funded directly by Client or reimbursed with a 15% procurement handling fee.'
  },

  // -------------------------------------------------------------------------
  // VECTOR 4: Premature Intellectual Property Assignment
  // -------------------------------------------------------------------------
  {
    id: 'IP-01',
    vectorId: 'ip',
    name: 'Work Made For Hire Upon Creation',
    severity: 'CRITICAL',
    penalty: 25,
    pattern: /(work\s+(made\s+)?for\s+hire|property\s+of\s+client\s+immediately\s+upon\s+creation|assigns?\s+all\s+rights?\s+as\s+created)/i,
    explanation: 'Legal title to all code, designs, and assets transfers to the client the instant they are written, eliminating all contractor leverage if the client defaults on payment.',
    counterCollaborative: 'Upon receipt of full and final payment, Contractor assigns to Client all right, title, and interest in the custom deliverables created under this SOW.',
    counterFirm: "Ownership and intellectual property rights in the Work Product shall transfer to Client exclusively and conditionally upon Contractor's receipt of full and final cleared payment.",
    counterAssertive: 'Title and copyright in all work product remain the exclusive property of Contractor until all invoices are satisfied in full. Any interim client deployment without full payment constitutes willful copyright infringement.'
  },
  {
    id: 'IP-02',
    vectorId: 'ip',
    name: 'Forfeiture of Pre-Existing Background IP & Toolkits',
    severity: 'CRITICAL',
    penalty: 25,
    pattern: /(assigns?\s+all\s+(prior|pre-existing|background)\s+(ip|code|tools|libraries)|relinquishes\s+all\s+proprietary\s+frameworks)/i,
    explanation: 'Forces the developer or agency to surrender their foundational libraries, starter templates, and code modules, making it illegal to build for future clients.',
    counterCollaborative: 'Contractor retains all rights to pre-existing code, tools, and methodologies, granting Client a perpetual, non-exclusive license to use them with the deliverable.',
    counterFirm: "Contractor retains sole ownership of all pre-existing IP, frameworks, tools, and libraries ('Background IP'). Client is granted a non-exclusive, royalty-free, perpetual license solely to run the deliverables.",
    counterAssertive: "Background IP, developer toolkits, starter boilerplate, and recurring methodologies are expressly excluded from assignment and remain Contractor's exclusive trade secrets."
  },
  {
    id: 'IP-03',
    vectorId: 'ip',
    name: 'Broad Waiver of Moral Rights',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(waives?\s+(all\s+)?moral\s+rights|irrevocably\s+waives?\s+paternity)/i,
    explanation: "Eliminates the creator's legal right to be credited for their work or to showcase non-confidential project screenshots in their professional portfolio.",
    counterCollaborative: 'Contractor retains the right to display non-confidential project deliverables in professional portfolios and case studies following public launch.',
    counterFirm: 'Contractor retains the right to reference the project and showcase public deliverables in its portfolio and marketing collateral, subject to mutual confidentiality.',
    counterAssertive: 'Contractor reserves full credit rights and portfolio display rights. Client shall not obfuscate author attributions embedded in source comments.'
  },
  {
    id: 'IP-04',
    vectorId: 'ip',
    name: 'Forfeiture of Incomplete / Unpaid Work Product',
    severity: 'WARNING',
    penalty: 15,
    pattern: /(in\s+the\s+event\s+of\s+termination.*client\s+owns\s+all\s+drafts|deliver\s+all\s+work\s+in\s+progress\s+regardless\s+of\s+payment)/i,
    explanation: 'Requires handing over work-in-progress drafts and code repositories upon contract cancellation even if the client terminates without paying the termination fee.',
    counterCollaborative: 'In the event of termination, work-in-progress will be delivered to Client strictly in proportion to invoices cleared and settled.',
    counterFirm: 'Delivery of work-in-progress upon contract termination is conditioned upon payment of a pro-rated termination fee covering all hours accrued to date.',
    counterAssertive: 'Unfinished assets and raw repositories shall not be released unless Client pays an early termination fee equal to 50% of the remaining contract balance.'
  },
  {
    id: 'IP-05',
    vectorId: 'ip',
    name: 'Assignment of Future Ideas & Non-Project Inventions',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(assigns?\s+all\s+(future|unrelated)\s+inventions|inventions\s+conceived\s+during\s+the\s+term\s+whether\s+related\s+or\s+not)/i,
    explanation: 'Captures any unrelated software products, side projects, or startup ideas the contractor creates while under contract.',
    counterCollaborative: 'Assignment is strictly limited to deliverables created specifically for Client under an executed Statement of Work.',
    counterFirm: 'Intellectual property assignment shall apply exclusively to custom work product developed directly under and during authorized hours for this project, excluding independent innovations.',
    counterAssertive: 'Contractor expressly excludes all independent software, personal projects, and unrelated inventions conceived outside direct project scope.'
  },

  // -------------------------------------------------------------------------
  // VECTOR 5: Restrictive Covenants & Non-Compete Overreach
  // -------------------------------------------------------------------------
  {
    id: 'REST-01',
    vectorId: 'restrictive',
    name: 'Post-Termination Non-Compete Restriction',
    severity: 'CRITICAL',
    penalty: 25,
    pattern: /(shall\s+not\s+(directly\s+or\s+indirectly\s+)?(compete|engage\s+in\s+any\s+business)|non-?competition\s+covenant)/i,
    explanation: 'Restricts the freelancer or agency from taking clients in their specialized industry vertical, paralyzing their livelihood for months or years after project completion.',
    counterCollaborative: 'Client acknowledges that Contractor provides similar technical services to other clients and agrees Contractor is not subject to non-competition restrictions.',
    counterFirm: 'Contractor is an independent contractor, not an employee. Nothing in this Agreement shall restrict Contractor from offering services to other clients, including competitors in the same industry.',
    counterAssertive: 'Non-compete provisions are expressly rejected and struck in their entirety. Contractor operates as an open-market professional services firm.'
  },
  {
    id: 'REST-02',
    vectorId: 'restrictive',
    name: 'Excessive Non-Solicitation Duration (> 12 Months)',
    severity: 'WARNING',
    penalty: 15,
    pattern: /(non-?solicitation\s+for\s+(twenty-four|24|36|three\s+years|two\s+years)|shall\s+not\s+solicit.*(24|36)\s+months)/i,
    explanation: 'An overreaching 2 to 3-year restriction preventing the agency from hiring subcontractors or communicating with mutual professional contacts.',
    counterCollaborative: 'Non-solicitation of direct client employees shall be limited to a mutual duration of twelve (12) months following project completion.',
    counterFirm: 'Neither party shall actively solicit for employment any employee of the other party involved in the project for a period of twelve (12) months. General public job postings are exempt.',
    counterAssertive: 'Non-solicitation shall be strictly reciprocal and limited to six (6) months post-completion, excluding any contractor or personnel responding to general public advertisements.'
  },
  {
    id: 'REST-03',
    vectorId: 'restrictive',
    name: 'Uncompensated Exclusivity Mandate',
    severity: 'CRITICAL',
    penalty: 20,
    pattern: /(exclusive\s+services|shall\s+not\s+perform\s+services\s+for\s+any\s+other\s+entity|devote\s+full\s+time\s+and\s+attention\s+exclusively)/i,
    explanation: 'Demands full-time exclusivity without providing an employee salary or guaranteed minimum billing retainer.',
    counterCollaborative: 'Contractor will allocate the agreed project hours while retaining the right to perform professional services for other commercial clients.',
    counterFirm: 'Contractor maintains the right to perform services for multiple commercial clients concurrently, provided such engagements do not breach confidentiality obligations.',
    counterAssertive: 'Contractor retains full independence. Exclusivity requests require an advance monthly retainer minimum of $18,000 paid prior to each calendar period.'
  },
  {
    id: 'REST-04',
    vectorId: 'restrictive',
    name: 'Overbroad Geographic Territory',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(worldwide\s+territory|anywhere\s+in\s+the\s+world|global\s+restriction)/i,
    explanation: 'Applies restrictions across the entire world, preventing international remote consulting opportunities.',
    counterCollaborative: "Any covenant shall be narrowly confined to the specific metropolitan area of Client's primary operational headquarters.",
    counterFirm: "Territorial covenants are limited strictly to the direct local market of Client's verified physical headquarters.",
    counterAssertive: 'Global or multi-state territorial restrictions are invalid and hereby excised from this Agreement.'
  },
  {
    id: 'REST-05',
    vectorId: 'restrictive',
    name: 'Perpetual Non-Disparagement Gag Order',
    severity: 'WARNING',
    penalty: 10,
    pattern: /(shall\s+never\s+disparage|perpetual\s+non-disparagement|prohibited\s+from\s+making\s+any\s+negative\s+statement)/i,
    explanation: 'A one-way permanent gag order preventing honest reviews or legal testimony while leaving the client free to criticize the contractor.',
    counterCollaborative: 'Both parties agree to treat each other respectfully and avoid disparaging public remarks during the contract term.',
    counterFirm: 'Non-disparagement obligations shall be strictly mutual, terminating twelve (12) months following contract completion, with standard safe harbors for legal compliance.',
    counterAssertive: 'One-way non-disparagement covenants are rejected. Any disparagement covenant must be bilaterally reciprocal and expire upon final project payment.'
  }
];

/**
 * Splits text into sentences/clauses for granular pattern matching.
 */
function extractSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?;\n])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
}

/**
 * Deterministically scans contract text against all 28 rules across 5 threat vectors.
 */
export function scanContract(rawText: string, isPro: boolean = false) {
  const sentences = extractSentences(rawText);
  const detectedFlags: DetectedFlag[] = [];
  const triggeredRuleIds = new Set<string>();

  for (const rule of SCANNER_RULES) {
    // Check both per-sentence and against the entire text
    let matchedSnippet = '';

    for (const sentence of sentences) {
      if (rule.pattern.test(sentence)) {
        matchedSnippet = sentence;
        break;
      }
    }

    if (!matchedSnippet && rule.pattern.test(rawText)) {
      // Find the approximate matching segment
      const match = rawText.match(rule.pattern);
      if (match && match.index !== undefined) {
        const start = Math.max(0, match.index - 40);
        const end = Math.min(rawText.length, match.index + match[0].length + 60);
        matchedSnippet = rawText.substring(start, end).trim();
      }
    }

    if (matchedSnippet && !triggeredRuleIds.has(rule.id)) {
      triggeredRuleIds.add(rule.id);
      detectedFlags.push({
        id: `flag_${rule.id.toLowerCase()}_${Math.random().toString(36).substring(2, 7)}`,
        ruleId: rule.id,
        vectorId: rule.vectorId,
        name: rule.name,
        severity: rule.severity,
        originalText: matchedSnippet,
        explanation: rule.explanation,
        counterClauseCollaborative: isPro
          ? rule.counterCollaborative
          : rule.counterCollaborative.slice(0, 48) + '... [Unlock with Pro Pass]',
        counterClauseFirm: isPro
          ? rule.counterFirm
          : rule.counterFirm.slice(0, 48) + '... [Unlock with Pro Pass]',
        counterClauseAssertive: isPro
          ? rule.counterAssertive
          : rule.counterAssertive.slice(0, 48) + '... [Unlock with Pro Pass]',
        isLocked: !isPro
      });
    }
  }

  // Calculate Mathematical Protection Index
  let penaltyTotal = 0;
  let criticalCount = 0;
  let warningCount = 0;
  let safeCount = 0;

  for (const flag of detectedFlags) {
    const rule = SCANNER_RULES.find((r) => r.id === flag.ruleId);
    if (rule) {
      penaltyTotal += rule.penalty;
    }
    if (flag.severity === 'CRITICAL') criticalCount++;
    if (flag.severity === 'WARNING') warningCount++;
  }

  // Bonus points for protective terms
  const hasMutualLiabilityCap = /(mutual\s+liability\s+cap|liability\s+limited\s+to\s+fees\s+paid)/i.test(rawText);
  const hasNet15Or30 = /(net\s*(15|30)|payment\s+within\s+(fifteen|thirty)\s+days)/i.test(rawText);
  const hasConditionalIp = /(ip\s+transfers\s+upon\s+(full\s+)?payment|upon\s+cleared\s+settlement)/i.test(rawText);

  let safeBonus = 0;
  if (hasMutualLiabilityCap) { safeBonus += 5; safeCount++; }
  if (hasNet15Or30) { safeBonus += 5; safeCount++; }
  if (hasConditionalIp) { safeBonus += 5; safeCount++; }

  const calculatedScore = Math.max(0, Math.min(100, 100 - penaltyTotal + safeBonus));

  let overallRiskLevel: RiskSeverity = 'SAFE';
  if (calculatedScore < 50 || criticalCount >= 2) {
    overallRiskLevel = 'CRITICAL';
  } else if (calculatedScore < 80 || warningCount >= 2) {
    overallRiskLevel = 'WARNING';
  }

  // Build Vector Summary Breakdown
  const vectorBreakdown: VectorSummary[] = (Object.keys(THREAT_VECTORS) as ThreatVectorId[]).map((vId) => {
    const vFlags = detectedFlags.filter((f) => f.vectorId === vId);
    const vCriticals = vFlags.filter((f) => f.severity === 'CRITICAL').length;
    const vWarnings = vFlags.filter((f) => f.severity === 'WARNING').length;

    let vSeverity: RiskSeverity = 'SAFE';
    if (vCriticals > 0) vSeverity = 'CRITICAL';
    else if (vWarnings > 0) vSeverity = 'WARNING';

    const vPenalty = vFlags.reduce((acc, f) => {
      const r = SCANNER_RULES.find((rule) => rule.id === f.ruleId);
      return acc + (r ? r.penalty : 0);
    }, 0);

    const riskScore = Math.max(0, 100 - vPenalty);

    return {
      vectorId: vId,
      name: THREAT_VECTORS[vId].name,
      severity: vSeverity,
      riskScore,
      flagCount: vFlags.length,
      flags: vFlags
    };
  });

  return {
    protectionIndex: calculatedScore,
    riskLevel: overallRiskLevel,
    summary: {
      criticalCount,
      warningCount,
      safeCount
    },
    vectorBreakdown,
    flags: detectedFlags
  };
}
