import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { handlers } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const server = setupServer(...categoriesMockHandler, ...productsMockHandler, ...handlers);