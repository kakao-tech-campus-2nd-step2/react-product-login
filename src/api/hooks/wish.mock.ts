import { rest } from 'msw';
import { BASE_URL } from '../instance/index';
import { Wish } from '@/types';
import { PRODUCTS_MOCK_DATA } from './products.mock';

let wishlist: Wish[] = [];

export const wishMockHandler = [
  rest.post(`${BASE_URL}/api/wishes`, async (req, res, ctx) => {
    const { productId } = await req.json<{ productId: number }>();

    if (productId) {
      const newWish = { id: Date.now(), productId };
      wishlist.push(newWish);
      return res(ctx.status(201), ctx.json(newWish));
    }

    return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
  }),

  rest.get(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
    const wishListContent = wishlist.map(wish => {
      const product = PRODUCTS_MOCK_DATA.content.find(p => p.id === wish.productId);
      if (product) {
        return {
          id: wish.id,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl
          }
        };
      }
      return null;
    }).filter(item => item !== null);

    return res(ctx.status(200), ctx.json({
      content: wishListContent,
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false
        },
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        unpaged: false,
        paged: true
      },
      totalPages: 1,
      totalElements: wishListContent.length,
      last: true,
      number: 0,
      size: 10,
      numberOfElements: wishListContent.length,
      first: true,
      empty: false
    }));
  }),

  rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
    const wishId = parseInt(req.params.wishId as string, 10);
    wishlist = wishlist.filter(wish => wish.id !== wishId);
    return res(ctx.status(204));
  }),
];
