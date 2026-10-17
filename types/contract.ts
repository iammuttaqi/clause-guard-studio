export type RiskSeverity = 'CRITICAL' | 'WARNING' | 'SAFE';

export type ThreatVectorId = 'liability' | 'scope' | 'payment' | 'ip' | 'restrictive';

export type NegotiationPosture = 'collaborative' | 'firm' | 'assertive';

export type ContractCategory = 'msa' | 'sow' | 'retainer' | 'nda' | 'custom';

export interface ScannerRule {
  id: string;
  vectorId: ThreatVectorId;
  name: string;
  severity: RiskSeverity;
  penalty: number;
  pattern: RegExp;
  explanation: string;
  counterCollaborative: string;
  counterFirm: string;
  counterAssertive: string;
}

export interface DetectedFlag {
  id: string;
  ruleId: string;
  vectorId: ThreatVectorId;
  name: string;
  severity: RiskSeverity;
  originalText: string;
  explanation: string;
  counterClauseCollaborative: string;
  counterClauseFirm: string;
  counterClauseAssertive: string;
  isLocked: boolean;
}

export interface VectorSummary {
  vectorId: ThreatVectorId;
  name: string;
  severity: RiskSeverity;
  riskScore: number;
  flagCount: number;
  flags: DetectedFlag[];
}

export interface ScanContractResponse {
  auditId: string;
  title: string;
  contractType: string;
  characterCount: number;
  wordCount: number;
  protectionIndex: number;
  riskLevel: RiskSeverity;
  summary: {
    criticalCount: number;
    warningCount: number;
    safeCount: number;
  };
  vectorBreakdown: VectorSummary[];
  flags: DetectedFlag[];
  customer: {
    tier: 'FREE' | 'PRO' | 'LIFETIME';
    usageCount: number;
    quotaLimit: number;
    remainingScans: number;
  };
}

export interface CounterClauseResponse {
  flagId: string;
  clauseType: string;
  posture: NegotiationPosture;
  counterText: string;
  originalText: string;
  diffSummary: {
    additions: number;
    deletions: number;
    highlightedHtml: string;
  };
  negotiationContext: {
    emailSnippet: string;
    strategicRationale: string;
  };
  isLocked: boolean;
}

export interface OverrunParams {
  baseFee: number;
  estimatedHours: number;
  targetHourlyRate: number;
  includedRevisions: number;
  anticipatedRevisions: number;
  clientReviewWindowDays: number;
}

export interface OverrunMetrics {
  unbilledOverrunHours: number;
  calculatedDownsideLoss: number;
  effectiveRealizedRate: number;
  rateDegradationPercent: number;
  recommendedBufferFee: number;
  totalRealizedHours: number;
}

export interface ProtectiveSlaClause {
  title: string;
  clauseText: string;
  parameters: {
    includedRounds: number;
    hourlyOverrunRate: number;
    reviewTurnaroundDays: number;
    deemedApprovalPeriodDays: number;
  };
}

export interface OverrunCalculationResponse {
  metrics: OverrunMetrics;
  protectiveSlaClause: ProtectiveSlaClause;
}
