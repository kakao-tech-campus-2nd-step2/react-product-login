import { rest } from 'msw';

import { BASE_URL } from '../instance';

import type { WishlistResponse } from '@/types';

export const wishlistMockHandler = [
  rest.get(`${BASE_URL}/api/wishes`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(WISHLIST_RESPONSE_DATA));
  }),
  rest.post(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
    const { productId } = req.body as { productId: number };

    if (!productId) {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Bad Request',
          message: 'Product ID is required',
        }),
      );
    }
    return res(ctx.status(201), ctx.json({ id: 1, productId: productId }));
  }),
  rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    if (!wishId) {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Wish not found',
        }),
      );
    }
    return res(ctx.status(204));
  }),
];

const WISHLIST_RESPONSE_DATA: WishlistResponse = {
  content: [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Product A',
        price: 100,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Product B',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalPages: 5,
  totalElements: 50,
  last: false,
  number: 0,
  size: 10,
  numberOfElements: 2,
  first: true,
  empty: false,
};
