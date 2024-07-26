import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@components/common';

export interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Container justifyContent="center" alignItems="center">
      <Message>{message}</Message>
    </Container>
  );
}

const Message = styled.strong`
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
`;
