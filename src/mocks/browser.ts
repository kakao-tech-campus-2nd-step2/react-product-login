import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/mocks/api/categories.mock';
import { productsMockHandler } from '@/mocks/api/products.mock';
import { userMockHandler } from '@/mocks/api/user.mock';

export const browserWorker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...userMockHandler,
);
