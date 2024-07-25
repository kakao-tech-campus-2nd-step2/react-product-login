import { rest } from 'msw';
import { z } from 'zod';

import { getProductDetailPath } from './productDetailPath'; // getProductDetailPath 함수 import

// 제품 상세 정보 데이터 스키마 (zod)
const productDetailResponseDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  categoryId: z.number(),
});

export type ProductDetailResponseData = z.infer<typeof productDetailResponseDataSchema>;

// 샘플 제품 상세 정보 데이터
const sampleProductDetail: ProductDetailResponseData = {
  id: 1,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  price: 145000,
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  categoryId: 2920,
};

// MSW 핸들러 (API 모킹)
export const productDetailMockHandler = [
  rest.get(getProductDetailPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;

    if (productId === sampleProductDetail.id.toString()) {
      return res(ctx.json(sampleProductDetail));
    }

    return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
  }),
];
