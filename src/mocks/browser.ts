import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/mocks/categories.mock';
import { productsMockHandler } from '@/api/mocks/products.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler);
