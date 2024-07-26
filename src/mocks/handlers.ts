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

const wishlist: WishlistItem[] = [];

export const handlers = [
  rest.get('/api/detail', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: 'mocked detail data' })
    );
  }),
  rest.get('/api/options', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: 'mocked options data' })
    );
  }),
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId, name, price, imageUrl } = req.body as {
      productId: number;
      name: string;
      price: number;
      imageUrl: string;
    };
    const newWish = {
      id: Date.now(),
      product: {
        id: productId,
        name,
        price,
        imageUrl,
      }
    };
    wishlist.push(newWish);
    return res(
      ctx.status(201),
      ctx.json(newWish)
    );
  }),
  rest.get('/api/wishes', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 0;
    const size = Number(req.url.searchParams.get('size')) || 10;
    const sortedWishlist = wishlist.slice().sort((a, b) => b.id - a.id);
    const paginatedWishlist = sortedWishlist.slice(page * size, (page + 1) * size);

    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedWishlist,
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false
          },
          pageNumber: page,
          pageSize: size,
          offset: 0,
          unpaged: false,
          paged: true
        },
        totalPages: Math.ceil(wishlist.length / size),
        totalElements: wishlist.length,
        last: page === Math.ceil(wishlist.length / size) - 1,
        number: page,
        size: size,
        numberOfElements: paginatedWishlist.length,
        first: page === 0,
        empty: paginatedWishlist.length === 0
      })
    );
  }),
  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const { wishId } = req.params as { wishId: string };
    const index = wishlist.findIndex((item) => item.id === parseInt(wishId));

    if (index === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Wish not found' }));
    }

    wishlist.splice(index, 1);
    return res(ctx.status(204));
  }),
];