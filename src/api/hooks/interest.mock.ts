import { rest } from 'msw';

const interestDatabase: { id: number, productId: number }[] = [];
let nextId = 1;

export const interestHandlers = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as { productId: number };

    if (!productId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    // 새로운 관심 등록
    const newInterest = { id: nextId++, productId };
    interestDatabase.push(newInterest);

    return res(ctx.status(201), ctx.json(newInterest));
  }),
];