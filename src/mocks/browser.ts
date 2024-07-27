import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { handlers } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler, ...handlers);

if (process.env.NODE_ENV === 'development') {
    worker.start();
  }
