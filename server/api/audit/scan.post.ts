import { defineEventHandler, readBody, createError } from 'h3';
import { getCustomerSession } from '~/server/utils/customer';
import { getPrismaClient } from '~/server/utils/prisma';
import { scanContract } from '~/server/utils/scanner';
import type { ScanContractResponse } from '~/types';

export default defineEventHandler(async (event): Promise<ScanContractResponse> => {
  const body = await readBody(event);
  const rawText = (body?.rawText || '').trim();
  const title = (body?.title || 'Commercial Agreement').trim();
  const contractType = body?.contractType || 'msa';

  if (rawText.length < 100) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Contract text must be at least 100 characters in length to execute lexical risk analysis.'
    });
  }

  const customer = await getCustomerSession(event);
  const prisma = getPrismaClient();
  const isPro = customer.tier === 'PRO' || customer.tier === 'LIFETIME';

  // Enforce monthly quota limit for Free users
  if (!isPro && customer.usageCount >= customer.quotaLimit) {
    throw createError({
      statusCode: 402,
      statusMessage: 'Monthly Quota Exceeded',
      data: {
        tier: customer.tier,
        usageCount: customer.usageCount,
        quotaLimit: customer.quotaLimit,
        message: 'You have utilized all 3 complimentary monthly contract scans. Upgrade to Pro for unlimited audits.'
      }
    });
  }

  // Increment usage count for Free user
  if (!isPro) {
    await prisma.customer.update({
      where: { id: customer.id },
      data: { usageCount: customer.usageCount + 1 }
    });
  }

  // Execute deterministic lexical scan
  const scanResult = scanContract(rawText, isPro);
  const words = rawText.split(/\s+/).filter(Boolean).length;

  // Persist audit record in SQLite
  const auditId = `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  try {
    await prisma.contractAudit.create({
      data: {
        id: auditId,
        customerId: customer.id,
        title,
        contractType,
        rawText,
        overallScore: scanResult.protectionIndex,
        riskLevel: scanResult.riskLevel,
        clauseFlags: {
          create: scanResult.flags.map((flag) => ({
            id: flag.id,
            originalText: flag.originalText,
            clauseType: flag.vectorId,
            severity: flag.severity,
            explanation: flag.explanation,
            counterClauseCollaborative: flag.counterClauseCollaborative,
            counterClauseFirm: flag.counterClauseFirm,
            counterClauseAssertive: flag.counterClauseAssertive
          }))
        }
      }
    });
  } catch (err) {
    console.warn('[Audit Persistence] Notice saving record:', err);
  }

  const updatedUsageCount = isPro ? customer.usageCount : customer.usageCount + 1;
  const remainingScans = isPro ? 999999 : Math.max(0, customer.quotaLimit - updatedUsageCount);

  return {
    auditId,
    title,
    contractType,
    characterCount: rawText.length,
    wordCount: words,
    protectionIndex: scanResult.protectionIndex,
    riskLevel: scanResult.riskLevel,
    summary: scanResult.summary,
    vectorBreakdown: scanResult.vectorBreakdown,
    flags: scanResult.flags,
    customer: {
      tier: customer.tier as 'FREE' | 'PRO' | 'LIFETIME',
      usageCount: updatedUsageCount,
      quotaLimit: customer.quotaLimit,
      remainingScans
    }
  };
});
