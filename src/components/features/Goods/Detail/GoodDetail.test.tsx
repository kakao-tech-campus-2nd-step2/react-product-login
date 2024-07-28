import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderResult} from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react'; // React를 명시적으로 가져옵니다

import { server } from '@/mocks/server';

import { GoodsDetailHeader } from './Header';
import { GoodsDetail } from './index';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('@chakra-ui/react', () => ({
  Divider: () => <hr />,
}));

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement): RenderResult => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('GoodsDetail', () => {
  it('GoodsDetailHeader가 올바른 productId를 가지고 있는지 확인하는 test', async () => {
    renderWithQueryClient(<GoodsDetail productId="3245119" />);
    await waitFor(() => expect(screen.getByRole('article')).toBeInTheDocument());
  });
});

describe('GoodsDetailHeader', () => {
  it('제품 정보 표시 test', async () => {
    renderWithQueryClient(<GoodsDetailHeader productId="3245119" />);
    
    const image = await screen.findByAltText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png');
    expect(screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
    expect(screen.getByText('145000원')).toBeInTheDocument();
    expect(screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!')).toBeInTheDocument();
  });
});