import { defineEventHandler, readBody } from 'h3';
import { getCustomerSession } from '~/server/utils/customer';
import { generateCounterClause } from '~/server/utils/counterEngine';
import type { CounterClauseResponse, NegotiationPosture } from '~/types';

export default defineEventHandler(async (event): Promise<CounterClauseResponse> => {
  const body = await readBody(event);
  const flagId = body?.flagId || 'flag_default';
  const clauseType = body?.clauseType || 'liability';
  const posture = (body?.posture || 'firm') as NegotiationPosture;
  const originalText = body?.originalText || '';
  const ruleId = body?.ruleId;

  const customer = await getCustomerSession(event);
  const isPro = customer.tier === 'PRO' || customer.tier === 'LIFETIME';

  return generateCounterClause(
    flagId,
    clauseType,
    posture,
    originalText,
    ruleId,
    isPro
  );
});
