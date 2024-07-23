import React from 'react';
import styled from '@emotion/styled';
import ReceiptForm from './ReceiptForm';

export default function Payment() {
  return (
    <PaymentContainer>
      <Title>결제정보</Title>
      <ReceiptForm />
    </PaymentContainer>
  );
}

const PaymentContainer = styled.aside`
  width: 360px;
`;

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;
