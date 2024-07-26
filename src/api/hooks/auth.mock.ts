import { rest } from 'msw';

import { BASE_URL } from '../instance';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const authMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;

    if (email === '1234@kakao.com' && password === '1234') {
      return res(
        ctx.status(200),
        ctx.json({
          email: '1234@kakao.com',
          token: 'abcdefg',
        }),
      );
    } else {
      return res(
        ctx.status(403),
        ctx.json({
          message: '유효하지 않은 이메일(또는 비밀번호)입니다.',
        }),
      );
    }
  }),
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email && password) {
      return res(
        ctx.status(201),
        ctx.json({
          email,
          token: 'abcdefg',
        }),
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: '유효하지 않은 입력입니다.',
        }),
      );
    }
  }),
];
