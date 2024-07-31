import { render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';

import { GoodsDetailPage } from '@/pages/Goods/Detail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock the AsyncBoundary component
jest.mock('@/components/common/AsyncBoundary', () => {
  return {
    AsyncBoundary: jest.fn(({ children, pendingFallback, rejectedFallback, isError }) => {
      if (isError) {
        return <div>{rejectedFallback}</div>;
      }
      return (
        <div>
          {pendingFallback}
          {children}
        </div>
      );
    })
  };
});

jest.mock('@/components/common/layouts/SplitLayout', () => ({
  SplitLayout: ({ sidebar, children }: { sidebar: React.ReactNode; children: React.ReactNode }) => (
    <div>
      <div>{sidebar}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('@/components/common/View/LoadingView', () => ({
  LoadingView: () => <div>Loading...</div>,
}));

jest.mock('@/components/features/Goods/Detail', () => ({
  GoodsDetail: ({ productId }: { productId: string }) => <div>Goods Detail for {productId}</div>,
}));

jest.mock('@/components/features/Goods/Detail/OptionSection', () => ({
  OptionSection: ({ productId }: { productId: string }) => <div>Option Section for {productId}</div>,
}));

describe('GoodsDetailPage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ productId: '1' });
  });

  it('renders loading view while loading', () => {
    render(
      <BrowserRouter>
        <GoodsDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders goods detail and option section', () => {
    render(
      <BrowserRouter>
        <GoodsDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Goods Detail for 1')).toBeInTheDocument();
    expect(screen.getByText('Option Section for 1')).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    // Mock the implementation of AsyncBoundary to simulate an error
    const { AsyncBoundary } = jest.requireMock('@/components/common/AsyncBoundary');
    AsyncBoundary.mockImplementationOnce(({ rejectedFallback }: { rejectedFallback: React.ReactNode }) => (
      <div>{rejectedFallback}</div>
    ));

    render(
      <BrowserRouter>
        <GoodsDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByText('에러 페이지')).toBeInTheDocument();
  });
});
