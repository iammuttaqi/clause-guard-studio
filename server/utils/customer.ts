import type { H3Event } from 'h3';
import { getPrismaClient, ensureDatabaseReady } from './prisma';

function getSafeHeader(event: H3Event, name: string): string | undefined {
  if (!event) return undefined;
  // If Web standard Headers with .get method
  const req = (event as any).req;
  if (req?.headers && typeof req.headers.get === 'function') {
    return req.headers.get(name) || undefined;
  }
  const eventHeaders = (event as any).headers;
  if (eventHeaders && typeof eventHeaders.get === 'function') {
    return eventHeaders.get(name) || undefined;
  }
  // If Node.js http.IncomingMessage plain object
  const nodeReq = (event as any).node?.req;
  const rawHeaders = nodeReq?.headers || req?.headers || eventHeaders;
  if (rawHeaders && typeof rawHeaders === 'object') {
    const val = rawHeaders[name.toLowerCase()];
    return Array.isArray(val) ? val[0] : val;
  }
  return undefined;
}

function getSafeCookie(event: H3Event, name: string): string | undefined {
  const cookieHeader = getSafeHeader(event, 'cookie');
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setSafeCookie(event: H3Event, name: string, value: string, maxAgeSeconds = 31536000): void {
  const cookieStr = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
  try {
    const nodeRes = (event as any).node?.res;
    if (nodeRes && typeof nodeRes.setHeader === 'function') {
      const existing = nodeRes.getHeader('Set-Cookie');
      if (!existing) {
        nodeRes.setHeader('Set-Cookie', cookieStr);
      } else if (Array.isArray(existing)) {
        nodeRes.setHeader('Set-Cookie', [...existing, cookieStr]);
      } else {
        nodeRes.setHeader('Set-Cookie', [existing, cookieStr]);
      }
    } else {
      const res = (event as any).res;
      if (res?.headers && typeof res.headers.append === 'function') {
        res.headers.append('set-cookie', cookieStr);
      }
    }
  } catch {
    // Non-critical
  }
}

export async function getCustomerSession(event: H3Event) {
  const prisma = getPrismaClient();
  await ensureDatabaseReady(prisma);

  const emailHeader = getSafeHeader(event, 'x-customer-email');
  const emailCookie = getSafeCookie(event, 'clauseguard_customer_email');
  const targetEmail = (emailHeader || emailCookie || 'evaluator@clauseguard.local').toLowerCase().trim();

  // If no cookie set, set one for continuous evaluation session
  if (!emailCookie) {
    setSafeCookie(event, 'clauseguard_customer_email', targetEmail);
  }

  let customer = await prisma.customer.findUnique({
    where: { email: targetEmail }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        email: targetEmail,
        tier: 'FREE',
        usageCount: 0,
        quotaLimit: 3
      }
    });
  }

  return customer;
}
