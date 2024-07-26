import loginLogo from '@/assets/login-logo.svg';
import AuthLayout from '@/layouts/AuthLayout';

import { Logo } from '@/components/Logo';

import { LoginForm } from './components/LoginForm';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <Logo src={loginLogo} alt="카카오 로그인 로고" width="86" />
      <LoginForm />
    </AuthLayout>
  );
};
