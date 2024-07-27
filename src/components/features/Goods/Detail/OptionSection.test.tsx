import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, screen } from '@testing-library/react';

import { queryClient } from '@/api/instance';
import { renderWithRouter } from '@/utils/test/renderWithRouter';

import { OptionSection } from './OptionSection';

test('로그인 정보가 없을 시 로그인 메뉴로 이동', async () => {
  const productId = 3245119;
  window.confirm = jest.fn();
  const mockedUsedNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));

  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <OptionSection productId={String(productId)} />
    </QueryClientProvider>,
  );

  await screen.findByText('Option A');

  fireEvent.click(screen.getByText('나에게 선물하기'));
  expect(window.confirm).toBeCalled();
});
