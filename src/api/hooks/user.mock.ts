import { rest } from 'msw';

import { BASE_URL } from '../instance';

type SignupParams = {
  id: string;
  email: string;
  password: string;
};

type SignupResponseData = {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
};

const USERS_MOCK_DATA = [
  {
    userId: '1',
    email: 'user1@example.com',
    password: 'password1',
  },
  {
    userId: '2',
    email: 'user2@example.com',
    password: 'password2',
  },
];

export const userMockHandler = [
  rest.post<SignupParams, Record<string, never>, SignupResponseData>(
    `${BASE_URL}/api/signup`,
    (req, res, ctx) => {
      const { id, email, password } = req.body;
      const existingUser = USERS_MOCK_DATA.find((user) => user.email === email);

      if (existingUser) {
        return res(
          ctx.status(400),
          ctx.json({
            success: false,
            message: 'User already exists',
          }),
        );
      }

      const newUser = {
        userId: id,
        email,
        password,
      };

      USERS_MOCK_DATA.push(newUser);

      return res(
        ctx.status(201),
        ctx.json({
          success: true,
          message: 'User registered successfully',
          data: {
            userId: id,
            email,
          },
        }),
      );
    },
  ),
];

export { USERS_MOCK_DATA };
