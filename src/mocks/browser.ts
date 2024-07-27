import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/mock/categories.mock';
import { productsMockHandler } from '@/api/mock/products.mock';
import { userMockhandler } from '@/api/mock/user.mock';
import { wishlistMockHandler } from '@/api/mock/wishlist.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...userMockhandler,
  ...wishlistMockHandler,
);
