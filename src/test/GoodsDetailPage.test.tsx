import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

const queryClient = new QueryClient();

test('GoodsDetailPage 상품 정보 렌더링 테스트', async () => {
  const productId = '3245119';
  render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <GoodsDetail productId={productId} />
      </QueryClientProvider>
    </ChakraProvider>,
  );

  expect(await screen.findByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!')).toBeInTheDocument();
  const img = screen.getByRole('img', { name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)' });
  expect(img).toHaveAttribute(
    'src',
    'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  );
  expect(await screen.findByText('145000원')).toBeInTheDocument();
});

test('GoodsDetailPage 옵션 렌더링 테스트', async () => {
  const productId = '1';
  const name = 'Option A';
  render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <OptionSection productId={productId} />
        </MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
  await waitFor(() => {
    expect(screen.getByLabelText('수량 1개 감소')).toBeInTheDocument();
    expect(screen.getByLabelText('수량 1개 추가')).toBeInTheDocument();
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '나에게 선물하기' })).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
