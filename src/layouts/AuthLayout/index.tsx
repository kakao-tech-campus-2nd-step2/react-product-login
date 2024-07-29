import { HTMLAttributes } from 'react';

import { Container } from '@/components/ui/Layout/Container';

interface AuthLayoutProp extends HTMLAttributes<HTMLDivElement> {}

const AuthLayout = ({ children, ...props }: AuthLayoutProp) => {
  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      css={{ height: '100vh' }}
      {...props}
    >
      {children}
    </Container>
  );
};

export default AuthLayout;
