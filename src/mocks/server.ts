import { setupServer } from 'msw/node';
import { productsMockHandler } from '@apis/hooks/products.mock';

export const server = setupServer(...productsMockHandler);
