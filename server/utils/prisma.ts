import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';

let prismaInstance: PrismaClient | null = null;
let isSchemaInitialized = false;

/**
 * Initializes and verifies the SQLite database schema if tables are missing.
 * Self-healing adapter for serverless /tmp cold-starts.
 */
async function ensureDatabaseSchema(prisma: PrismaClient): Promise<void> {
  if (isSchemaInitialized) return;

  try {
    // Check if tables already exist
    const tables: Array<{ name: string }> = await prisma.$queryRawUnsafe(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='Customer'`
    );

    if (!tables || tables.length === 0) {
      console.info('[Prisma Cold-Start] Creating SQLite tables in target database...');

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Customer" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "email" TEXT NOT NULL,
          "stripeCustomerId" TEXT,
          "subscriptionId" TEXT,
          "tier" TEXT NOT NULL DEFAULT 'FREE',
          "usageCount" INTEGER NOT NULL DEFAULT 0,
          "quotaLimit" INTEGER NOT NULL DEFAULT 3,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Customer_email_key" ON "Customer"("email");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Customer_stripeCustomerId_key" ON "Customer"("stripeCustomerId");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Customer_subscriptionId_key" ON "Customer"("subscriptionId");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "ContractAudit" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "customerId" TEXT NOT NULL,
          "title" TEXT NOT NULL DEFAULT 'Untitled Commercial Agreement',
          "contractType" TEXT NOT NULL,
          "rawText" TEXT NOT NULL,
          "overallScore" INTEGER NOT NULL,
          "riskLevel" TEXT NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "ContractAudit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "ContractAudit_customerId_idx" ON "ContractAudit"("customerId");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "ContractAudit_createdAt_idx" ON "ContractAudit"("createdAt");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "ClauseFlag" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "auditId" TEXT NOT NULL,
          "originalText" TEXT NOT NULL,
          "clauseType" TEXT NOT NULL,
          "severity" TEXT NOT NULL,
          "explanation" TEXT NOT NULL,
          "counterClauseCollaborative" TEXT NOT NULL,
          "counterClauseFirm" TEXT NOT NULL,
          "counterClauseAssertive" TEXT NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "ClauseFlag_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "ContractAudit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "ClauseFlag_auditId_idx" ON "ClauseFlag"("auditId");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "ClauseFlag_clauseType_idx" ON "ClauseFlag"("clauseType");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "ClauseFlag_severity_idx" ON "ClauseFlag"("severity");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "OverrunScenario" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "auditId" TEXT NOT NULL,
          "baseFee" REAL NOT NULL,
          "includedRevisions" INTEGER NOT NULL,
          "hourlyOverrunRate" REAL NOT NULL,
          "calculatedDownside" REAL NOT NULL,
          "bufferFee" REAL NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "OverrunScenario_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "ContractAudit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "OverrunScenario_auditId_key" ON "OverrunScenario"("auditId");
      `);

      // Seed default evaluator accounts
      await prisma.$executeRawUnsafe(`
        INSERT OR IGNORE INTO "Customer" ("id", "email", "tier", "usageCount", "quotaLimit", "createdAt", "updatedAt")
        VALUES ('cust_evaluator', 'evaluator@clauseguard.local', 'FREE', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);

      await prisma.$executeRawUnsafe(`
        INSERT OR IGNORE INTO "Customer" ("id", "email", "tier", "usageCount", "quotaLimit", "createdAt", "updatedAt")
        VALUES ('cust_pro_member', 'pro-member@clauseguard.studio', 'PRO', 12, 999999, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);

      console.info('[Prisma Cold-Start] Database schema verified and initialized.');
    }
    isSchemaInitialized = true;
  } catch (err) {
    console.warn('[Prisma Cold-Start] ensureDatabaseSchema notice:', err);
  }
}

/**
 * Returns a singleton PrismaClient instance tailored for serverless cold-starts.
 * Atomically replicates starter.db to /tmp/clauseguard.db if not present.
 */
export function getPrismaClient(): PrismaClient {
  if (prismaInstance) {
    return prismaInstance;
  }

  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NODE_ENV === 'production'
  );

  let targetDbPath = '/tmp/clauseguard.db';

  if (!isServerless && process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
    targetDbPath = process.env.DATABASE_URL.replace('file:', '');
  }

  // Ensure target directory exists
  const targetDir = path.dirname(targetDbPath);
  if (!fs.existsSync(targetDir)) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch {
      // Ignore if dir exists
    }
  }

  // Check if target database exists; if not, clone starter.db if available
  if (!fs.existsSync(targetDbPath)) {
    const candidateStarters = [
      path.resolve(process.cwd(), 'prisma/starter.db'),
      path.resolve(process.cwd(), 'public/starter.db'),
      path.resolve(process.cwd(), 'starter.db')
    ];

    let cloned = false;
    for (const starterPath of candidateStarters) {
      if (fs.existsSync(starterPath)) {
        try {
          fs.copyFileSync(starterPath, targetDbPath);
          console.info(`[Prisma Cold-Start] Cloned starter database from ${starterPath} to ${targetDbPath}`);
          cloned = true;
          break;
        } catch (copyErr) {
          console.warn(`[Prisma Cold-Start] Could not copy ${starterPath}:`, copyErr);
        }
      }
    }

    if (!cloned) {
      console.info(`[Prisma Cold-Start] starter.db not yet present. Will self-heal via ensureDatabaseSchema.`);
    }
  }

  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: `file:${targetDbPath}`
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });

  // Self-heal asynchronously in background
  ensureDatabaseSchema(prismaInstance).catch((e) => {
    console.warn('[Prisma Cold-Start] Schema initialization background notice:', e);
  });

  return prismaInstance;
}

let schemaInitPromise: Promise<void> | null = null;

export async function ensureDatabaseReady(prisma?: PrismaClient): Promise<void> {
  const client = prisma || getPrismaClient();
  if (isSchemaInitialized) return;
  if (!schemaInitPromise) {
    schemaInitPromise = ensureDatabaseSchema(client).then(() => {
      isSchemaInitialized = true;
    }).catch((err) => {
      console.warn('[Prisma Cold-Start] Schema initialization notice:', err);
      isSchemaInitialized = true;
    });
  }
  await schemaInitPromise;
}

