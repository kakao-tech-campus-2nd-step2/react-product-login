import { ReactNode } from 'react';
import Container from '@components/atoms/container/Container';

interface AuthFormContainerProps {
  children?: ReactNode;
}

function AuthFormContainer({ children }: AuthFormContainerProps) {
  return (
    <Container
      elementSize="full-width"
      justifyContent="center"
      padding="20px"
    >
      <Container
        cssProps={{
          border: '1px solid rgba(0, 0, 0, 0.12)',
        }}
        maxWidth="580px"
        elementSize="full-width"
      >
        <Container
          elementSize="full-width"
          flexDirection="column"
          padding="60px 52px"
        >
          {children}
        </Container>
      </Container>
    </Container>
  );
}

export default AuthFormContainer;
