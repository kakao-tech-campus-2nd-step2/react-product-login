import { useEffect, useState } from 'react';
import { FormErrorMessages } from '@constants/ErrorMessage';
import { OrderRequestBody } from '@/types/request';
import { OrderFormStatus } from '@/types';
import { isEmptyString, isNumericString } from '@/utils';

interface UseOrderFormValidationProps {
  orderData: OrderRequestBody;
}

const useOrderFormValidation = ({ orderData }: UseOrderFormValidationProps) => {
  const [cardMessageStatus, setCardMessageStatus] = useState<OrderFormStatus>({
    isDirty: false,
  });
  const [receiptNumberStatus, setReceiptNumberStatus] = useState<OrderFormStatus>({
    isDirty: false,
  });

  const validateCardMessage = () => {
    const cardMessage = orderData.messageCardTextMessage;

    if (isEmptyString(cardMessage)) {
      setCardMessageStatus({
        isDirty: true,
        errorMessage: FormErrorMessages.MESSAGE_CARD_EMPTY,
      });
    }
  };

  const validateReceiptNumber = () => {
    if (!orderData.hasCashReceipt) return;

    const receiptNumber = orderData.cashReceiptNumber;

    if (isEmptyString(receiptNumber)) {
      setCardMessageStatus({
        isDirty: true,
        errorMessage: FormErrorMessages.RECEIPT_NUMBER_REQUIRED,
      });
    }

    if (!isNumericString(receiptNumber)) {
      setReceiptNumberStatus({
        isDirty: true,
        errorMessage: FormErrorMessages.RECEIPT_NUMBER_NOT_NUMERIC,
      });
    }
  };

  const validateBeforeSubmit = () => {
    validateCardMessage();
    validateReceiptNumber();
  };

  useEffect(() => {
    if (cardMessageStatus.isDirty) validateCardMessage();

    if (receiptNumberStatus.isDirty) validateReceiptNumber();
  }, [orderData.hasCashReceipt, orderData.cashReceiptNumber, orderData.messageCardTextMessage]);

  return {
    cardMessageStatus,
    setCardMessageStatus,
    receiptNumberStatus,
    setReceiptNumberStatus,
    validateBeforeSubmit,
  };
};

export default useOrderFormValidation;
