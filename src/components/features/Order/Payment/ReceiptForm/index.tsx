import React from 'react';
import styled from '@emotion/styled';
import { Checkbox, Select, Input } from '@chakra-ui/react';
import { Button } from '@components/common';
import { useFormContext } from 'react-hook-form';
import { OrderDataFormValues } from '@/pages/Order';
import { validatePayment } from './validation';

export default function ReceiptForm() {
  const { register, watch, handleSubmit } = useFormContext<OrderDataFormValues>();
  const { hasCashReceipt } = watch();

  const onSubmit = (data: OrderDataFormValues) => {
    const errorMessage = validatePayment(data.message, data.hasCashReceipt, data.cashReceiptNumber);
    if (errorMessage) return alert(errorMessage);
    return alert('주문이 완료되었습니다.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox mb={4} fontWeight={700} {...register('hasCashReceipt')}>
        현금영수증 신청
      </Checkbox>
      {hasCashReceipt && (
        <>
          <Select mb={2} {...register('cashReceiptType')}>
            <option value="개인소득공제">개인소득공제</option>
            <option value="사업자증빙용">사업자증빙용</option>
          </Select>
          <Input placeholder="(-없이) 숫자만 입력해주세요." mb={4} {...register('cashReceiptNumber')} />
        </>
      )}
      <TotalAmount>
        <dl>
          <dt>최종 결제금액</dt>
          <dd>49900원</dd>
        </dl>
      </TotalAmount>
      <Button theme="kakao" type="submit">
        49900원 결제하기
      </Button>
    </form>
  );
}

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
  }
`;
