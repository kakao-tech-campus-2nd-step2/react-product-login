import { rest } from 'msw';
import { z } from 'zod'; 

import { getProductOptionsPath } from './productOptionsPath'; // getProductOptionsPath 함수 import

// 제품 옵션 API 응답 스키마 (zod)
const productOptionsResponseDataSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    productId: z.number(),
  })
);

export type ProductOptionsResponseData = z.infer<typeof productOptionsResponseDataSchema>;

// 샘플 제품 옵션 데이터 (productId: 1)
const sampleProductOptions: ProductOptionsResponseData = [
  { id: 1, name: 'Option A', quantity: 10, productId: 1 },
  { id: 2, name: 'Option B', quantity: 20, productId: 1 },
];

// 제품 옵션 모킹 핸들러
export const productOptionsMockHandler = [
  rest.get(getProductOptionsPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;

    if (productId === '1') {
      return res(ctx.status(200), ctx.json(sampleProductOptions));
    }

    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),
];
