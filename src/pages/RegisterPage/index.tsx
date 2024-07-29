import AuthLayout from '@/layouts/AuthLayout';
import { LogoText } from '@/layouts/AuthLayout/LogoText';
import { ROUTER_PATH } from '@/routes/path';

import { LinkButton } from '@/components/LinkButton';

import { RegisterForm } from './components/RegisterForm';

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <LogoText text="회원가입" />
      <RegisterForm />
      <LinkButton label="로그인하기" linkTo={ROUTER_PATH.LOGIN} />
    </AuthLayout>
  );
};
