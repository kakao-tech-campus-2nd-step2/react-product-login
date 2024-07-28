import { setupWorker } from 'msw';

import { productsMockHandler } from '@apis/products/index.mock';

export const worker = setupWorker(...productsMockHandler);
