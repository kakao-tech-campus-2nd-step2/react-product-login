import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { loginMockHandler } from '@/api/hooks/login.mock';
import { productDetailMockHandler } from '@/api/hooks/productDetail.mock';
import { productOptionsMockHandler } from '@/api/hooks/productOptions.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { registerMockHandler } from '@/api/hooks/register.mock';
export const worker = setupWorker(
  ...categoriesMockHandler, 
  ...productsMockHandler, 
  ...productDetailMockHandler, 
  ...productOptionsMockHandler,
  ...loginMockHandler,
  ...registerMockHandler 
);
