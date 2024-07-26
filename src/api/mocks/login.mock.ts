import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginSuccessResponse = {
  email: string;
  token: string;
};

export const loginMockHandler = [
  rest.post<LoginRequestBody>(`${BASE_URL}/api/members/login`, async (req, res, ctx) => {
    const { email } = await req.json();

    // 항상 성공 응답 반환
    const response: LoginSuccessResponse = {
      email,
      token: 'mocked-jwt-token',
    };
    return res(ctx.status(200), ctx.json(response));
  }),
];
