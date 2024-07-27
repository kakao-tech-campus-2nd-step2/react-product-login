import type { RequestHandler } from 'msw';
import { rest } from 'msw';

const MOCK_TOKEN = 'valid-token';

export const addWishHandler: RequestHandler = rest.post('/api/wishes', async (req, res, ctx) => {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : '';

  if (token !== MOCK_TOKEN) {
    return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
  }

  try {
    const { productId } = (await req.json()) as { productId: number };

    if (!productId) {
      return await res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    return await res(ctx.status(201), ctx.json({ id: 1, productId }));
  } catch (err) {
    return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
  }
});

export const deleteWishHandler: RequestHandler = rest.delete(
  '/api/wishes/:wishId',
  (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : '';

    if (token !== MOCK_TOKEN) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    return res(ctx.status(204));
  },
);

export const getWishesHandler: RequestHandler = rest.get('/api/wishes', (req, res, ctx) => {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : '';

  if (token !== MOCK_TOKEN) {
    return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
  }

  const page = parseInt(req.url.searchParams.get('page') || '0', 10);
  const size = parseInt(req.url.searchParams.get('size') || '10', 10);

  const PRODUCTS_MOCK_DATA = [
    {
      id: 3245119,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      price: 145000,
    },
    {
      id: 2263833,
      name: '외식 통합권 10만원권',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
      price: 100000,
    },
    {
      id: 6502823,
      name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
      price: 108000,
    },
  ];

  return res(
    ctx.status(200),
    ctx.json({
      content: PRODUCTS_MOCK_DATA.map((product) => ({
        id: product.id,
        product,
      })),
      pageable: {
        sort: { sorted: true, unsorted: false, empty: false },
        pageNumber: page,
        pageSize: size,
        offset: page * size,
        unpaged: false,
        paged: true,
      },
      totalPages: 5,
      totalElements: 50,
      last: page === 4,
      number: page,
      size,
      numberOfElements: PRODUCTS_MOCK_DATA.length,
      first: page === 0,
      empty: PRODUCTS_MOCK_DATA.length === 0,
    }),
  );
});
