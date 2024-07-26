import { rest } from 'msw';

export const wishlistMockHandler = [
  rest.get('/api/wishes', async (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    return res(ctx.status(200), ctx.json(WISHLIST_MOCK_DATA));
  }),
  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const { wishId } = req.params;
    const wishIndex = WISHLIST_MOCK_DATA.content.findIndex((item) => item.id === Number(wishId));
    if (wishIndex !== -1) {
      WISHLIST_MOCK_DATA.content.splice(wishIndex, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
  }),
];

const WISHLIST_MOCK_DATA = {
  content: [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Product A',
        price: 100,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Product B',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
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
