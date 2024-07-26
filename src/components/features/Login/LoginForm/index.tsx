import { loginUser } from '@/api/user/api';
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
  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      handleConfirm();
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <form>
      <UnderlineTextField
        placeholder="이름"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Spacing />
      <UnderlineTextField
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
