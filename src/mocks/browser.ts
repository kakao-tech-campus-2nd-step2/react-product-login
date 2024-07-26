import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { loginHandler } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { signupHandler } from '@/api/hooks/signup.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...loginHandler,
  ...signupHandler,
);
