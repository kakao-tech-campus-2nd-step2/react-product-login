import { HttpResponse, http } from 'msw';

import {
  getWishAddPath,
  getWishDeleteApi,
  getWishListPath,
} from '@/api/services/path';
import { WishResponse } from '@/api/services/wish';

export const wishMockHandler = [
  http.post(getWishAddPath(), async ({ request }) => {
    const productId = await request.json();

    if (!productId) {
      return HttpResponse.json(
        { error: 'Bad Request' },
        {
          status: 400,
        }
      );
    }

    if (!request.headers.has('Authorization')) {
      return HttpResponse.json(
        { error: 'Invalid or missing token' },
        {
          status: 401,
        }
      );
    }

    const response: WishResponse = {
      id: 1,
      productId: productId.toString(),
    };

    return HttpResponse.json(response);
  }),
  http.get(getWishListPath({}), ({ request }) => {
    if (!request.headers.has('Authorization')) {
      return HttpResponse.json(
        { error: 'Invalid or missing token' },
        {
          status: 401,
        }
      );
    }

    return HttpResponse.json(WISH_LIST_MOCK_DATA);
  }),
  http.delete(getWishDeleteApi, async ({ request }) => {
    if (!request.headers.has('Authorization')) {
      return HttpResponse.json(
        { error: 'Invalid or missing token' },
        {
          status: 401,
        }
      );
    }

    return HttpResponse.json('');
  }),
];

const WISH_LIST_MOCK_DATA = {
  content: [
    {
      id: 1,
      product: {
        id: 3245119,
        name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
        price: 145000,
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      },
    },
    {
      id: 2,
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
