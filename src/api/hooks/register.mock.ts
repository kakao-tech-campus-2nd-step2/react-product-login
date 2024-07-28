import { rest } from 'msw';
import { BASE_URL } from '../instance';
import { userSessionStorage } from '@/utils/storage';

export const registerMockHandler = [
  rest.post(`${BASE_URL}/api/members/register`, async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (email && password) {
      // 사용자 정보를 sessionStorage에 저장
      userSessionStorage.set({ email, password });
      return res(
        ctx.status(201),
        ctx.json({
          email,
          token: 'mock-token',
        })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        message: 'Invalid input',
      })
    );
  }),
];
