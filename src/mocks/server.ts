import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishesMockHandler } from '@/api/hooks/wish.mock';
export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...wishesMockHandler,
);
