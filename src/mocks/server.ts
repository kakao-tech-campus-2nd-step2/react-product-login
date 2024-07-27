import { setupServer } from 'msw/node';
import { categoriesMockHandler } from 'src/api/mocks/categories.mock';
import { productsMockHandler } from 'src/api/mocks/products.mock';

export const server = setupServer(...categoriesMockHandler, ...productsMockHandler);
