import {
  useEffect, useRef, useState,
} from 'react';
import { FormErrorMessages } from '@constants/ErrorMessage';
import { OrderRequestBody } from '@/types/request';
import { OrderFormErrorStatus } from '@/types';
import { isEmptyString, isNumericString } from '@/utils';

interface UseOrderFormValidationProps {
  orderData: OrderRequestBody;
}

const useOrderFormValidation = ({ orderData }: UseOrderFormValidationProps) => {
  const validationBoundaryCount = useRef(2);
  const [errorStatus, setErrorStatus] = useState<OrderFormErrorStatus>({
    hasCardMessageError: false,
    cardMessageErrorCaption: FormErrorMessages.MESSAGE_CARD_EMPTY,
    hasReceiptError: false,
    receiptErrorCaption: FormErrorMessages.RECEIPT_NUMBER_NOT_NUMERIC,
    isMessageModified: false,
    isReceiptNumberModified: false,
  });

  const validateForm = () => {
    const errors = { ...errorStatus };

    if (isEmptyString(orderData.messageCardTextMessage)) {
      errors.hasCardMessageError = true;
      errors.cardMessageErrorCaption = FormErrorMessages.MESSAGE_CARD_EMPTY;
    } else {
      errors.hasCardMessageError = false;
      errors.cardMessageErrorCaption = '';
    }

    if (orderData.hasCashReceipt && !isNumericString(orderData.cashReceiptNumber as string)) {
      errors.hasReceiptError = true;
      errors.receiptErrorCaption = FormErrorMessages.RECEIPT_NUMBER_NOT_NUMERIC;
    } else {
      errors.hasReceiptError = false;
      errors.receiptErrorCaption = '';
    }

    setErrorStatus(errors);
  };
  useEffect(() => {
    if (validationBoundaryCount.current) {
      validationBoundaryCount.current -= 1;

      return;
    }

    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);

  return { errorStatus, validateForm };
};

export default useOrderFormValidation;
