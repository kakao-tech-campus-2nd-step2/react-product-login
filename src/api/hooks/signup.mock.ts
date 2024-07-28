import { rest } from 'msw';
import { getUserSignupPath, UserRequestData, UserResponseData } from '@/api/hooks/useSignup';

export const signupMockHandler = [
  rest.post(getUserSignupPath(), (req, res, ctx) => {
    const { email, password } = req.body as UserRequestData;

    // 간단한 유효성 검사: 이메일과 비밀번호가 모두 존재하는지 확인
    if (email && password) {
      const mockResponse: UserResponseData = {
        email,
        token: 'mock-token',
      };

      return res(ctx.status(200), ctx.json(mockResponse));
    }

    // 잘못된 요청에 대한 응답
    return res(ctx.status(400), ctx.json({ error: 'Invalid email or password' }));
  }),
];
