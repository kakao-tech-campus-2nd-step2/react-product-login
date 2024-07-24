import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/mocks/api/categories.mock';
import { productsMockHandler } from '@/mocks/api/products.mock';

export const browserWorker = setupWorker(...categoriesMockHandler, ...productsMockHandler);
