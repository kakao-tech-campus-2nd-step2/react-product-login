import { rest } from 'msw';

import { getPostWishlistPath } from '../hooks/postWishlist';
import { getDeleteWishlistPath } from '../hooks/useDeleteWishlist';
import { getWishlistPath } from '../hooks/useGetWishlist';

export const wishlistMockHandler = [
  rest.post(getPostWishlistPath(), (_, res, ctx) => {
    return res(ctx.json(WISHLIST_MOCK_DATA));
  }),
  rest.get(
    getWishlistPath({
      page: 0,
      size: 10,
      sort: 'createdDate',
    }),
    (_, res, ctx) => {
      return res(ctx.json(WISHLIST_GET_MOCK_DATA));
    },
  ),

  rest.delete(getDeleteWishlistPath(':productId'), (_, res, ctx) => {
    return res(ctx.json(WISHLIST_GET_MOCK_DATA));
  }),
];

const WISHLIST_MOCK_DATA = {
  id: 1,
  productId: 1,
};

const WISHLIST_GET_MOCK_DATA = {
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
