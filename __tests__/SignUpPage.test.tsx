import { fireEvent,render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SignUpPage } from '@/pages/SignUp';

beforeAll(() => {
  global.alert = jest.fn();
});

afterAll(() => {
  global.alert = window.alert;
});

test('id 미입력 시 alert 창 뜨는지', () => {
  render(
    <MemoryRouter>
      <SignUpPage />
    </MemoryRouter>,
  );

  fireEvent.change(screen.getByPlaceholderText('이메일'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: 'password' } });

  fireEvent.click(screen.getByText('회원가입'));

  expect(window.alert).toHaveBeenCalledWith('아이디를 입력해주세요.');
});
