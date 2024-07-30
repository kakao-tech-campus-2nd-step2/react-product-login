import { rest } from 'msw';

import { BASE_URL } from '../instance';

export const loginHandlers = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email && password) {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'token',
        }),
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        error: 'Invalid input',
      }),
    );
  }),
];
