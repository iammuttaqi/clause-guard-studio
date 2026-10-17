export interface SampleContract {
  id: string;
  title: string;
  category: 'Enterprise MSA' | 'Agency Design SOW' | 'Consulting Retainer' | 'Mutual NDA';
  contractType: 'msa' | 'sow' | 'retainer' | 'nda' | 'custom';
  description: string;
  wordCount: number;
  simulatedRiskLevel: 'CRITICAL' | 'WARNING';
  estimatedProtectionIndex: number;
  rawText: string;
}

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: 'sample-msa',
    title: 'Enterprise Master Services Agreement (Vendor Standard)',
    category: 'Enterprise MSA',
    contractType: 'msa',
    description: 'Procurement-drafted enterprise MSA with uncapped consequential liability, unilateral indemnity, and 90-day payment lag.',
    wordCount: 420,
    simulatedRiskLevel: 'CRITICAL',
    estimatedProtectionIndex: 28,
    rawText: `MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is entered into by and between Enterprise Apex Corp ("Client") and Contractor ("Vendor").

1. SERVICES AND WORK PRODUCT
Contractor shall perform services detailed in attached Statements of Work. Contractor acknowledges and agrees that all deliverables, code, scripts, software, and inventions shall be deemed a "work made for hire upon creation", and the sole and absolute property of Client immediately upon creation. Contractor assigns all rights, title, and pre-existing IP and frameworks without limitation.

2. UNLIMITED LIABILITY AND INDEMNIFICATION
Contractor shall indemnify, defend, and hold harmless Client, its officers, affiliates, and customers from any and all claims, liabilities, losses, costs, or damages without limitation. Furthermore, Contractor agrees that indirect, consequential, punitive, special, and lost profits damages shall be recoverable against Contractor under any theory of law.

3. INTELLECTUAL PROPERTY WARRANTIES
Contractor warrants that all deliverables will not infringe, misappropriate, or violate any third-party patent, copyright, or trade secret worldwide. Contractor agrees to defend and hold harmless Client against all third-party infringement allegations without financial limit. Contractor warrants deliverables in perpetuity.

4. PAYMENT TERMS AND AUDIT
Client shall remit payment within ninety (90) days of receiving an undisputed invoice (Net 90). Payment to Contractor is contingent upon Client's receipt of payment from the ultimate end customer. Client reserves the right to unilaterally withhold any payments and set-off any amounts for alleged contractor deficiencies.

5. RESTRICTIVE COVENANTS
During the term of this Agreement and for a period of twenty-four (24) months thereafter, Contractor shall not directly or indirectly compete or engage in any business within the enterprise cloud software sector anywhere in the worldwide territory.`
  },
  {
    id: 'sample-sow',
    title: 'Agency Design & Web Development Statement of Work',
    category: 'Agency Design SOW',
    contractType: 'sow',
    description: 'Fixed-fee creative SOW containing subjective "satisfaction" sign-offs, unlimited revision loops, and paid-when-paid subcontractor traps.',
    wordCount: 360,
    simulatedRiskLevel: 'WARNING',
    estimatedProtectionIndex: 44,
    rawText: `STATEMENT OF WORK: BRAND IDENTITY & DIGITAL PLATFORM

Project Sponsor: Horizon Ventures LLC ("Client")
Agency Provider: Studio Craft Digital ("Agency")
Fixed Project Fee: $16,500 USD

1. SCOPE AND REVISIONS
Agency shall deliver complete brand identity guidelines, design systems, and web application frontend code. Deliverables must be completed to the Client's sole satisfaction and in the Client's sole discretion. The fixed project fee includes unlimited revisions and Agency shall revise until approved by Client leadership, with further modifications provided at no additional cost.

2. ACCEPTANCE REVIEW PERIOD
Agency shall submit final milestones for Client inspection. Client shall review deliverables, but Client review period shall not be deemed accepted or automatically accepted without affirmative written sign-off from Client's Managing Director. Agency shall promptly correct all errors and bugs at no charge throughout a warranty period of one year.

3. COMPENSATION AND PAYMENT
Client will disburse milestone payments on a Net 60 schedule. Payment to Agency is contingent upon Client receiving payment from funding syndicate partners. Invoices shall be paid upon mutual review without late interest or late fees. Agency shall continue performing services during any dispute and shall not suspend work.

4. MORAL RIGHTS & PORTFOLIO
Agency irrevocably waives all moral rights and paternity in the designs. Agency shall not publish, reference, or display any deliverables or case studies in any agency portfolio or promotional materials.`
  },
  {
    id: 'sample-retainer',
    title: 'Executive Advisory & Technical Consulting Retainer',
    category: 'Consulting Retainer',
    contractType: 'retainer',
    description: 'Advisory retainer with uncompensated exclusivity, 2-year non-compete covenants, and broad forfeiture of background methodologies.',
    wordCount: 310,
    simulatedRiskLevel: 'CRITICAL',
    estimatedProtectionIndex: 35,
    rawText: `STRATEGIC ADVISORY RETAINER AGREEMENT

Client: Quantum Capital Management
Consultant: Strategic Advisory Group LLC
Monthly Retainer: $8,500 / month

1. CONSULTING SERVICES & EXCLUSIVITY
Consultant shall provide strategic technology advisory services to Client. Consultant shall provide exclusive services to Client and shall not perform services for any other entity in the asset management or FinTech domain, devoting full time and attention exclusively to Client initiatives.

2. PROPRIETARY TOOLS & TERMINATION
Consultant assigns all prior, pre-existing, and background IP, code, tools, and methodologies utilized in the advisory engagement to Client. In the event of termination, Client owns all drafts and Consultant shall deliver all work in progress regardless of payment or settlement of pending invoices.

3. RESTRICTIVE COVENANTS & NON-COMPETITION
Consultant shall not directly or indirectly compete with Client or advise any competing enterprise in North America or Europe for a period of twenty-four (24) months post-termination. Non-solicitation for thirty-six (36) months shall apply to all Client personnel, vendors, and affiliates.

4. INDEMNITY & WITHHOLDING
Consultant shall indemnify, defend, and hold harmless Client against any business losses or regulatory inquiries. Client may withhold any payments and deduct from fees any claimed offset without prior notice.`
  },
  {
    id: 'sample-nda',
    title: 'Unilateral Enterprise Non-Disclosure & IP Assignment',
    category: 'Mutual NDA',
    contractType: 'nda',
    description: 'Deceptive NDA masquerading as a confidentiality agreement while embedding sneaky work-for-hire and uncompensated non-compete terms.',
    wordCount: 290,
    simulatedRiskLevel: 'CRITICAL',
    estimatedProtectionIndex: 40,
    rawText: `CONFIDENTIALITY AND PROPRIETARY INFORMATION AGREEMENT

Disclosing Party: Global Industrial Systems Corp ("Discloser")
Receiving Party: Contractor / Advisor ("Recipient")

1. CONFIDENTIAL INFORMATION
Confidential Information includes all technical, commercial, financial, and operational information disclosed by Discloser. Recipient shall hold all information in strict confidence in perpetuity.

2. COVENANT NOT TO COMPETE
In consideration of receiving Confidential Information, Recipient shall not engage in any competing commercial activity or provide consulting services to any entity in Discloser's operational domain throughout the worldwide territory for a period of two (2) years.

3. ASSIGNMENT OF INVENTIONS
Recipient agrees that any and all concepts, designs, software prototypes, and improvements conceived during discussions shall be deemed work made for hire upon creation, and Recipient assigns all rights as created to Discloser without limitation.

4. INDEMNIFICATION AND REMEDIES
Recipient shall indemnify, defend, and hold harmless Discloser from any and all damages without limitation, including lost profits, consequential damages, and attorneys' fees resulting from any alleged breach of this Agreement.`
  }
];
