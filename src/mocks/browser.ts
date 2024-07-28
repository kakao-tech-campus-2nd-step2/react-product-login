import { setupWorker } from 'msw';

import { productsMockHandler } from '@apis/products/index.mock';
import { wishMockHandler } from '@apis/wish/index.mock';

export const worker = setupWorker(...productsMockHandler, ...wishMockHandler);
