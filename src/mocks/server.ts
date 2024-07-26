import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

const handlers = [...categoriesMockHandler, ...productsMockHandler];

export const server = setupServer(...handlers);
