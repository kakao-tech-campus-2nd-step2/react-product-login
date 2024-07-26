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

const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'password123';

export const loginMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const response: LoginSuccessResponse = {
        email,
        token: 'mocked-jwt-token',
      };
      return res(ctx.status(200), ctx.json(response));
    } else {
      return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
    }
  }),
];
