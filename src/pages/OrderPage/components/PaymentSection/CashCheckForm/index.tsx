import { OrderFormType } from '@/types/orderType';

import { Checkbox } from '@/components/ui/Input/Checkbox';
import { Input } from '@/components/ui/Input/Default';
import { Container } from '@/components/ui/Layout/Container';
import { Select } from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';

type CashCheckFormProps = {
  formData: OrderFormType;
  handleCheckboxChange: (checkboxField: keyof OrderFormType) => void;
  handleInputChange: (inputField: keyof OrderFormType, value: string) => void;
};

export const CashCheckForm = ({
  formData,
  handleCheckboxChange,
  handleInputChange,
}: CashCheckFormProps) => {
  return (
    <Container flexDirection="column" gap="1rem">
      <Checkbox
        id="cashCheck"
        checked={formData.isCashChecked}
        onChange={() => handleCheckboxChange('isCashChecked')}
      />
      <label htmlFor="cashCheck">
        <Text isBold>현금영수증 신청</Text>
      </label>
      <Container flexDirection="column" gap="0.5rem">
        <Select
          value={formData.cashReceiptType}
          onChange={(e) => handleInputChange('cashReceiptType', e.target.value)}
        >
          <option value="개인소득공제">개인소득공제</option>
          <option value="사업자증빙용">사업자증빙용</option>
        </Select>
        <Input
          type="text"
          placeholder="(-없이) 숫자만 입력해주세요."
          value={formData.cashReceiptNumber}
          onChange={(e) =>
            handleInputChange('cashReceiptNumber', e.target.value)
          }
        />
      </Container>
    </Container>
  );
};
