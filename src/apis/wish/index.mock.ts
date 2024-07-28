import { rest } from 'msw';

export const wishMockHandler = [
  rest.get('/api/wishes', (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const size = req.url.searchParams.get('size');
    const sort = req.url.searchParams.get('sort');

    return res(ctx.status(200), ctx.json(WISHES_MOCK_DATA));
  }),
  rest.delete(`/api/wishes/:wishId`, (req, res, ctx) => {
    const wishId = req.params.wishId as string;
    const wishIdNumber = Array.isArray(wishId) ? parseInt(wishId[0], 10) : parseInt(wishId, 10);

    WISHES_MOCK_DATA = {
      ...WISHES_MOCK_DATA,
      content: WISHES_MOCK_DATA.content.filter((item) => item.id !== wishIdNumber),
    };
    return res(ctx.status(200));
  }),
];

let WISHES_MOCK_DATA = {
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
