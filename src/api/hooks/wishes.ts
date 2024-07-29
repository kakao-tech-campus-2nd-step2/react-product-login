import { rest } from 'msw';

import { getProductDetailPath } from './useGetProductDetail';

export type Wish = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

const PRODUCTS_MOCK_DATA = {
  content: [
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
    {
      id: 1181831,
      name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
      price: 122000,
    },
    {
      id: 1379982,
      name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
      price: 133000,
    },
  ],
};

const mockWishes: Wish[] = [];

export const addWish = async (productId: number): Promise<void> => {
  const product = PRODUCTS_MOCK_DATA.content.find((item) => item.id === productId);
  if (product) {
    const newWish: Wish = {
      id: mockWishes.length + 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    };
    mockWishes.push(newWish);
  }
};

export const removeWish = async (wishId: number): Promise<void> => {
  const index = mockWishes.findIndex((wish) => wish.id === wishId);
  if (index !== -1) {
    mockWishes.splice(index, 1);
  }
};

export const getWishes = async (): Promise<{ content: Wish[] }> => {
  return {
    content: mockWishes,
  };
};

export const wishMockHandler = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as { productId: number };
    const product = PRODUCTS_MOCK_DATA.content.find((item) => item.id === productId);
    if (product) {
      const newWish: Wish = {
        id: mockWishes.length + 1,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        },
      };
      mockWishes.push(newWish);
      return res(
        ctx.status(201),
        ctx.json({
          id: newWish.id,
          productId: newWish.product.id,
        }),
      );
    }
    return res(ctx.status(400), ctx.json({ message: 'Invalid productId' }));
  }),

  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const { wishId } = req.params as { wishId: string };
    const index = mockWishes.findIndex((wish) => wish.id === parseInt(wishId));
    if (index !== -1) {
      mockWishes.splice(index, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
  }),

  rest.get('/api/wishes', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: mockWishes,
      }),
    );
  }),

  rest.get(getProductDetailPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params as { productId: string };
    const product = PRODUCTS_MOCK_DATA.content.find((item) => item.id === parseInt(productId));
    if (product) {
      return res(ctx.status(200), ctx.json(product));
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),
];
