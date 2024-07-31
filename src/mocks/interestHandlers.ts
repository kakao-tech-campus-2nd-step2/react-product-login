import { rest } from 'msw';

const wishesDatabase: {
  id: number;
  product: { id: number; name: string; price: number; imageUrl: string };
}[] = [];
let nextId = 1;

export const interestHandlers = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { product } = req.body as {
      product: { id: number; name: string; price: number; imageUrl: string };
    };

    if (!product) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    const newWish = { id: nextId++, product };
    wishesDatabase.push(newWish);

    return res(ctx.status(201), ctx.json(newWish));
  }),

  rest.get('/api/wishes', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0');
    const size = parseInt(req.url.searchParams.get('size') || '10');
    const totalElements = wishesDatabase.length;
    const totalPages = Math.ceil(totalElements / size);

    const start = page * size;
    const end = start + size;
    const content = wishesDatabase.slice(start, end);

    return res(
      ctx.status(200),
      ctx.json({
        content,
        pageable: {
          sort: { sorted: true, unsorted: false, empty: false },
          pageNumber: page,
          pageSize: size,
          offset: start,
          unpaged: false,
          paged: true,
        },
        totalPages,
        totalElements,
        last: page === totalPages - 1,
        number: page,
        size,
        numberOfElements: content.length,
        first: page === 0,
        empty: content.length === 0,
      }),
    );
  }),

  rest.delete('/api/wishes/:id', (req, res, ctx) => {
    const { id } = req.params;
    const wishId = Array.isArray(id) ? id[0] : id;
    const index = wishesDatabase.findIndex((wish) => wish.id === parseInt(wishId, 10));

    if (index !== -1) {
      wishesDatabase.splice(index, 1);
      return res(ctx.status(204));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Item not found' }));
    }
  }),
];
