import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/mocks/api/categories.mock';
import { productsMockHandler } from '@/mocks/api/products.mock';

export const serverWorker = setupServer(...categoriesMockHandler, ...productsMockHandler);
