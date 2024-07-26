import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishlistMockHandler } from '@/api/hooks/wishlist.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...wishlistMockHandler,
);
