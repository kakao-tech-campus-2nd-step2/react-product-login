import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/mocks/categories.mock';
import { loginMockHandler } from '@/api/mocks/login.mock';
import { productDetailMockHandler } from '@/api/mocks/productDetail.mock';
import { productOptionsMockHandler } from '@/api/mocks/productOptions.mock';
import { productsMockHandler } from '@/api/mocks/products.mock';
import { registerMockHandler } from '@/api/mocks/register.mock';
import { wishlistMockHandlers } from '@/api/mocks/wishlist.mock';
export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...productDetailMockHandler,
  ...productOptionsMockHandler,
  ...loginMockHandler,
  ...registerMockHandler,
  ...wishlistMockHandlers,
);
