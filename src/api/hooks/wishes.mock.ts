import { rest } from 'msw';

import { type UserData } from '@/types';

import { getPutWishPath } from './usePostWish';

export const wishesMockHandler = [
  rest.post<UserData>(getPutWishPath(), async (req, res, ctx) => {
    let productId;
    await req.json().then((data) => {
      productId = data.productId;
    });
    return res(ctx.json([{ id: 0, productId: productId }]));
  }),
];
