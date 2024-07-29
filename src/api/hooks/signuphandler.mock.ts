import { rest } from 'msw';
import { BASE_URL } from '../instance';

// Request body 타입 정의
interface RegisterRequestBody {
  email: string;
  password: string;
}

export const signuphandler = [
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as RegisterRequestBody;

    if (email && password) {
      return res(ctx.status(201), ctx.json({ token: `${email}` }));
    }

    return res(ctx.status(400), ctx.json({ message: '입력값이 올바르지 않습니다.' }));
  }),
];
