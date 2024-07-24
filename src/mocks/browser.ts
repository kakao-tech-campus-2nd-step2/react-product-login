import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productDetailMockHandler } from '@/api/hooks/productDetail.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { productOptionsMockHandler } from '@/api/hooks/productsOption.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...productDetailMockHandler,
  ...productOptionsMockHandler,
);
