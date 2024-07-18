import { ReactNode } from 'react';

import { Container, ContainerProps } from '@/components/ui/Layout/Container';

import { contentStyle } from './styles';

interface ContentProps extends ContainerProps {
  children: ReactNode;
  maxWidth?: string;
  backgroundColor?: string;
  height?: string;
  padding?: string;
}

export const Content = ({
  children,
  maxWidth = '1024px',
  backgroundColor = 'transparent',
  height = 'fit-content',
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding = '0',
  ...rest
}: ContentProps) => {
  return (
    <div css={contentStyle(backgroundColor, height)} {...rest}>
      <Container
        maxWidth={maxWidth}
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
        gap={gap}
        css={{ padding }}
      >
        {children}
      </Container>
    </div>
  );
};
