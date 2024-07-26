import { rest } from 'msw';

import { ApiPath } from '@/routes/path';

export const MOCK_WISHES = {
  content: [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Product A',
        price: 100,
        imageUrl: 'http://example.com/product-a.jpg',
      },
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Product B',
        price: 150,
        imageUrl: 'http://example.com/product-b.jpg',
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

export const wishlistHandler = [
  rest.get(ApiPath.wishes.root, (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }

    return res(ctx.status(200), ctx.json(MOCK_WISHES));
  }),

  rest.post(ApiPath.wishes.root, (req, res, ctx) => {
    const { productId } = req.body as { productId: number };
    const newWish = {
      id: Date.now(),
      product: {
        id: productId,
        name: `Product ${productId}`,
        price: 100,
        imageUrl: `http://example.com/product-${productId}.jpg`,
      },
    };
    MOCK_WISHES.content.push(newWish);
    return res(ctx.status(201), ctx.json(newWish));
  }),

  rest.delete(ApiPath.wishes.detail(':wishId'), (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }

    const wishId = Array.isArray(req.params.wishId) ? req.params.wishId[0] : req.params.wishId;
    const parsedWishId = parseInt(wishId, 10);
    const index = MOCK_WISHES.content.findIndex((wish) => wish.id === parsedWishId);

    if (index === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
    }

    MOCK_WISHES.content.splice(index, 1);

    return res(ctx.status(204));
  }),
];
