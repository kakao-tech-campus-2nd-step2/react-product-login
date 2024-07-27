import { rest } from 'msw';

interface User {
  email: string;
  password: string;
  token: string;
}

const users: User[] = [];

export const handlers = [
  rest.post('/api/members/register', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res(
        ctx.status(400),
        ctx.json({ error: "이미 존재하는 이메일입니다." })
      );
    }

    const newUser: User = {
      email,
      password,
      token: Math.random().toString(36).substring(7) 
    };

    users.push(newUser);

    return res(
      ctx.status(201),
      ctx.json({ email: newUser.email, token: newUser.token })
    );
  }),

  rest.post('/api/members/login', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      return res(
        ctx.status(403),
        ctx.json({ error: "아이디 또는 비밀번호가 잘못되었습니다." })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ email: foundUser.email, token: foundUser.token })
    );
  }),
];
