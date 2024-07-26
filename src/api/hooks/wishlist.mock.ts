import { rest } from 'msw';

export const wishlistMockHandler = [
  rest.get('https://api.example.com/api/wishes', (req, res, ctx) => {
    const sort = req.url.searchParams.get('sort');
    const size = req.url.searchParams.get('size');

    if (sort === 'createdDate,desc' && size === '20') {
      return res(ctx.json(WISHLIST_RESPONSE_DATA));
    } else {
      return res(ctx.status(400), ctx.json({ message: 'Invalid parameters' }));
    }
  }),
];

const WISHLIST_RESPONSE_DATA = {
  content: [
    {
      id: 1,
      product: {
        id: 3245119,
        name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
        price: 145000,
      },
    },
    {
      id: 2,
      product: {
        id: 2263833,
        name: '외식 통합권 10만원권',
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
        price: 100000,
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
