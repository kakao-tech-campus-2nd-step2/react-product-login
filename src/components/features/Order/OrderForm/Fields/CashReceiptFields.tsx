import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

import { LabelText } from '../Common/LabelText';

export const CashReceiptFields = () => {
  const { register, control, watch } = useOrderFormContext();
  const hasCashReceipt = watch('hasCashReceipt', false); // hasCashReceipt 값을 가져옵니다.

  return (
    <Wrapper>
      <Controller
        control={control}
        name="hasCashReceipt"
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox
            ref={ref}
            onChange={() => {
              onChange(!value);
            }}
            isChecked={value}
            data-testid="cashReceiptCheckbox"
            colorScheme="yellow"
            size="lg"
            type="checkbox"
            aria-checked={value}
          >
            <LabelText>현금영수증 신청</LabelText>
          </Checkbox>
        )}
      />

      <Spacing />
      <Controller
        control={control}
        name="cashReceiptType"
        render={({ field }) => (
          <Select {...field} isDisabled={!hasCashReceipt} data-testid="cashReceiptType">
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
        )}
      />
      <Spacing height={8} />
      <Input
        {...register('cashReceiptNumber')}
        isDisabled={!hasCashReceipt}
        placeholder="(-없이) 숫자만 입력해주세요."
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
