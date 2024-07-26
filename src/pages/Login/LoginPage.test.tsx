import { fireEvent,render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { LoginPage } from '@/pages/Login';

jest.spyOn(window.location, 'replace').mockImplementation(() => {});

test('회원가입_성공', async () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );

  fireEvent.change(screen.getByPlaceholderText('이메일'), {
    target: { value: 'real.dassy@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: 'qwer123' } });
  fireEvent.click(screen.getByText('회원가입'));

  const successMessage = await screen.findByText('회원가입 성공');
  expect(successMessage).toBeInTheDocument();
});

test('로그인_성공', async () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );

  fireEvent.change(screen.getByPlaceholderText('이메일'), {
    target: { value: 'real.dassy@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: 'qwer123' } });
  fireEvent.click(screen.getByText('로그인'));
});
