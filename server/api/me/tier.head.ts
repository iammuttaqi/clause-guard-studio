import { defineEventHandler } from 'h3';
import { getCustomerSession } from '~/server/utils/customer';

export default defineEventHandler(async (event) => {
  await getCustomerSession(event);
  return null;
});
