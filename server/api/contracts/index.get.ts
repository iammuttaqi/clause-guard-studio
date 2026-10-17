import { defineEventHandler } from 'h3';
import { SAMPLE_CONTRACTS } from '~/server/data/sampleContracts';

export default defineEventHandler(() => {
  return SAMPLE_CONTRACTS;
});
