import { setupServer } from 'msw/node';

import { authMockHandler } from '@/api/hooks/auth.mock';
import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishMockHandler } from '@/api/hooks/wishes';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authMockHandler,
  ...wishMockHandler,
);
