import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { productDetailMockHandler } from '@/api/hooks/productDetail.mock';
import { productOptionsMockHandler } from './productOptions.mock';

export const worker = setupWorker(
  ...categoriesMockHandler, 
  ...productsMockHandler, 
  ...productDetailMockHandler, 
  ...productOptionsMockHandler
);
