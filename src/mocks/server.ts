import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { loginHandlers } from '@/api/hooks/login.mock';
import { memberMockHandler } from '@/api/hooks/member.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { addWishHandler, deleteWishHandler, getWishesHandler } from '@/api/hooks/wishlist.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...memberMockHandler,
  ...loginHandlers,
  addWishHandler,
  deleteWishHandler,
  getWishesHandler,
);
