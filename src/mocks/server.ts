import { setupServer } from 'msw/node';
import { productsMockHandler } from '@apis/products/index.mock';
import { wishMockHandler } from '@apis/wish/index.mock';

export const server = setupServer(...productsMockHandler, ...wishMockHandler);
