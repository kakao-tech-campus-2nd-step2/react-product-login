import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';

import { LabelText } from '../Common/LabelText';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

export const CashReceiptFields = () => {
  const { register, control, watch } = useOrderFormContext();
  const hasCashReceipt = watch('hasCashReceipt');

  return (
    <Wrapper>
      <Controller
        control={control}
        name="hasCashReceipt"
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox
            aria-label="현금영수증 신청"
            ref={ref}
            onChange={onChange}
            isChecked={value}
            colorScheme="yellow"
            size="lg"
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
          <Select {...field} disabled={!hasCashReceipt}>
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
        )}
      />
      <Spacing height={8} />
      <Input {...register('cashReceiptNumber')} disabled={!hasCashReceipt} placeholder="(-없이) 숫자만 입력해주세요." />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
