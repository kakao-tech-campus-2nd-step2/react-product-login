import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

import { LabelText } from '../Common/LabelText';

export const CashReceiptFields = () => {
  const { register, control, watch, setValue } = useOrderFormContext();
  const hasCashReceipt = watch('hasCashReceipt');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setValue('hasCashReceipt', checked);
  };

  return (
    <Wrapper>
      <Controller
        control={control}
        name="hasCashReceipt"
        render={({ field: { value, ref } }) => (
          <Checkbox
            data-testid="needcheck"
            ref={ref}
            onChange={handleCheckboxChange}
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
          <Select data-testid="receipttype" {...field} disabled={!hasCashReceipt}>
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
        )}
      />
      <Spacing height={8} />
      <Input
        disabled={!hasCashReceipt}
        data-testid="inputnumber"
        {...register('cashReceiptNumber')}
        placeholder="(-없이) 숫자만 입력해주세요."
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
