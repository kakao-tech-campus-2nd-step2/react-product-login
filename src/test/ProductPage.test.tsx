import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route } from 'react-router-dom';

import { GoodsDetailPage } from '@/pages/Goods/Detail/index';

// Mock API handlers
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

describe('GoodsDetailPage', () => {
  test('fetches and displays product details and options', async () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:productId">
          <GoodsDetailPage />
        </Route>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Sample Brand')).toBeInTheDocument();
    expect(screen.getByText('1,000원')).toBeInTheDocument();

    expect(await screen.findByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
