import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { handlers } from '@/api/hooks/wish.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler, ...handlers);
