import { rest } from 'msw';

type RegisterRequestBody = {
  email: string;
  password: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

export const authMockHandler = [
  rest.post('/api/members/register', (req, res, ctx) => {
    const { email } = req.body as RegisterRequestBody;
    return res(
      ctx.status(201),
      ctx.json({
        email,
        token: email,
      }),
    );
  }),

  rest.post('/api/members/login', (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;
    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: email,
        }),
      );
    } else {
      return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
    }
  }),
];
