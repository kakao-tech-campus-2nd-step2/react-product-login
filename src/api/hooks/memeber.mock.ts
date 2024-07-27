import { rest } from "msw";

import { BASE_URL } from "../instance";

interface User {
  email: string;
  password: string;
}

const users: User[] = [
  {
    email: "test@test.com",
    password: "test1234",
  },
];

export const memberMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      return res(ctx.status(403), ctx.json({ error: "이메일 또는 비밀번호가 잘못되었습니다." }));
    }

    const token = "mockToken";

    return res(ctx.status(200), ctx.json({ email, token }));
  }),
];
