import { FormEvent, useState } from 'react';

import { OrderFormType } from '@/types/orderType';

export const useOrderForm = () => {
  const [formData, setFormData] = useState<OrderFormType>({
    productId: 1,
    productQuantity: 1,
    gitfMessage: '',
    isCashChecked: false,
    cashReceiptType: '개인소득공제',
    cashReceiptNumber: '',
  });

  const handleCheckboxChange = (checkboxField: keyof OrderFormType) => {
    setFormData((prevData) => ({
      ...prevData,
      [checkboxField]: !prevData[checkboxField],
    }));
  };

  const handleInputChange = (
    inputField: keyof OrderFormType,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputField]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('주문이 완료되었습니다.');
  };

  return { formData, handleCheckboxChange, handleInputChange, handleSubmit };
};
