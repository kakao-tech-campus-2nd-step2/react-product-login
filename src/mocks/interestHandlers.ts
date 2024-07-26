import { rest } from 'msw';

const wishesDatabase: { id: number; productId: number }[] = [];
let nextId = 1;

export const interestHandlers = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as { productId: number };

    // 유효성 검사
    if (!productId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    // 새로운 위시 추가
    const newWish = { id: nextId++, productId };
    wishesDatabase.push(newWish);
    console.log(newWish);

    return res(ctx.status(201), ctx.json(newWish));
  }),
];
