import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { handlers } from '@/api/hooks/handlers';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler, ...handlers);
