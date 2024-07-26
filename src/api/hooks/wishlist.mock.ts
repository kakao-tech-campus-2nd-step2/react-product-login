import { rest } from 'msw';

import { getPostWishlistPath } from './postWishlist';

export const wishlistMockHandler = [
  rest.post(getPostWishlistPath(), (_, res, ctx) => {
    return res(ctx.json(WISHLIST_MOCK_DATA));
  }),
];

const WISHLIST_MOCK_DATA = {
  id: 1,
  productId: 1,
};
