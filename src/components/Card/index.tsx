import { Container, ContainerProps } from '@/components/ui/Layout/Container';

import { cardStyle } from './styles';

interface CardProps extends ContainerProps {
  //   variant?: 'outline';
}

export const Card = ({
  //   variant = 'outline',
  children,
  ...props
}: CardProps) => {
  return (
    <Container css={cardStyle} {...props}>
      {children}
    </Container>
  );
};
