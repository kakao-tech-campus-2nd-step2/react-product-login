import { setupServer } from 'msw/node';

import { authMockHandler } from '@/mocks/auth.mock';
import { categoriesMockHandler } from '@/mocks/categories.mock';
import { productsMockHandler } from '@/mocks/products.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authMockHandler
);
