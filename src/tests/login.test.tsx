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

test('이메일 또는 비밀번호의 필드가 비워져 있을 때, 필드를 채워 달라는 알러트 잘 뜨는지.', async () => {
  const user = userEvent.setup();
  renderWithProviders(<LoginPage />, { route: '/login' });
  const loginButton = screen.getByRole('button', { name: /로그인/i });

  await user.click(loginButton);

  expect(window.alert).toHaveBeenCalledWith('이메일과 비밀번호 모두 입력해주세요.');
});

test('이메일과 비밀번호 필드들 모두 값이 들어 있고 로그인이 성공했을 때, 토큰이 authSessionStorage에 잘 저장 되는지.', async () => {
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

test('두 필드 모두 값이 채워져 있지만 로그인에 실패했을 때, 로그인 실패 했음을 알러트로 잘 알리는지.', async () => {
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

test('회원 가입할 때, 부적절한 이메일 및 비밀번호 입력시 사용불가 표시가 화면에 잘 뜨는지.', async () => {
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

test('회원 가입할 때, 적절한 이메일 및 비밀번호 입력시 사용 가능 표시가 화면에 잘 뜨는지.', async () => {
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
