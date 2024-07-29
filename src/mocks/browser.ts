import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { loginhandler } from '@/api/hooks/loginhandler.mock';
import { signuphandler } from '@/api/hooks/signuphandler.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...loginhandler,
  ...signuphandler,
);
