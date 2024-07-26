import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import { useHandleOrderHistory } from '@/hooks/useHandleOrderHistory';

import { OrderPage } from './index';

jest.mock('@/hooks/useHandleOrderHistory');
jest.mock('@/components/common/AsyncBoundary', () => ({
  AsyncBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('@/components/common/View/LoadingView', () => ({
  LoadingView: () => <div>Loading...</div>,
}));
jest.mock('@/components/features/Order/OrderForm', () => ({
  OrderForm: ({ orderHistory }: { orderHistory: string }) => <div>{orderHistory}</div>,
}));

describe('OrderPage', () => {
  it('orderHistory가 없을 때 LoadingView를 렌더링', () => {
    (useHandleOrderHistory as jest.Mock).mockReturnValue({ orderHistory: null });
    render(<OrderPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('orderHistory가 있을 때 OrderForm을 orderHistory와 함께 렌더링', () => {
    (useHandleOrderHistory as jest.Mock).mockReturnValue({ orderHistory: 'Mock Order History' });
    render(<OrderPage />);
    expect(screen.getByText('Mock Order History')).toBeInTheDocument();
  });
});
