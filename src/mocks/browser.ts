import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { usersMockHandler } from '@/api/hooks/users.mock';
import { wishesMockHandler } from '@/api/hooks/wishes.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...usersMockHandler,
  ...wishesMockHandler,
);
