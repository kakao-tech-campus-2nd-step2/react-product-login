import { useLoginForm } from '@/pages/LoginPage/hooks/useLoginForm';

import { Button } from '@/components/ui/Button';
import { UderLineInput } from '@/components/ui/Input/UnderLine';

import { buttonStyle, formContainerStyle } from './styles';

export const LoginForm = () => {
  const { usernameRef, passwordRef, handleLogin } = useLoginForm();

  return (
    <form onSubmit={handleLogin} css={formContainerStyle}>
      <UderLineInput
        type="text"
        name="username"
        ref={usernameRef}
        size="response"
        placeholder="이름"
      />
      <UderLineInput
        type="password"
        name="password"
        ref={passwordRef}
        size="response"
        placeholder="비밀번호"
      />
      <Button size="response" type="submit" width="30rem" css={buttonStyle}>
        로그인
      </Button>
    </form>
  );
};
