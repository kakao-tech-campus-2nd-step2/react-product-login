import { authSessionStorage } from '../storage';

interface QueryParams {
  get(param: string): string | null;
}

export const handleLogin = (id: string, password: string, queryParams: QueryParams) => {
  const storedAuth = authSessionStorage.get();

  if (storedAuth && id === storedAuth.id && password === storedAuth.pwd) {
    alert('로그인 성공!');
    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    window.location.replace(redirectUrl);
    return;
  }

  if (storedAuth) {
    if (id !== storedAuth.id) {
      alert('아이디를 확인해주세요.');
    } else if (password !== storedAuth.pwd) {
      alert('비밀번호가 틀립니다.');
    }
  } else {
    alert('회원 정보를 찾을 수 없습니다.');
  }
};
