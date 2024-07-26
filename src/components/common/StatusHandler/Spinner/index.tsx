import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@components/common';

export default function Spinner() {
  return (
    <SpinnerContainer>
      <Container justifyContent="center" alignItems="center">
        <StyledSpinner />
      </Container>
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  padding: 48px 0 48px 0;
`;

const StyledSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #22a6b3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
