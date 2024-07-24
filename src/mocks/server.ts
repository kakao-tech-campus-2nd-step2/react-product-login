import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/mocks/categories.mock';
import { productsMockHandler } from '@/mocks/products.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler
);
