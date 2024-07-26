import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { registerMockHandler } from '@/api/hooks/register.mock';

import { handlers } from './handlers';

export const server = setupServer(
  ...handlers,
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerMockHandler
);