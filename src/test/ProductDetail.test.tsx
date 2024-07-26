import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import { GoodsDetailPage } from '@/pages/Goods/Detail/index';

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
