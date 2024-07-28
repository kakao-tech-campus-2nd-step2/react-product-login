import { rest } from 'msw';

import { getWishListPath } from '@/api/hooks/useGetWishList';
import type { WishData } from '@/types';

export type WishResponseData = {
  id: number;
  productId: number;
};
export const getWishListMockHandler = [
  rest.post(getWishListPath(), (req, res, ctx) => {
    const { productId } = req.body as WishData;

    if (!productId) {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Bad Request',
          message: 'Product ID is required',
        }),
      );
    }

    const mockResponse: WishResponseData = {
      id: 1,
      productId,
    };

    return res(ctx.status(200), ctx.json(mockResponse));
  }),
];
