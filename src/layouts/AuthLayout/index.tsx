import { HTMLAttributes } from 'react';

import { Container } from '@/components/ui/Layout/Container';

import { containerStyle } from './styles';

interface AuthLayoutProp extends HTMLAttributes<HTMLDivElement> {}

const AuthLayout = ({ children, ...props }: AuthLayoutProp) => {
  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      css={containerStyle}
      {...props}
    >
      {children}
    </Container>
  );
};

export default AuthLayout;
