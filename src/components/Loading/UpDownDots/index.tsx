import { Container } from '@/components/ui/Layout/Container';

import { containerStyle, dotStyle } from './styles';

type DotProps = {
  delay: number;
};

const Dot = ({ delay }: DotProps) => {
  return <span css={dotStyle(delay)} />;
};

export const UpDownDots = () => {
  return (
    <Container alignItems="center" justifyContent="center" css={containerStyle}>
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
    </Container>
  );
};
