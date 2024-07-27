import { rest } from 'msw';

import type { WishData } from '@/types';
import type { WishResponseData } from '@/types';

import { deleteWishPath } from '../WishList/useDeleteWishList';
import { getWishPath } from '../WishList/useGetWishList';
import { putWishPath } from '../WishList/usePutWishList';
import { mockData } from './mockData';

export const wishListMockHandler = [
  rest.post<WishData>(putWishPath(), async (req, res, ctx) => {
    const { productId } = await req.json();

    if (!productId) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid input' }));
    }

    const newId = mockData.content.length + 1;

    const response: WishResponseData = {
      id: newId,
      productId,
    };

    mockData.content.push({
      id: newId,
      product: {
        id: productId,
        name: `Product ${String.fromCharCode(64 + newId)}`,
        price: Math.floor(Math.random() * 100) + 50,
        imageUrl: `http://example.com/product-${newId}.jpg`,
      },
    });

    return res(ctx.status(201), ctx.json(response));
  }),

  rest.get(getWishPath(), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.delete(deleteWishPath(':wishId'), async (req, res, ctx) => {
    const { wishId } = req.params;

    const wishIndex = mockData.content.findIndex((wish) => wish.id === Number(wishId));

    if (wishIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Wish not found' }));
    }
    mockData.content.splice(wishIndex, 1);

    return res(ctx.status(204));
  }),
];
