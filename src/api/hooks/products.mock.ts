import { rest } from 'msw';

import { ApiPath } from '@/routes/path';

export const PRODUCTS_MOCK_DATA = {
  content: [
    {
      id: 3245119,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      price: 145000,
      options: [
        {
          id: 1,
          name: 'Option A',
          quantity: 10,
          productId: 3245119,
        },
        {
          id: 2,
          name: 'Option B',
          quantity: 20,
          productId: 3245119,
        },
      ],
    },
    {
      id: 2263833,
      name: '외식 통합권 10만원권',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
      price: 100000,
      options: [
        {
          id: 3,
          name: 'Option C',
          quantity: 5,
          productId: 2263833,
        },
      ],
    },
    {
      id: 6502823,
      name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
      price: 108000,
      options: [],
    },
    {
      id: 1181831,
      name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
      price: 122000,
      options: [
        {
          id: 4,
          name: 'Option D',
          quantity: 15,
          productId: 1181831,
        },
      ],
    },
    {
      id: 1379982,
      name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
      price: 133000,
      options: [
        {
          id: 5,
          name: 'Option E',
          quantity: 12,
          productId: 1379982,
        },
      ],
    },
  ],
  number: 0,
  totalElements: 5,
  size: 10,
  last: true,
};

export const productsMockHandler = [
  rest.get(ApiPath.products.root, (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId');
    if (categoryId === '2920' || categoryId === '2930') {
      return res(ctx.json(PRODUCTS_MOCK_DATA));
    }
    return res(ctx.status(404), ctx.json({ message: 'Category not found' }));
  }),

  rest.get(ApiPath.products.detail(':productId'), (req, res, ctx) => {
    const productId = req.params.productId as string;
    const product = PRODUCTS_MOCK_DATA.content.find((p) => p.id === parseInt(productId, 10));
    if (product) {
      return res(ctx.json(product));
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),

  rest.get(ApiPath.products.options(':productId'), (req, res, ctx) => {
    const productId = req.params.productId as string;
    const product = PRODUCTS_MOCK_DATA.content.find((p) => p.id === parseInt(productId, 10));
    if (product) {
      return res(ctx.json(product.options));
    }
    return res(ctx.status(404), ctx.json({ message: 'Options not found' }));
  }),
];
