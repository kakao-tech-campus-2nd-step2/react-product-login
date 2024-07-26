import { setupServer } from 'msw/node';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const server = setupServer(...productsMockHandler);