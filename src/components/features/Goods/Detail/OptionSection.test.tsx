import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent,render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { OptionSection } from './OptionSection';

beforeAll(() => {
  global.confirm = jest.fn(() => true);
});

test('옵션 구성요소 렌더링 및 총 가격 업데이트', async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <OptionSection productId="3245119" />
      </QueryClientProvider>
  </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('145000원')).toBeInTheDocument();
  });

  fireEvent.change(screen.getByDisplayValue('1'), {
    target: { value: '2' },
  });

  await waitFor(() => {
    expect(screen.getByText('290000원')).toBeInTheDocument();
  });
});

test('사용자 인증되지 않은 경우 대화 상자 표시', async () => {
  jest.mock('@/provider/Auth', () => ({
    useAuth: () => null,
  }));

  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <OptionSection productId="3245119" />
      </QueryClientProvider>
  </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('나에게 선물하기'));

  expect(window.confirm).toHaveBeenCalledWith(
    '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?'
  );
});
