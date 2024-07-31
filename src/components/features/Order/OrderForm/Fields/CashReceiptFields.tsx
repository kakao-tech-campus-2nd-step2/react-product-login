import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, useWatch } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

export const CashReceiptFields = () => {
  const { register, control } = useOrderFormContext();
  const hasCashReceipt = useWatch({
    control,
    name: 'hasCashReceipt',
    defaultValue: false,
  });

  return (
    <Wrapper>
      <Controller
        control={control}
        name="hasCashReceipt"
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox ref={ref} onChange={onChange} isChecked={value} colorScheme="yellow" size="lg">
            <span>현금영수증 신청</span>
          </Checkbox>
        )}
      />

      <Spacing />
      <Controller
        control={control}
        name="cashReceiptType"
        render={({ field }) => (
          <Select {...field} aria-label="현금영수증 종류" isDisabled={!hasCashReceipt}>
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
        )}
      />
      <Spacing height={8} />
      <Input {...register('cashReceiptNumber')} placeholder="(-없이) 숫자만 입력해주세요." isDisabled={!hasCashReceipt} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
