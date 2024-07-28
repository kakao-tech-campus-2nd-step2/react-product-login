import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { authHandlers } from '@/api/hooks/user.mock';
import { wishListMockHandler } from '@/api/hooks/wishList.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...wishListMockHandler,
  ...authHandlers
);
