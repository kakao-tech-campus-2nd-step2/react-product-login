import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import React from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { getDynamicPath } from '@/routes/path';

import { GoodsDetail } from './index';
import { OptionSection } from './OptionSection';

const queryClient = new QueryClient();
const mockServer = setupServer(...categoriesMockHandler, ...productsMockHandler);
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

const productId = '3245119';

const MockNavigate = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(getDynamicPath.login());
  }, [navigate]);

  return null;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/products/${productId}`]}>
        <Routes>
          <Route path="/products/:productId" element={ui} />
          <Route path="/login" element={<div>로그인</div>} />
          <Route path="/" element={<MockNavigate />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

test('상품 상세 정보가 올바르게 표시되어야 한다', async () => {
  renderWithProviders(<GoodsDetail productId={productId} />);

  expect(await screen.findByAltText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
  expect(screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
  expect(screen.getByText('145000원')).toBeInTheDocument();
});

test('로그인 되지 않은 경우 로그인 페이지로 리디렉션되어야 한다', async () => {
  const confirmMock = jest.spyOn(window, 'confirm').mockImplementation(() => true);

  renderWithProviders(<OptionSection productId={productId} />);

  const button = await screen.findByText('나에게 선물하기');

  fireEvent.click(button);

  expect(confirmMock).toHaveBeenCalledWith(
    '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?'
  );

  expect(await screen.findByText('로그인')).toBeInTheDocument();

  confirmMock.mockRestore();
});
