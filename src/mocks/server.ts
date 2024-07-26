import { setupServer } from 'msw/node';

import { authMockHandler } from './auth.mock';
import { categoriesMockHandler } from './categories.mock';
import { productsMockHandler } from './products.mock';
import { wishMockHandler } from './wish.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authMockHandler,
  ...wishMockHandler
);
