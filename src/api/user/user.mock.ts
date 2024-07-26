import { rest } from 'msw';

export const userHandlers = [
  // TODO: api/members/register로 하면 http를 사용해서 matching request url이 없다고 나옴
  rest.post('https://api.example.com/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    return res(
      ctx.status(201),
      ctx.json({
        email,
        token: 'mock-token',
      }),
    );
  }),
];
