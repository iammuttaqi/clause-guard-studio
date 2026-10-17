import type { NegotiationPosture, CounterClauseResponse } from '~/types';
import { SCANNER_RULES } from './scanner';

/**
 * Computes a simple word-based diff between original predatory text and protective counter-clause.
 */
export function computeWordDiff(original: string, counter: string): {
  additions: number;
  deletions: number;
  highlightedHtml: string;
} {
  const origWords = original.trim().split(/\s+/);
  const counterWords = counter.trim().split(/\s+/);

  const origSet = new Set(origWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, '')));
  const counterSet = new Set(counterWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, '')));

  let additions = 0;
  let deletions = 0;

  // Render original text with deleted words highlighted
  const deletedParts = origWords.map((word) => {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!counterSet.has(clean) && clean.length > 2) {
      deletions++;
      return `<del class="bg-crimson-50 text-crimson-700 line-through px-1 py-0.5 rounded border border-crimson-200 mx-0.5">${word}</del>`;
    }
    return word;
  }).join(' ');

  // Render counter text with added protective words highlighted
  const addedParts = counterWords.map((word) => {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!origSet.has(clean) && clean.length > 2) {
      additions++;
      return `<ins class="bg-emerald-50 text-emerald-800 font-medium no-underline px-1 py-0.5 rounded border border-emerald-200 mx-0.5">${word}</ins>`;
    }
    return word;
  }).join(' ');

  const highlightedHtml = `
    <div class="space-y-3 font-mono-code text-xs leading-relaxed">
      <div class="p-3 bg-crimson-50/50 rounded border border-crimson-100">
        <span class="block text-[10px] font-semibold tracking-wider text-crimson-700 uppercase mb-1">Original Terms (Marked for Strike):</span>
        <p class="text-ink-secondary">${deletedParts}</p>
      </div>
      <div class="p-3 bg-emerald-50/50 rounded border border-emerald-100">
        <span class="block text-[10px] font-semibold tracking-wider text-emerald-700 uppercase mb-1">Proposed Protective Redline:</span>
        <p class="text-ink-primary font-medium">${addedParts}</p>
      </div>
    </div>
  `.trim();

  return {
    additions,
    deletions,
    highlightedHtml
  };
}

/**
 * Generates tailored email snippets and strategic rationales based on negotiation posture.
 */
function getNegotiationContext(ruleName: string, posture: NegotiationPosture): {
  emailSnippet: string;
  strategicRationale: string;
} {
  switch (posture) {
    case 'collaborative':
      return {
        emailSnippet: `Hi Team, excited to move forward with this project! We reviewed the initial draft and suggested a slight adjustment to the "${ruleName}" section to align with our standard insurance carrier requirements. Please let us know if the proposed wording works for your team.`,
        strategicRationale: 'Frames the change around external vendor compliance and insurance prerequisites, preventing interpersonal friction while securing essential legal safeguards.'
      };
    case 'firm':
      return {
        emailSnippet: `Regarding Section "${ruleName}": We require standard commercial reciprocity. As an independent professional services firm, our practice limits aggregate liabilities and ties intellectual property transfer to invoice clearance. Please accept our redline to complete execution.`,
        strategicRationale: 'Presents industry-standard commercial norms. Clear, non-negotiable boundaries framed with professional authority that corporate legal teams routinely approve.'
      };
    case 'assertive':
      return {
        emailSnippet: `We have redlined Section "${ruleName}". Our commercial terms strictly disclaim unilateral indemnification, uncapped liabilities, and premature title conveyance. This redline is a prerequisite for our firm undertaking technical deliverables under this SOW.`,
        strategicRationale: 'Direct corporate stance suited for enterprise procurement departments testing contractor boundaries. Signals sophisticated commercial representation and eliminates predatory contractual drift.'
      };
  }
}

/**
 * Generates calibrated counter-clause responses.
 */
export function generateCounterClause(
  flagId: string,
  clauseType: string,
  posture: NegotiationPosture,
  originalText: string,
  ruleId?: string,
  isPro: boolean = false
): CounterClauseResponse {
  const rule = SCANNER_RULES.find((r) => r.id === ruleId || r.vectorId === clauseType);

  let rawCounter = '';
  const ruleName = rule ? rule.name : 'Contractual Terms';

  if (rule) {
    if (posture === 'collaborative') rawCounter = rule.counterCollaborative;
    else if (posture === 'assertive') rawCounter = rule.counterAssertive;
    else rawCounter = rule.counterFirm;
  } else {
    rawCounter = "Each party's aggregate liability under this Agreement shall be limited to direct damages and shall not exceed the total fees paid or payable by Client to Contractor under the applicable Statement of Work.";
  }

  const diff = computeWordDiff(originalText, rawCounter);
  const context = getNegotiationContext(ruleName, posture);

  const finalCounter = isPro
    ? rawCounter
    : rawCounter.slice(0, 48) + '... [Unlock with Pro Pass to view complete text and export redline]';

  return {
    flagId,
    clauseType,
    posture,
    counterText: finalCounter,
    originalText,
    diffSummary: diff,
    negotiationContext: context,
    isLocked: !isPro
  };
}
