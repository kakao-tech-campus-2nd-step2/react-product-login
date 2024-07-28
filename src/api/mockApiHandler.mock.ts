import { rest } from 'msw';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';

const tempWishlist: string[] = [];

export const mockApiHandlers = [
  // TODO: api/members/register로 하면 http를 사용해서 matching request url이 없다고 나옴
  rest.post('https://api.example.com/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    return res(
      ctx.status(201),
      ctx.json({
        email,
        token: 'mock-token',
      }),
    );
  }),
  rest.post('https://api.example.com/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    // temporary mock user
    if (email === 'qqqq@qqq.com' && password === 'wwwwww') {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'mock-token',
        }),
      );
    }

    return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
  }),
  rest.post('https://api.example.com/api/wishes', async (req, res, ctx) => {
    const { productId } = await req.json<{ productId: string }>();
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    if (!productId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    tempWishlist.push(productId);

    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        productId,
      }),
    );
  }),
  rest.get('https://api.example.com/api/wishes', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '10', 10);

    if (isNaN(page) || isNaN(size)) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    const wishlistItems = tempWishlist
      .map((itemId) => {
        return PRODUCTS_MOCK_DATA.content.find((product) => product.id === parseInt(itemId));
      })
      .filter((item) => item !== undefined);

    const paginatedItems = wishlistItems.slice(page * size, (page + 1) * size);

    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedItems.map((item, index) => ({
          id: index + 1,
          product: item,
        })),
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: page,
          pageSize: size,
          offset: page * size,
          unpaged: false,
          paged: true,
        },
        totalPages: Math.ceil(wishlistItems.length / size),
        totalElements: wishlistItems.length,
        last: page === Math.ceil(wishlistItems.length / size) - 1,
        number: page,
        size: size,
        numberOfElements: paginatedItems.length,
        first: page === 0,
        empty: paginatedItems.length === 0,
      }),
    );
  }),
  rest.delete('https://api.example.com/api/wishes/:productId', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const { productId } = req.params;

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    const wishIndex = tempWishlist.findIndex((itemId) => itemId === productId);

    if (wishIndex === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
    }

    tempWishlist.splice(wishIndex, 1);

    return res(ctx.status(204));
  }),
];
