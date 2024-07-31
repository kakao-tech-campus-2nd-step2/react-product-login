import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

import { LabelText } from '../Common/LabelText';

export const CashReceiptFields = () => {
  const { register, control } = useOrderFormContext();
  const [hasCashReceipt, setHasCashReceipt] = useState(false);

  return (
    <Wrapper>
      <Controller
        control={control}
        name="hasCashReceipt"
        render={({ field }) => (
          <Checkbox
            {...field}
            colorScheme="yellow"
            size="lg"
            value={field.value ? 'true' : 'false'}
            onChange={(e) => {
              field.onChange(e);
              setHasCashReceipt(e.target.checked);
            }}
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
          <Select {...field} isDisabled={!hasCashReceipt}>
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
