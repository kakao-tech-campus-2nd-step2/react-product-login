import { setupServer } from 'msw/node';
import { categoriesMockHandler } from '../api/hooks/categories.mock';
import { productsMockHandler } from '../api/hooks/products.mock';
import { loginMockHandler } from '../api/hooks/login.mock';
import { registerMockHandler } from '../api/hooks/register.mock';
import { wishMockHandler } from '../api/hooks/wish.mock';

export const server = setupServer(
  ...categoriesMockHandler, 
  ...productsMockHandler, 
  ...loginMockHandler, 
  ...registerMockHandler,
  ...wishMockHandler,
);
