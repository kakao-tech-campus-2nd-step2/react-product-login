import { rest } from 'msw';

export const authMockHandler = [
  rest.post('https://api.example.com/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Invalid input' })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({ email, token: 'fake-token' })
    );
  }),
];