import { useForm } from 'react-hook-form';

import { Checkbox, Input, Select } from '@chakra-ui/react';
import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

import { FormField } from '@/components/ui/Form';
import { Container } from '@/components/ui/Layout/Container';

type CashCheckFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const CashCheckForm = ({ form }: CashCheckFormProps) => {
  return (
    <Container flexDirection="column" gap="1rem">
      <FormField
        control={form.control}
        name="isCashChecked"
        render={({ field }) => (
          <Checkbox size="lg" checked={field.value} onChange={field.onChange}>
            현금영수증 신청
          </Checkbox>
        )}
      />
      <Container flexDirection="column" gap="0.5rem">
        <FormField
          control={form.control}
          name="cashReceiptType"
          render={({ field }) => (
            <Select value={field.value} onChange={field.onChange}>
              <option value="개인소득공제">개인소득공제</option>
              <option value="사업자증빙용">사업자증빙용</option>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="cashReceiptNumber"
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="(-없이) 숫자만 입력해주세요."
            />
          )}
        />
      </Container>
    </Container>
  );
};
