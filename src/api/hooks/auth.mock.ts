import { rest } from 'msw';

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'password1234';

export const authMockHandler = [
  rest.post('https://api.example.com/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    return res(ctx.status(201), ctx.json({ email, token: 'fake-token' }));
  }),
  rest.post('https://api.example.com/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      return res(ctx.status(200), ctx.json({ email, token: 'fake-token' }));
    }

    return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
  }),
];
