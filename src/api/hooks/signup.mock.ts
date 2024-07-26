import { rest } from 'msw';

import { BASE_URL } from '../instance';

type SignupRequestBody = {
  email: string;
  password: string;
};

const usersDatabase = [
  { email: 'test@example.com', password: 'password123' }, // 임시 데이터
];

export const signupHandler = [
  // 회원가입 엔드포인트 수정
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as SignupRequestBody;

    // 중복 이메일 체크
    const existingUser = usersDatabase.find((user) => user.email === email);
    if (existingUser) {
      return res(ctx.status(400), ctx.json({ message: '이미 사용 중인 이메일입니다.' }));
    }

    // 임시 데이터와 동일한 경우
    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(400),
        ctx.json({ message: '해당 이메일과 비밀번호는 사용할 수 없습니다.' }),
      );
    }

    // 사용자 추가
    usersDatabase.push({ email, password });
    return res(ctx.status(201), ctx.json({ email, token: 'mocked-jwt-token' })); // 이메일과 토큰 반환
  }),
];
