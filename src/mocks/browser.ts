import { setupWorker } from 'msw/browser';

import { authMockHandler } from './auth.mock';
import { categoriesMockHandler } from './categories.mock';
import { productsMockHandler } from './products.mock';
import { wishMockHandler } from './wish.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authMockHandler,
  ...wishMockHandler
);
