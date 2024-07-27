import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { mockApiHandlers } from '@/api/mockApiHandler.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...mockApiHandlers,
);
