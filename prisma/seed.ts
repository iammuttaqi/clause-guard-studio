import { PrismaClient } from '@prisma/client';
import { SAMPLE_CONTRACTS } from '../server/data/sampleContracts';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ClauseGuard Studio database...');

  // 1. Seed Default Customers
  const evaluator = await prisma.customer.upsert({
    where: { email: 'evaluator@clauseguard.local' },
    update: {},
    create: {
      id: 'cust_evaluator',
      email: 'evaluator@clauseguard.local',
      tier: 'FREE',
      usageCount: 1,
      quotaLimit: 3
    }
  });

  const proMember = await prisma.customer.upsert({
    where: { email: 'pro-member@clauseguard.studio' },
    update: {},
    create: {
      id: 'cust_pro_member',
      email: 'pro-member@clauseguard.studio',
      tier: 'PRO',
      usageCount: 14,
      quotaLimit: 999999,
      stripeCustomerId: 'cus_mock_pro_123',
      subscriptionId: 'sub_mock_pro_123'
    }
  });

  console.log(`Created customers: ${evaluator.email}, ${proMember.email}`);

  // 2. Seed Pre-audited Contract for Evaluator
  const msaSample = SAMPLE_CONTRACTS[0];
  const existingAudit = await prisma.contractAudit.findFirst({
    where: { title: msaSample.title }
  });

  if (!existingAudit) {
    const audit = await prisma.contractAudit.create({
      data: {
        id: 'audit_sample_msa_01',
        customerId: evaluator.id,
        title: msaSample.title,
        contractType: msaSample.contractType,
        rawText: msaSample.rawText,
        overallScore: 28,
        riskLevel: 'CRITICAL',
        clauseFlags: {
          create: [
            {
              id: 'flag_liab_01',
              originalText: 'Contractor shall indemnify, defend, and hold harmless Client from any and all claims without limitation.',
              clauseType: 'liability',
              severity: 'CRITICAL',
              explanation: 'This clause imposes unlimited financial exposure on the contractor. A single dispute could threaten personal and business assets far exceeding the total value of the contract.',
              counterClauseCollaborative: "Each party's aggregate liability under this Agreement shall be limited to direct damages and shall not exceed the total fees paid or payable by Client to Contractor in the three (3) months preceding the claim.",
              counterClauseFirm: "To the maximum extent permitted by applicable law, Contractor's total aggregate liability arising out of or related to this Agreement shall be strictly capped at the total fees actually paid to Contractor hereunder in the twelve (12) months preceding the event giving rise to liability.",
              counterClauseAssertive: "Notwithstanding anything to the contrary, Contractor's cumulative aggregate liability for all claims of any kind shall be strictly limited to the total fees received by Contractor under the specific Statement of Work giving rise to the claim, excluding all indirect, incidental, or consequential damages."
            },
            {
              id: 'flag_pay_01',
              originalText: 'Payment to Contractor is contingent upon Client receipt of payment from the ultimate end customer.',
              clauseType: 'payment',
              severity: 'CRITICAL',
              explanation: "Contractor is treated as an unsecured commercial lender; if the end customer fails or delays payment to the client, the contractor is not paid for completed work.",
              counterClauseCollaborative: "Payment to Contractor is independent of Client's billing arrangement with third parties and shall be disbursed within fifteen (15) days of invoice date.",
              counterClauseFirm: "Contractor's compensation is an absolute obligation of Client and is in no way contingent upon Client receiving payment from third parties or end clients.",
              counterClauseAssertive: "Under no circumstances shall Contractor's compensation be delayed or made contingent upon third-party remittances ('paid-when-paid' provisions are void and unenforceable under this contract)."
            },
            {
              id: 'flag_ip_01',
              originalText: 'Contractor acknowledges and agrees that all deliverables, code, scripts, software, and inventions shall be deemed a "work made for hire upon creation", and the sole and absolute property of Client immediately upon creation.',
              clauseType: 'ip',
              severity: 'CRITICAL',
              explanation: 'Legal title to all code, designs, and assets transfers to the client the instant they are written, eliminating all contractor leverage if the client defaults on payment.',
              counterClauseCollaborative: 'Upon receipt of full and final payment, Contractor assigns to Client all right, title, and interest in the custom deliverables created under this SOW.',
              counterClauseFirm: "Ownership and intellectual property rights in the Work Product shall transfer to Client exclusively and conditionally upon Contractor's receipt of full and final cleared payment.",
              counterClauseAssertive: 'Title and copyright in all work product remain the exclusive property of Contractor until all invoices are satisfied in full. Any interim client deployment without full payment constitutes willful copyright infringement.'
            }
          ]
        },
        overrunScenario: {
          create: {
            id: 'overrun_msa_01',
            baseFee: 24000,
            includedRevisions: 2,
            hourlyOverrunRate: 165,
            calculatedDownside: 5940,
            bufferFee: 3600
          }
        }
      }
    });

    console.log(`Created sample audit with flags: ${audit.id}`);
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
