import { defineEventHandler, setResponseStatus } from 'h3';
import { getCustomerSession } from '~/server/utils/customer';

export default defineEventHandler(async (event) => {
  await getCustomerSession(event);
  setResponseStatus(event, 200);
  return 'OK';
});
