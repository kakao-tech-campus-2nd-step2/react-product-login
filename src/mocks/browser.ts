import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { interestHandlers } from '@/mocks/interestHandlers';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...interestHandlers,
);
