import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { registerMockHandler } from '@/api/hooks/register.mock';

import { handlers } from './handlers';

export const worker = setupWorker(
  ...handlers,
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerMockHandler
);