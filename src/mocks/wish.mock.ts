import { HttpResponse, http } from 'msw';

import {
  getWishAddPath,
  getWishDeletePath,
  getWishListPath,
} from '@/api/services/path';
import { WishRequestBody, WishResponse } from '@/api/services/wish';

import { PRODUCTS_MOCK_DATA } from './products.mock';

export const wishMockHandler = [
  http.post(getWishAddPath(), async ({ request }) => {
    const data = await request.json();
    const { productId } = data as WishRequestBody;

    const index = WISH_LIST_MOCK_DATA.content.findIndex(
      (item) => item.product.id === Number(productId)
    );

    if (!request.headers.has('Authorization')) {
      return HttpResponse.json(
        { error: 'Invalid or missing token' },
        { status: 401, statusText: 'Unauthorized' }
      );
    }

    if (!productId) {
      return HttpResponse.json(
        { error: 'Invalid input' },
        { status: 400, statusText: 'Bad Request' }
      );
    }

    if (index !== -1) {
      return HttpResponse.json(
        { error: 'Already exists product' },
        { status: 400, statusText: 'Duplicate Product' }
      );
    }

    const product = PRODUCTS_MOCK_DATA.content.find(
      (item) => item.id === Number(productId)
    );

    if (!product) {
      return HttpResponse.json(
        { error: `Not Found ${productId}` },
        { status: 404, statusText: 'Member or Product not found' }
      );
    }

    const response: WishResponse = {
      id,
      productId,
    };

    WISH_LIST_MOCK_DATA.content.push({
      id,
      product,
    });
    id += 1;

    return HttpResponse.json(response);
  }),

  http.get(getWishListPath({}), ({ request }) => {
    if (!request.headers.has('Authorization')) {
      return HttpResponse.json(
        { error: 'Invalid or missing token' },
        { status: 401, statusText: 'Unauthorized' }
      );
    }

    return HttpResponse.json(WISH_LIST_MOCK_DATA);
  }),

  http.delete(getWishDeletePath(':wishId'), async ({ request }) => {
    if (!request.headers.has('Authorization')) {
      return HttpResponse.json(
        { error: 'Invalid or missing token' },
        { status: 401, statusText: 'Unauthorized' }
      );
    }

    const url = new URL(request.url);
    const wishId = url.pathname.split('/').pop();

    const index = WISH_LIST_MOCK_DATA.content.findIndex(
      (wish) => wish.id === Number(wishId)
    );

    if (index === -1) {
      return HttpResponse.json(
        { error: `Not Found ${wishId}` },
        { status: 404, statusText: 'Wish not Found' }
      );
    }

    WISH_LIST_MOCK_DATA.content.splice(index, 1);

    return HttpResponse.json('');
  }),
];

let id = 2;
let WISH_LIST_MOCK_DATA = {
  content: [
    {
      id: 0,
      product: {
        id: 3245119,
        name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
        price: 145000,
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      },
    },
    {
      id: 1,
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
