import { rest } from 'msw';
import { getUserLoginPath, UserRequestData, UserResponseData } from '@/api/hooks/useLogin';

export const loginMockHandler = [
  rest.post(getUserLoginPath(), (req, res, ctx) => {
    const { email, password } = req.body as UserRequestData;

    // 요청된 이메일과 비밀번호가 123으로 전달될 때 모킹합니다.
    if (email === '123' && password === '123') {
      const mockResponse: UserResponseData = {
        email,
        token: 'mock-token',
      };

      return res(ctx.status(200), ctx.json(mockResponse));
    }

    // 유효하지 않은 요청에 대한 응답
    return res(ctx.status(403), ctx.json({ error: 'Invalid email or password' }));
  }),
];
