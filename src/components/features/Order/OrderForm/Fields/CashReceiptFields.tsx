import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

import { LabelText } from '../Common/LabelText';

export const CashReceiptFields = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { register, control } = useOrderFormContext();

  return (
    <Wrapper>
      <Controller
        control={control}
        name="hasCashReceipt"
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox ref={ref} onChange={(e) => {
              setIsChecked(e.target.checked);
              onChange(e);
            }}
            isChecked={value}
            colorScheme="yellow"
            size="lg"
            data-testid="cash-receipt-checkbox"
          >
            <LabelText>현금영수증 신청</LabelText>
          </Checkbox>
        )}
      />

      <Spacing />
      <Controller
        disabled={!isChecked}
        control={control}
        name="cashReceiptType"
        render={({ field }) => (
          <Select {...field}>
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
        )}
      />
      <Spacing height={8} />
      <Input disabled={!isChecked} {...register('cashReceiptNumber')} placeholder="(-없이) 숫자만 입력해주세요." />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;