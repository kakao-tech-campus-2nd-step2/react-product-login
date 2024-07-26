import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';

import { OptionSection } from './OptionSection';

jest.mock('@/provider/Auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));
jest.mock('@/api/hooks/useGetProductOptions', () => ({
  useGetProductOptions: jest.fn(),
}));

describe('OptionSection', () => {
  const productId = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    (useGetProductDetail as jest.Mock).mockReturnValue({
      data: { price: 1000 }
    });
    (useGetProductOptions as jest.Mock).mockReturnValue({
      data: [{ name: 'Option 1' }]
    });
    (useAuth as jest.Mock).mockReturnValue(null);
  });

  test('컴포넌트가 제대로 렌더링 되는지 확인', () => {
    render(
      <MemoryRouter>
        <OptionSection productId={productId} />
      </MemoryRouter>
    );

    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
  });

  test('총 결제 금액이 올바르게 계산되는지 확인', () => {
    render(
      <MemoryRouter>
        <OptionSection productId={productId} />
      </MemoryRouter>
    );

    expect(screen.getByText('1000원')).toBeInTheDocument();
  });
});