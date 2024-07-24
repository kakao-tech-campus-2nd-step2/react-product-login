import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { GoodsDetailHeader } from './Header';

//Given: 테스트의 초기 상태나 조건을 설정한다.
//When: 테스트 대상이 되는 행동을 수행한다.
//Then: 행동의 결과를 확인한다.

test('상품의 정보들이 화면에 표시되는지 확인', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <GoodsDetailHeader productId="3245119" />
    </QueryClientProvider>,
  );
  await waitFor(() => {
    expect(
      screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
    ).toBeInTheDocument();
    expect(screen.getByText('145000원')).toBeInTheDocument();
    expect(
      screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!'),
    ).toBeInTheDocument();
  });
});
