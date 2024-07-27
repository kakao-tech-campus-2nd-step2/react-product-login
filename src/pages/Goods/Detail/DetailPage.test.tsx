import '@testing-library/jest-dom/extend-expect';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';
import { useAuth } from '@/provider/Auth';
import { orderHistorySessionStorage } from '@/utils/storage';

const queryClient = new QueryClient();

const product = {
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  productId: '3245119',
  price: 145000,
};

jest.mock('@/provider/Auth');
jest.mock('@/utils/storage', () => ({
  orderHistorySessionStorage: {
    set: jest.fn(),
  },
}));

const mockUseAuth = useAuth as jest.Mock;

test('상품 상세 헤더에서 상품 상세 정보를 잘 가져오는지 확인합니다.', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <GoodsDetailHeader productId={product.productId} />
    </QueryClientProvider>,
  );

  await waitFor(() => {
    // 로드된 상품 상세 정보 확인
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('145000원')).toBeInTheDocument();
  });
});

test('선물하기 버튼 클릭시 스토리지에 주문 정보가 저장되는지 확인', async () => {
  mockUseAuth.mockReturnValue(true);

  const setItemMock = jest.fn();
  orderHistorySessionStorage.set = setItemMock;

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <OptionSection productId={product.productId} />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  const button = screen.getByRole('button', { name: '나에게 선물하기' });
  fireEvent.click(button);

  expect(setItemMock).toHaveBeenCalledWith({ id: product.productId, count: 1 });
});
