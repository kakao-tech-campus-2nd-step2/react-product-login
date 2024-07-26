import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { loginMockHandler } from '@/api/hooks/login.mock';
import { productOptionsMockHandler } from '@/api/hooks/product-options.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { registerMockHandler } from '@/api/hooks/register.mock';
import { getWishListMockHandler } from '@/api/hooks/wishList.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerMockHandler,
  ...loginMockHandler,
  ...registerMockHandler,
  ...productOptionsMockHandler,
  ...getWishListMockHandler,
);
