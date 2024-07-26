import { rest } from 'msw';

import { BASE_URL } from '../instance';

type LoginRequestBody = {
  email: string;
  password: string;
};
export const loginHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;

    // Mocking login validation
    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'mocked-jwt-token',
        }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid email or password' }));
    }
  }),
];
