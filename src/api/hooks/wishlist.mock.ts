import { rest } from 'msw';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistItem {
  id: number;
  product: Product;
}

interface Pageable {
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageNumber: number;
  pageSize: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface WishlistResponse {
  content: WishlistItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

const WISHLIST_MOCK_DATA: WishlistResponse = {
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

export const wishlistMockHandler = [
  rest.get('/api/wishes', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(WISHLIST_MOCK_DATA));
  }),
];
