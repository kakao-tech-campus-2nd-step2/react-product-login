import { ReactNode } from 'react';

import { Container } from '@/components/ui/Layout/Container';

type OneTextContainerProps = {
  children: ReactNode;
  height?: string;
};

export const OneTextContainer = ({
  children,
  height = '10rem',
}: OneTextContainerProps) => {
  return (
    <Container alignItems="center" justifyContent="center" css={{ height }}>
      {children}
    </Container>
  );
};
