import { rest } from 'msw';

type Member = {
  email: string;
  password: string;
}

const members: Member[] = []; 

export const authHandlers = [
  rest.post<Member>('/api/members/register', (req, res, ctx) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    const existingMember = members.find(member => member.email === email);
    if (existingMember) {
      return res(ctx.status(400), ctx.json({ message: 'Email already exists' }));
    }

    const newMember = { email, password }; 
    members.push(newMember);

    return res(ctx.status(201), ctx.json({
      email: newMember.email,
      token: 'fake-token', 
    }));
  }),

  rest.post<Member>('/api/members/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
    }

    const findMember = members.find(member => member.email === email && member.password === password);
    if (!findMember) {
      return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
    }

    return res(ctx.status(200), ctx.json({
      email: findMember.email,
      token: 'fake-token', 
    }));
  }),
];
