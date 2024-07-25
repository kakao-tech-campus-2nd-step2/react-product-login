import { rest } from 'msw';

import { getProductOptionsPath } from './useGetProductOptions';

// 제품 옵션 모킹 핸들러
export const productOptionsMockHandler = [
  rest.get(getProductOptionsPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;

    if (productId === '1') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            name: 'Option A',
            quantity: 10,
            productId: 1,
          },
          {
            id: 2,
            name: 'Option B',
            quantity: 20,
            productId: 1,
          },
        ])
      );
    }

    return res(ctx.status(200), ctx.json([])); // 다른 productId에 대한 빈 배열
  }),
];
