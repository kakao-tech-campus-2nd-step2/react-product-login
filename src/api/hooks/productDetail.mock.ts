import { rest } from 'msw';

export const getProductDetailPath = (productId: string) => `/api/products/${productId}`;

// 제품 상세 정보 모킹 데이터
export const productDetailMockHandler = [
  rest.get('/api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;

    // 예시: productId에 따라 다른 데이터를 반환할 수 있습니다.
    if (productId === '1') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
          price: 145000,
          imageUrl:
            'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
          categoryId: 2920,
        }),
      );
    }
    return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
  }),
];
