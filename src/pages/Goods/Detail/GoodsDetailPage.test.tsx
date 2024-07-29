import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';

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

test('상품 상세페이지에 상품 이미지, 이름, 가격, 안내문이 올바르게 렌더링된다.', async () => {
  renderWithProviders(<GoodsDetailHeader productId={'3245119'} />);

  await waitFor(() => {
    const image = screen.getByAltText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)');
    expect(image).toBeInTheDocument();

    const name = screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)');
    expect(name).toBeInTheDocument();

    const price = screen.getByText('145000원');
    expect(price).toBeInTheDocument();

    const notice = screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!');
    expect(notice).toBeInTheDocument();
  });
});
