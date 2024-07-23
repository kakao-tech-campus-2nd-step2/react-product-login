import React, { ReactNode } from 'react';
import type * as CSS from 'csstype';
import styled from '@emotion/styled';

export interface ContainerProps extends CSS.Properties {
  children: ReactNode;
}

export default function Container({ maxWidth, children, flexDirection, justifyContent, alignItems }: ContainerProps) {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </StyledContainer>
  );
}

const StyledContainer = styled.div<ContainerProps>`
  display: flex;
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  margin: 0 auto;
`;
