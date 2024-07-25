import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import type { OrderFormData, OrderHistory } from '@/types';

import { HEADER_HEIGHT } from '../../Layout/Header';
import { GoodsInfo } from './GoodsInfo';
import { OrderFormMessageCard } from './MessageCard';
import { OrderFormOrderInfo } from './OrderInfo';

type Props = {
  orderHistory: OrderHistory;
};

export const OrderForm = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: id,
      productQuantity: count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      messageCardTextMessage: '',
    },
  });
  const { handleSubmit, control } = methods;
  const hasCashReceipt = useWatch({
    control,
    name: 'hasCashReceipt',
  });

  const handleForm = (values: OrderFormData) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      setError(errorMessage || null);
      return;
    }

    setError(null);
    alert('주문이 완료되었습니다.');
  };

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) {
      e.preventDefault();
    }
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(handleForm)} onKeyDown={preventEnterKeySubmission}>
        <SplitLayout sidebar={<OrderFormOrderInfo orderHistory={orderHistory} />}>
          <Wrapper>
            <OrderFormMessageCard />
            {error && <ErrorText>{error}</ErrorText>}
            <Spacing height={8} backgroundColor="#ededed" />
            <GoodsInfo orderHistory={orderHistory} />
            <div>
              <label htmlFor="cashReceiptType">현금영수증 종류</label>
              <select
                id="cashReceiptType"
                disabled={!hasCashReceipt}
                {...methods.register('cashReceiptType')}
                aria-label="현금영수증 종류"
              >
                <option value="PERSONAL">개인소득공제</option>
                <option value="BUSINESS">사업자증빙용</option>
              </select>
            </div>
            <div>
              <label htmlFor="cashReceiptNumber">현금영수증 번호</label>
              <input
                id="cashReceiptNumber"
                placeholder="(-없이) 숫자만 입력해주세요."
                disabled={!hasCashReceipt}
                {...methods.register('cashReceiptNumber')}
                aria-label="현금영수증 번호"
              />
            </div>
          </Wrapper>
        </SplitLayout>
      </form>
    </FormProvider>
  );
};

const validateOrderForm = (values: OrderFormData): { errorMessage?: string; isValid: boolean } => {
  if (values.hasCashReceipt) {
    if (!values.cashReceiptNumber) {
      return {
        errorMessage: '현금영수증 번호를 입력해주세요.',
        isValid: false,
      };
    }

    if (!/^\d+$/.test(values.cashReceiptNumber)) {
      return {
        errorMessage: '현금영수증 번호는 숫자로만 입력해주세요.',
        isValid: false,
      };
    }
  }

  if (!values.messageCardTextMessage || values.messageCardTextMessage.length < 1) {
    return {
      errorMessage: '메시지를 입력해주세요.',
      isValid: false,
    };
  }

  if (values.messageCardTextMessage.length > 100) {
    return {
      errorMessage: '메시지는 100자 이내로 입력해주세요.',
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
};

const Wrapper = styled.div`
  border-left: 1px solid #e5e5e5;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

const ErrorText = styled.div`
  color: red;
  margin: 10px 0;
`;
