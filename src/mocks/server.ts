import { setupServer } from 'msw/node';
import { categoriesMockHandler } from '../api/hooks/categories.mock';
import { productsMockHandler } from '../api/hooks/products.mock';
import { userMockHandlers } from '../api/hooks/user.mock';
import { wishMockHandlers } from '../api/hooks/wish.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...userMockHandlers,
  ...wishMockHandlers,
);
