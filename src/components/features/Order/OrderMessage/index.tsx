import React from 'react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@chakra-ui/react';

const MAX_MESSAGE_LENGTH = 100;

export default function OrderMessage() {
  const { register } = useFormContext();

  return (
    <OrderMessageContainer>
      <Message>
        <Title>나에게 주는 선물</Title>
        <Textarea
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          {...register('message')}
          maxLength={MAX_MESSAGE_LENGTH}
        />
      </Message>
    </OrderMessageContainer>
  );
}

const OrderMessageContainer = styled.main`
  width: 850px;
  padding: 48px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const Message = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
`;
