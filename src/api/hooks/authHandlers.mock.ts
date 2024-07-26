import { rest } from 'msw';

import { ApiPath } from '@/routes/path';

export const MOCK_USERS = [
  {
    email: 'real.dassy@gmail.com',
    password: 'qwer123',
    token: 'mock-token',
  },
];

export const authHandlers = [
  rest.post(ApiPath.members.register, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res(ctx.status(400));
    }

    const newUser = { email, password, token: 'mock-token' };
    console.log(newUser);
    MOCK_USERS.push(newUser);

    return res(ctx.status(201), ctx.json({ email, token: newUser.token }));
  }),

  rest.post(ApiPath.members.login, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = MOCK_USERS.find(
      (userInfo) => userInfo.email === email && userInfo.password === password,
    );

    if (user) {
      return res(ctx.status(200), ctx.json({ email, token: user.token }));
    }

    return res(ctx.status(401));
  }),
];
