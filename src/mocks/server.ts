import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { authMockHandler } from '@/api/hooks/member.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishlistMockHandler } from '@/api/hooks/wishlist.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...wishlistMockHandler,
  ...authMockHandler,
);
