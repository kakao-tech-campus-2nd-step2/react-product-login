import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OptionSection } from './OptionSection';
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => {
  global.confirm = jest.fn(() => true);
});

test('renders OptionSection component and updates total price', async () => {
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

test('displays a confirmation dialog when the user is not authenticated', async () => {
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
