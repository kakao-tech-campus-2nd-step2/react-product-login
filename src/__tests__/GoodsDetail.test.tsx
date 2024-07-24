import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

const productData = {
  id: 3245119,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  price: 145000,
};

test('상품가 상세 정보가 올바르게 렌더링된다.', async () => {
  renderWithProviders(<GoodsDetail productId={productData.id.toString()} />);

  await waitFor(() => {
    expect(screen.getByAltText(productData.name)).toBeInTheDocument(); // 이미지
    expect(screen.getByText(productData.name)).toBeInTheDocument(); // 이름
    expect(screen.getByText(`${productData.price}원`)).toBeInTheDocument(); // 가격
  });
});

test('OptionSection이 올바르게 렌더링된다.', async () => {
  renderWithProviders(<OptionSection productId={productData.id.toString()} />);

  await waitFor(() => {
    expect(screen.getByRole('spinbutton')).toBeInTheDocument(); // 수량 input
    expect(screen.getByLabelText('수량 1개 감소')).toBeInTheDocument(); // - 버튼
    expect(screen.getByLabelText('수량 1개 추가')).toBeInTheDocument(); // + 버튼
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument(); // 총 결제 금액
    expect(screen.getByText('나에게 선물하기')).toBeInTheDocument(); // 나에게 선물하기 버튼
  });
});
