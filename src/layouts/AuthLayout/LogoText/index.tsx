import { Text } from '@chakra-ui/react';

import loginLogo from '@/assets/login-logo.svg';

import { Logo } from '@/components/Logo';
import { Container } from '@/components/ui/Layout/Container';

export const LogoText = ({ text }: { text: string }) => {
  return (
    <Container justifyContent="center" alignItems="center" gap="1rem">
      <Logo src={loginLogo} alt="카카오 로그인 로고" width="86" />
      <Text fontSize="3xl">{text}</Text>
    </Container>
  );
};
