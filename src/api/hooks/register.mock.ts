import { rest } from 'msw';

interface UserBody {
  email: string;
  password: string;
}

export const registerMockHandler = [
  rest.post<UserBody>('/api/members/register', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email && password) {
      return res(
        ctx.status(201),
        ctx.json({
          email,
          token: 'mock-token',
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Invalid input',
        })
      );
    }
  }),
];