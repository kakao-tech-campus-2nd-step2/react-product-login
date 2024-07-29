import AuthLayout from '@/layouts/AuthLayout';
import { LogoText } from '@/layouts/AuthLayout/LogoText';
import { ROUTER_PATH } from '@/routes/path';

import { LinkButton } from '@/components/LinkButton';

import { LoginForm } from './components/LoginForm';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LogoText text="로그인" />
      <LoginForm />
      <LinkButton label="회원가입하기" linkTo={ROUTER_PATH.REGISTER} />
    </AuthLayout>
  );
};
