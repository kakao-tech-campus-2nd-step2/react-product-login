import { rest } from 'msw';

import { BASE_URL } from '../instance';

// Request body 타입 정의
interface LoginRequestBody {
  email: string;
  password: string;
}

export const loginhandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;

    if (email === 'test' && password === 'test') {
      return res(ctx.status(200), ctx.json({ token: '로그인성공!' }));
    }

    return res(ctx.status(403), ctx.json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' }));
  }),
];
