import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('상품 상세 정보 렌더링 성공', async () => {
  renderWithProviders(<GoodsDetail productId={productData.id.toString()} />);

  await waitFor(() => {
    expect(screen.getByAltText(productData.name)).toBeInTheDocument();
    expect(screen.getByText(productData.name)).toBeInTheDocument();
    expect(screen.getByText(`${productData.price}원`)).toBeInTheDocument();
  });
});

test('OptionSection 렌더링 성공', async () => {
  renderWithProviders(<OptionSection productId={productData.id.toString()} />);

  await waitFor(() => {
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByLabelText('수량 1개 감소')).toBeInTheDocument();
    expect(screen.getByLabelText('수량 1개 추가')).toBeInTheDocument();
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
  });
});

test('OptionSection 수량 증가 테스트', async () => {
  renderWithProviders(<OptionSection productId={productData.id.toString()} />);

  const spinbutton = screen.getByRole('spinbutton') as HTMLInputElement;
  fireEvent.change(spinbutton, { target: { value: '2' } });

  await waitFor(() => {
    expect(spinbutton.value).toBe('2');
  });
});

test('OptionSection 수량 감소 테스트', async () => {
  renderWithProviders(<OptionSection productId={productData.id.toString()} />);

  const spinbutton = screen.getByRole('spinbutton') as HTMLInputElement;
  fireEvent.click(screen.getByLabelText('수량 1개 감소'));

  await waitFor(() => {
    expect(spinbutton.value).toBe('1');
  });
});
