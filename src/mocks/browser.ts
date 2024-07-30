import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { userMockHandler } from '@/api/hooks/user.mock';
import { wishesMockHandlers } from '@/api/hooks/wish.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...userMockHandler,
  ...wishesMockHandlers,
);
