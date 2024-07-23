import { setupWorker } from 'msw/browser';

import { categoriesMockHandler } from '@/mocks/categories.mock';
import { productsMockHandler } from '@/mocks/products.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler
);
