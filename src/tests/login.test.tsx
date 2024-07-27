import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { queryClient } from '@/api/instance';
import { LoginPage } from '@/pages/Login';
import { AuthProvider } from '@/provider/Auth';
import { authSessionStorage } from '@/utils/storage';

import { worker } from '../../server';

beforeAll(() => {
  worker.listen();
  window.alert = jest.fn();
});
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/login" element={ui} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>,
  );
};

test('successful login', async () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginPage />, { route: '/login' });

  const emailInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const loginButton = screen.getByRole('button', { name: /로그인/i });

  await user.type(emailInput, 'qqqq');
  await user.type(passwordInput, 'wwww');

  await user.click(loginButton);

  expect(authSessionStorage.get()).toBe('qqqq');
});
