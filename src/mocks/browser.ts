import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productDetailMockHandler } from '@/api/hooks/productDetail.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { productOptionsMockHandler } from '@/api/hooks/productsOption.mock';
import { loginMockHandler } from '@/api/hooks/login.mock';
import { signupMockHandler } from '@/api/hooks/signup.mock';
import { AddWishListMockHandler } from '@/api/hooks/addWishList.mock';
import { FindWishListMockHandler } from '@/api/hooks/findWishList.mock';
import { DeleteWishListMockHandler } from '@/api/hooks/deletewishList.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...productDetailMockHandler,
  ...productOptionsMockHandler,
  ...loginMockHandler,
  ...signupMockHandler,
  ...AddWishListMockHandler,
  ...FindWishListMockHandler,
  ...DeleteWishListMockHandler,
);
