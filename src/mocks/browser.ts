import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { handlers } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishlistHandlers } from '@/api/hooks/wish.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler, ...handlers, ...wishlistHandlers);

if (process.env.NODE_ENV === 'development') {
    worker.start();
  }
