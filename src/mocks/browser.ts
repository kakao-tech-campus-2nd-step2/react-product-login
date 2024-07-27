import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { loginMockHandler } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const worker = setupWorker(...categoriesMockHandler, ...loginMockHandler , ...productsMockHandler);
