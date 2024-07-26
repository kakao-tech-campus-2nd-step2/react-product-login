import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { queryClient } from '@/api/instance';

import { GoodsDetailHeader } from './Header';

test('render GoodsDetailHeader', async () => {
  const productId = 3245119;
  render(
    <QueryClientProvider client={queryClient}>
      <GoodsDetailHeader productId={String(productId)} />
    </QueryClientProvider>,
  );

  await screen.findByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!');
  expect(
    screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
  ).toBeInTheDocument();
  expect(screen.getByText('145000원')).toBeInTheDocument();
});
