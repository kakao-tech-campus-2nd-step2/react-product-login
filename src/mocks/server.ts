import { setupServer } from 'msw/node';
import { productsMockHandler } from '@apis/products/index.mock';

export const server = setupServer(...productsMockHandler);
