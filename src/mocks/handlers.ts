import { rest } from 'msw';

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
    const { productId } = req.body as { productId: number };
    return res(
      ctx.status(201),
      ctx.json({
        id: Date.now(),
        productId,
      })
    );
  }),
];