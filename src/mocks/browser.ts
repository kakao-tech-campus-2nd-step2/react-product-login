import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@apis/hooks/categories.mock';
import { productsMockHandler } from '@apis/hooks/products.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler);
