import { rest } from 'msw';

import { WISH_LIST_PATH } from './useGetWishlist';

export const wishlistMockHandler = [
  rest.get(WISH_LIST_PATH, (_, res, ctx) => {
    return res(ctx.json(WISHLIST_RESPONSE_DATA));
  }),
  rest.delete(`${WISH_LIST_PATH}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    WISHLIST_RESPONSE_DATA.content = WISHLIST_RESPONSE_DATA.content.filter(
      (item) => item.id !== parseInt(id as string),
    );
    return res(ctx.status(204));
  }),
];

const WISHLIST_RESPONSE_DATA = {
  content: [
    {
      id: 3245119,
      product: {
        id: 3245119,
        name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
        price: 145000,
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      },
    },
    {
      id: 2263833,
      product: {
        id: 2263833,
        name: '외식 통합권 10만원권',
        price: 100000,
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
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
