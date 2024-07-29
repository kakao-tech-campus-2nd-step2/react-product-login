import { setupWorker } from 'msw';

import { authMockHandler } from '@/api/hooks/auth.mock';
import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishMockHandler } from '@/api/hooks/wishes';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authMockHandler,
  ...wishMockHandler,
);
