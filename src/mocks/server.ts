import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { loginHandlers } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { registerHandlers } from '@/api/hooks/register.mock';
import { wishlistMockHandler } from '@/api/hooks/wishs.mock';

export const server = setupServer(
  ...productsMockHandler,
  ...categoriesMockHandler,
  ...registerHandlers,
  ...loginHandlers,
  ...wishlistMockHandler,
);
