import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import * as useGetProductDetailHook from '@/api/hooks/useGetProductDetail';
import * as useGetProductOptionsHook from '@/api/hooks/useGetProductOptions';
import * as useAuthHook from '@/provider/Auth';
import { orderHistorySessionStorage } from '@/utils/storage';

import { OptionSection } from './OptionSection'; 

jest.mock('@/api/hooks/useGetProductDetail');
jest.mock('@/api/hooks/useGetProductOptions');
jest.mock('@/provider/Auth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('@/utils/storage', () => ({
  orderHistorySessionStorage: {
    set: jest.fn(),
  },
}));

describe('OptionSection', () => {
  const mockNavigate = jest.fn();
  const mockProductDetail = { productId: '1', price: 10000 };
  const mockProductOptions = [{ name: 'Quantity' }];

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetProductDetailHook.useGetProductDetail as jest.Mock).mockReturnValue({
      data: mockProductDetail,
    });
    (useGetProductOptionsHook.useGetProductOptions as jest.Mock).mockReturnValue({
      data: mockProductOptions,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuthHook.useAuth as jest.Mock).mockReturnValue({ user: 'test' });
  });

  it('renders correctly with initial state', () => {
    render(<OptionSection productId="1" />);

    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('10000원')).toBeInTheDocument();
    expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
  });

  it('updates total price when quantity changes', () => {
    render(<OptionSection productId="1" />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2' } });

    expect(screen.getByText('20000원')).toBeInTheDocument();
  });

  it('navigates to login page when user is not authenticated', () => {
    (useAuthHook.useAuth as jest.Mock).mockReturnValue(null);
    window.confirm = jest.fn(() => true);

    render(<OptionSection productId="1" />);

    const button = screen.getByText('나에게 선물하기');
    fireEvent.click(button);

    expect(window.confirm).toHaveBeenCalledWith('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/login'));
  });

  it('navigates to order page when user is authenticated', () => {
    render(<OptionSection productId="1" />);

    const button = screen.getByText('나에게 선물하기');
    fireEvent.click(button);

    expect(orderHistorySessionStorage.set).toHaveBeenCalledWith({
      id: 1,
      count: 1,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/order');
  });
});
