import { rest } from 'msw';

import { BASE_URL } from '../instance';

type LoginMockRequest = {
  id: string;
  password: string;
};

export const loginMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { id, password } = req.body as LoginMockRequest;

    // 임의의 아이디와 비밀번호로 로그인 성공
    if (id === 'example@gmail.com' && password === 'example123') {
      return res(
        ctx.status(200),
        ctx.json({
          id,
          token: 'example-token',
        }),
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      }),
    );
  }),
];