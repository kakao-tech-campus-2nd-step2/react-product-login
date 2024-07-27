import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

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

  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: id,
      productQuantity: count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
    },
  });
  const { handleSubmit, watch } = methods;

  const handleForm = (values: OrderFormData) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    console.log('values', values);
    alert('주문이 완료되었습니다.');
  };

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) {
      e.preventDefault();
    }
  };

  const hasCashReceipt = watch('hasCashReceipt');

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(handleForm)} onKeyDown={preventEnterKeySubmission}>
        <SplitLayout sidebar={<OrderFormOrderInfo orderHistory={orderHistory} />}>
          <Wrapper>
            <OrderFormMessageCard />
            <Spacing height={8} backgroundColor="#ededed" />
            <GoodsInfo orderHistory={orderHistory} />
            <label className="chakra-checkbox" data-testid="cash-receipt-checkbox">
              <input
                className="chakra-checkbox__input"
                name="hasCashReceipt"
                type="checkbox"
                {...methods.register('hasCashReceipt')}
              />
              <span aria-hidden="true" className="chakra-checkbox__control" />
              <span className="chakra-checkbox__label">현금영수증 신청</span>
            </label>
            <div className="chakra-select__wrapper">
              <select
                className="chakra-select"
                data-testid="cash-receipt-type"
                disabled={!hasCashReceipt}
                {...methods.register('cashReceiptType')}
              >
                <option value="PERSONAL">개인소득공제</option>
                <option value="BUSINESS">사업자증빙용</option>
              </select>
              <div className="chakra-select__icon-wrapper" data-disabled="">
                <svg
                  aria-hidden="true"
                  className="chakra-select__icon"
                  focusable="false"
                  role="presentation"
                  style={{ width: '1em', height: '1em', color: 'currentColor' }}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <input
              className="chakra-input"
              data-testid="cash-receipt-number"
              disabled={!hasCashReceipt}
              placeholder="(-없이) 숫자만 입력해주세요."
              {...methods.register('cashReceiptNumber')}
            />
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

  if (values.messageCardTextMessage.length < 1) {
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
