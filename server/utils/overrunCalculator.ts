import type { OverrunParams, OverrunCalculationResponse } from '~/types';

export function calculateOverrunRisk(params: OverrunParams): OverrunCalculationResponse {
  const baseFee = Number(params.baseFee) || 12000;
  const estimatedHours = Math.max(1, Number(params.estimatedHours) || 80);
  const targetHourlyRate = Math.max(1, Number(params.targetHourlyRate) || 150);
  const includedRevisions = Math.max(0, Number(params.includedRevisions) || 2);
  const anticipatedRevisions = Math.max(0, Number(params.anticipatedRevisions) || 5);
  const clientReviewWindowDays = Math.max(1, Number(params.clientReviewWindowDays) || 5);

  const extraRevisionRounds = Math.max(0, anticipatedRevisions - includedRevisions);
  // Calculate average hours per revision cycle (typically 8 to 12% of total project scope)
  const hoursPerRevisionCycle = Math.max(4, Math.round(estimatedHours * 0.10));
  const unbilledOverrunHours = extraRevisionRounds * hoursPerRevisionCycle;
  const calculatedDownsideLoss = unbilledOverrunHours * targetHourlyRate;

  const totalRealizedHours = estimatedHours + unbilledOverrunHours;
  const effectiveRealizedRate = Math.round((baseFee / totalRealizedHours) * 100) / 100;
  const rawDegradation = ((effectiveRealizedRate - targetHourlyRate) / targetHourlyRate) * 100;
  const rateDegradationPercent = Math.round(rawDegradation * 10) / 10;
  const recommendedBufferFee = Math.round(baseFee * 0.20);

  const deemedDays = clientReviewWindowDays;
  const slaText = `SCOPE CONTAINMENT & REVISION SLA ADDENDUM

1. REVISION ROUND ENTITLEMENT
The fixed compensation of $${baseFee.toLocaleString()} includes up to exactly ${includedRevisions} (${includedRevisions === 1 ? 'one' : includedRevisions === 2 ? 'two' : includedRevisions.toString()}) consolidated rounds of revisions. Stakeholder feedback must be synthesized and delivered in a single consolidated written brief per milestone.

2. TIMELY REVIEW & DEEMED ACCEPTANCE
Client shall provide consolidated written feedback within ${clientReviewWindowDays} (${clientReviewWindowDays.toString()}) business days of deliverable submission. In the event Client does not provide written itemized objections within this ${deemedDays}-day inspection window, the milestone deliverables shall be deemed irrevocably accepted and approved for billing.

3. MANDATORY HOURLY OVERRUN RATES
Any modification, structural alteration, or revision requested beyond the included ${includedRevisions} rounds, or requested subsequent to milestone acceptance, shall constitute an out-of-scope Change Order and will be billed at Contractor's overrun rate of $${targetHourlyRate}/hour. Out-of-scope iterations will be invoiced bi-weekly on Net-14 terms.`;

  return {
    metrics: {
      unbilledOverrunHours,
      calculatedDownsideLoss,
      effectiveRealizedRate,
      rateDegradationPercent,
      recommendedBufferFee,
      totalRealizedHours
    },
    protectiveSlaClause: {
      title: 'Protective Scope Containment & Revision SLA Rider',
      clauseText: slaText,
      parameters: {
        includedRounds: includedRevisions,
        hourlyOverrunRate: targetHourlyRate,
        reviewTurnaroundDays: clientReviewWindowDays,
        deemedApprovalPeriodDays: deemedDays
      }
    }
  };
}
