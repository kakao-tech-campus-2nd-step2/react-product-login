import { rest } from 'msw';
import { BASE_URL } from '../instance';
import { userSessionStorage } from '@/utils/storage';

export const loginMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    const storedUser = userSessionStorage.get();

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'mock-token',
        })
      );
    }

    return res(
      ctx.status(403),
      ctx.json({
        message: 'Invalid email or password',
      })
    );
  }),
];
