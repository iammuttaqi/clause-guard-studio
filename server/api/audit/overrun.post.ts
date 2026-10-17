import { defineEventHandler, readBody } from 'h3';
import { calculateOverrunRisk } from '~/server/utils/overrunCalculator';
import { getPrismaClient } from '~/server/utils/prisma';
import type { OverrunCalculationResponse } from '~/types';

export default defineEventHandler(async (event): Promise<OverrunCalculationResponse> => {
  const body = await readBody(event);
  const auditId = body?.auditId;

  const result = calculateOverrunRisk({
    baseFee: Number(body?.baseFee) || 12000,
    estimatedHours: Number(body?.estimatedHours) || 80,
    targetHourlyRate: Number(body?.targetHourlyRate) || 150,
    includedRevisions: Number(body?.includedRevisions) || 2,
    anticipatedRevisions: Number(body?.anticipatedRevisions) || 5,
    clientReviewWindowDays: Number(body?.clientReviewWindowDays) || 5
  });

  if (auditId) {
    try {
      const prisma = getPrismaClient();
      await prisma.overrunScenario.upsert({
        where: { auditId },
        update: {
          baseFee: Number(body?.baseFee) || 12000,
          includedRevisions: Number(body?.includedRevisions) || 2,
          hourlyOverrunRate: Number(body?.targetHourlyRate) || 150,
          calculatedDownside: result.metrics.calculatedDownsideLoss,
          bufferFee: result.metrics.recommendedBufferFee
        },
        create: {
          auditId,
          baseFee: Number(body?.baseFee) || 12000,
          includedRevisions: Number(body?.includedRevisions) || 2,
          hourlyOverrunRate: Number(body?.targetHourlyRate) || 150,
          calculatedDownside: result.metrics.calculatedDownsideLoss,
          bufferFee: result.metrics.recommendedBufferFee
        }
      });
    } catch (err) {
      console.warn('[Overrun Persistence] Notice saving scenario:', err);
    }
  }

  return result;
});
