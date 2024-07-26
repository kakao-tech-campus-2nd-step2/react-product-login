import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Checkbox, Input, Select } from '@chakra-ui/react';

import { OrderForm } from '@/pages/OrderPage/hooks/useOrderForm';

import { FormField } from '@/components/ui/Form';
import { Container } from '@/components/ui/Layout/Container';

export const CashCheckFields = () => {
  const { control, watch, setValue } = useFormContext<OrderForm>();
  const cashCheck = watch('isCashChecked');

  useEffect(() => {
    if (!cashCheck) {
      setValue('cashReceiptType', undefined);
      setValue('cashReceiptNumber', '');
    }
  }, [cashCheck, setValue]);

  return (
    <Container flexDirection="column" gap="1rem">
      <FormField
        control={control}
        name="isCashChecked"
        render={({ field }) => (
          <Checkbox
            size="lg"
            checked={field.value}
            onChange={field.onChange}
            data-testid="cash-checked-field"
          >
            현금영수증 신청
          </Checkbox>
        )}
      />
      <Container flexDirection="column" gap="0.5rem">
        <FormField
          control={control}
          name="cashReceiptType"
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              disabled={!cashCheck}
            >
              <option value="개인소득공제">개인소득공제</option>
              <option value="사업자증빙용">사업자증빙용</option>
            </Select>
          )}
        />
        <FormField
          control={control}
          name="cashReceiptNumber"
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              disabled={!cashCheck}
              placeholder="(-없이) 숫자만 입력해주세요."
              data-testid="cash-number-field"
            />
          )}
        />
      </Container>
    </Container>
  );
};
