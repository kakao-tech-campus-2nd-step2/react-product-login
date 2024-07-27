import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { memberMockHandler } from '@/api/hooks/member.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...memberMockHandler,
);
