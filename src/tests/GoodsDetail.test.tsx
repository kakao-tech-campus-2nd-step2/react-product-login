import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

const queryClient = new QueryClient();

const productData = {
  id: 3245119,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  price: 145000,
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

describe('GoodsDetail Component', () => {
  it('제품 상세 정보를 정확하게 렌더링한다', async () => {
    renderWithProviders(<GoodsDetail productId={productData.id.toString()} />);
    await waitFor(() => {
      expect(screen.getByText(productData.name)).toBeInTheDocument();
      expect(screen.getByText(`${productData.price}원`)).toBeInTheDocument();
      expect(screen.getByAltText(productData.name)).toBeInTheDocument();
    });
  });
});

describe('OptionSection Component', () => {
  it('옵션 섹션을 정확하게 렌더링한다', async () => {
    renderWithProviders(<OptionSection productId={productData.id.toString()} />);
    await waitFor(() => {
      expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
      expect(screen.getByText(`${productData.price}원`)).toBeInTheDocument();
      expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
    });
  });

  it('수량 변경에 따라 총 결제 금액을 정확하게 계산한다', async () => {
    renderWithProviders(<OptionSection productId={productData.id.toString()} />);
    const spinButton = screen.getByRole('spinbutton');
    await userEvent.clear(spinButton);
    await userEvent.type(spinButton, '2');
    await waitFor(() => {
      expect(screen.getByText(`${productData.price * 2}원`)).toBeInTheDocument();
    });
  });
});
