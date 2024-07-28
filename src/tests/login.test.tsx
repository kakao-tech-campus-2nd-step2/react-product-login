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

test('empty fields', async () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginPage />, { route: '/login' });
  const loginButton = screen.getByRole('button', { name: /로그인/i });

  await user.click(loginButton);

  expect(window.alert).toHaveBeenCalledWith('이메일과 비밀번호 모두 입력해주세요.');
});

test('successful login', async () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginPage />, { route: '/login' });

  const emailInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const loginButton = screen.getByRole('button', { name: /로그인/i });

  await user.type(emailInput, 'qqqq@qqq.com');
  await user.type(passwordInput, 'wwwwww');

  await user.click(loginButton);

  expect(authSessionStorage.get()).toBe('qqqq@qqq.com');
});

test('wrong password', async () => {
  renderWithProviders(<LoginPage />, { route: '/login' });
  const user = userEvent.setup();

  const emailInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const loginButton = screen.getByRole('button', { name: /로그인/i });

  await user.type(emailInput, 'qqqq@qqq.com');
  await user.type(passwordInput, '111111');

  await user.click(loginButton);

  expect(window.alert).toHaveBeenCalledWith('로그인에 실패했습니다.');
});

test('invalid form fields on enroll', async () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginPage />, { route: '/login' });
  const toEnrollForm = screen.getByText('회원가입하기');
  await user.click(toEnrollForm);

  expect(screen.getByText('회원가입을 위한 이메일을 입력해 주세요.')).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const emailValidation = screen.getByTestId('emailValidation');
  const passwordValidation = screen.getByTestId('passwordValidation');
  const enrollButton = screen.getByRole('button', { name: /회원가입/i });

  await user.type(emailInput, 'hi');
  await user.type(passwordInput, 'hi');

  expect(emailValidation).toHaveTextContent('❌');
  expect(passwordValidation).toHaveTextContent('❌');

  await user.click(enrollButton);

  expect(window.alert).toHaveBeenCalledWith('적절한 이메일과 비밀번호를 입력해주세요');
});

test('valid form fields on enroll', async () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginPage />, { route: '/login' });
  const toEnrollForm = screen.getByText('회원가입하기');
  await user.click(toEnrollForm);

  expect(screen.getByText('회원가입을 위한 이메일을 입력해 주세요.')).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const emailValidation = screen.getByTestId('emailValidation');
  const passwordValidation = screen.getByTestId('passwordValidation');
  const enrollButton = screen.getByRole('button', { name: /회원가입/i });

  await user.type(emailInput, 'qqqq@www.com');
  await user.type(passwordInput, '121212');

  expect(emailValidation).toHaveTextContent('✅');
  expect(passwordValidation).toHaveTextContent('✅');

  await user.click(enrollButton);

  expect(authSessionStorage.get()).toBe('qqqq@www.com');
});
