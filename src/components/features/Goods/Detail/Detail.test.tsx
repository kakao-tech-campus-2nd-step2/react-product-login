import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { GoodsDetailHeader } from './Header';

test('상품의 detail 정보들이 화면에 표시되는지 확인', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <GoodsDetailHeader productId="3245119" />
    </QueryClientProvider>,
  );

  //상품 이름이 문서에 있는지 확인
  await screen.findByText(
    (content) =>
      content.includes('단독각인') &&
      content.includes('피렌체 1221 에디션 오드코롱 50ml') &&
      content.includes('13종 택1'),
  );
  //상품 가격이 문서에 있는지 확인
  expect(screen.getByText(/145000/)).toBeInTheDocument();
});
