import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/Mock/categories.mock';
import { loginMockHandler } from '@/api/hooks/Mock/login.mock';
import { productsMockHandler } from '@/api/hooks/Mock/products.mock';
import { wishListMockHandler } from '@/api/hooks/Mock/wishList.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...loginMockHandler,
  ...wishListMockHandler,
);
