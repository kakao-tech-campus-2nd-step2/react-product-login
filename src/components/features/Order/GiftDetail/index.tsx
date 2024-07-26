import React from 'react';
import styled from '@emotion/styled';
import Gift from './Gift';

export default function GiftDetail() {
  return (
    <section>
      <Title>선물내역</Title>
      <Gift />
    </section>
  );
}

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;
