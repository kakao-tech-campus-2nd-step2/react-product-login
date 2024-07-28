import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { CenteredContainer } from '@components/common';
import OrderMessage from '@components/features/Order/OrderMessage';
import GiftDetail from '@components/features/Order/GiftDetail';
import Payment from '@components/features/Order/Payment';
import { useForm, FormProvider } from 'react-hook-form';

export interface OrderDataFormValues {
  message: string;
  hasCashReceipt: boolean;
  cashReceiptType: string;
  cashReceiptNumber: string;
}

export default function Order() {
  const methods = useForm<OrderDataFormValues>({
    defaultValues: {
      message: '',
      hasCashReceipt: false,
      cashReceiptType: '개인소득공제',
      cashReceiptNumber: '',
    },
  });

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <FormProvider {...methods}>
            <OrderInfo>
              <OrderMessage />
              <GiftDetail />
            </OrderInfo>
            <Payment />
          </FormProvider>
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
  height: 100vh;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
