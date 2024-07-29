import { useMutation } from '@tanstack/react-query';

import { loginUser } from '@/api/utils';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { IEnrollForm } from '@/components/features/Login/EnrollForm';

interface ILoginForm extends IEnrollForm {}

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleConfirm,
}: ILoginForm) => {
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      handleConfirm();
    },
    onError: () => {
      alert('로그인에 실패했습니다.');
    },
  });

  const handleLogin = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      alert('이메일과 비밀번호 모두 입력해주세요.');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <form>
      <UnderlineTextField placeholder="이메일" value={email} onChange={setEmail} />
      <Spacing />
      <UnderlineTextField
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={setPassword}
      />
      <Spacing
        height={{
          initial: 40,
          sm: 60,
        }}
      />
      <Button type="button" onClick={handleLogin}>
        로그인
      </Button>
    </form>
  );
};
