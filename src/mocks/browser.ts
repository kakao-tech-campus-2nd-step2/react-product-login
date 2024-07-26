import { setupWorker } from 'msw';

import { categoriesMockHandler } from '../api/hooks/categories.mock';
import { productsMockHandler } from '../api/hooks/products.mock';

import { loginHandlers } from '@/api/hooks/login.mock';
import { registerHandlers } from '@/api/hooks/register.mock';
import { wishlistMockHandler } from '@/api/hooks/wishs.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerHandlers,
  ...loginHandlers,
  ...wishlistMockHandler,
);
