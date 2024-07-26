import { rest } from 'msw';

import { BASE_URL } from '../instance';

export const registerHandlers = [
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email && password) {
      return res(
        ctx.status(201),
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
