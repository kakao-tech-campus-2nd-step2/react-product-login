import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/Mock/categories.mock';
import { productsMockHandler } from '@/api/hooks/Mock/products.mock';

export const server = setupServer(...categoriesMockHandler, ...productsMockHandler);
