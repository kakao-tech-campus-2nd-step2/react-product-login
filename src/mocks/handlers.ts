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
];