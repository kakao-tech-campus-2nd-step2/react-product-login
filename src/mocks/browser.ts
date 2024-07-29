import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { usersMockHandler } from '@/api/hooks/users.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler, ...usersMockHandler);