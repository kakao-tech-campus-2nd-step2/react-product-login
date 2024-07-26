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
      <Button type="button" onClick={handleConfirm}>
        로그인
      </Button>
    </form>
  );
};
