// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('/api/products/:productId/detail', (_, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'Sample Product',
        brandInfo: { name: 'Sample Brand' },
        price: { sellingPrice: 1000 },
        imageURL: 'https://via.placeholder.com/150',
      }),
    );
  }),
  rest.get('/api/products/:productId/options', (_, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { rest, server };
