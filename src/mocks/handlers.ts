import { rest } from 'msw';

export const handlers = [
  rest.get('/api/detail', (_req, res, ctx) => {
    return res(ctx.json({ id: 1, name: 'Product Name', description: 'Product Description' }));
  }),
  rest.get('/api/option', (_req, res, ctx) => {
    return res(ctx.json({ options: ['Option 1', 'Option 2'] }));
  }),
];
