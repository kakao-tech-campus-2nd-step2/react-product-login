import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';

const queryClient = new QueryClient();

test('상품 상세 헤더에서 상품 상세 정보를 잘 가져오는지 확인합니다.', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <GoodsDetailHeader productId="3245119" />
    </QueryClientProvider>,
  );

  await waitFor(() => {
    // 로드된 상품 상세 정보 확인
    expect(
      screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
    ).toBeInTheDocument();
    expect(screen.getByText('145000원')).toBeInTheDocument();
  });
});
