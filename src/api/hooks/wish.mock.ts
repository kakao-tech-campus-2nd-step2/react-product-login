import { rest } from 'msw';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Wish {
  id: number;
  product: Product;
}

let wishes: Wish[] = [];
let nextWishId = 1;

export const wishlistHandlers = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as { productId: number };
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid or missing token' })
      );
    }

    const product = { id: productId, name: `Product ${productId}`, price: 100, imageUrl: `https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png` };
    const newWish = { id: nextWishId++, product };
    wishes.push(newWish);

    return res(
      ctx.status(201),
      ctx.json(newWish)
    );
  }),

  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const { wishId } = req.params;
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid or missing token' })
      );
    }

    if (typeof wishId === 'string') {
      wishes = wishes.filter(wish => wish.id !== parseInt(wishId, 10));
    }

    return res(
      ctx.status(204)
    );
  }),

  rest.get('/api/wishes', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid or missing token' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        content: wishes,
        pageable: {
          pageNumber: 0,
          pageSize: 10,
        },
        totalElements: wishes.length,
        totalPages: 1,
      })
    );
  }),
];
