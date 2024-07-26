import { setupServer } from 'msw/node';

import { authHandlers } from '@/api/hooks/authHandlers.mock';
import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishlistHandler } from '@/api/hooks/wishlistHandler.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authHandlers,
  ...wishlistHandler,
);
