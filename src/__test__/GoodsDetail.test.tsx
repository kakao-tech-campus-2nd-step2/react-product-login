import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/provider/Auth';
import { BrowserRouter } from 'react-router-dom';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

// Mock the hooks
jest.mock('@/api/hooks/useGetProductDetail');
jest.mock('@/api/hooks/useGetProductOptions');

const queryClient = new QueryClient();

const sampleProduct = {
  id: 2263833,
  name: '외식 통합권 10만원권',
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
  price: 100000,
};

const sampleOptions = [
  {
    id: 1,
    name: '수량',
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{ui}</AuthProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>,
  );
};

describe('GoodsDetail Components', () => {
  beforeEach(() => {
    (useGetProductDetail as jest.Mock).mockReturnValue({
      data: sampleProduct,
    });

    (useGetProductOptions as jest.Mock).mockReturnValue({
      data: sampleOptions,
    });
  });

  test('GoodsDetailHeader rendering SUCCESS', async () => {
    renderWithProviders(<GoodsDetailHeader productId={sampleProduct.id.toString()} />);

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', sampleProduct.imageUrl);
      expect(image).toHaveAttribute('alt', sampleProduct.name);

      expect(screen.getByText(sampleProduct.name)).toBeInTheDocument();
      expect(screen.getByAltText(sampleProduct.name)).toBeInTheDocument();
      expect(screen.getByText(`${sampleProduct.price}원`)).toBeInTheDocument();
    });
  });

  test('GoodsDetailOptionSection rendering SUCCESS', async () => {
    renderWithProviders(<OptionSection productId={sampleProduct.id.toString()} />);

    await waitFor(() => {
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
      expect(screen.getByLabelText('수량 1개 감소')).toBeInTheDocument();
      expect(screen.getByLabelText('수량 1개 추가')).toBeInTheDocument();
      expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
      expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
    });
  });

  test('GoodsDetailOptionSection increase count', async () => {
    renderWithProviders(<OptionSection productId={sampleProduct.id.toString()} />);

    const spinbutton = screen.getByRole('spinbutton') as HTMLInputElement;
    spinbutton.value = '2';

    await waitFor(() => {
      expect(spinbutton.value).toBe('2');
    });
  });

  test('GoodsDetailOptionSection decrease count', async () => {
    renderWithProviders(<OptionSection productId={sampleProduct.id.toString()} />);

    const spinbutton = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.click(screen.getByLabelText('수량 1개 감소'));

    await waitFor(() => {
      expect(spinbutton.value).toBe('1');
    });
  });
});
