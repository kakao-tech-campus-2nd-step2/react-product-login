import { useLocation } from 'react-router-dom';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { OrderFormType } from '@/types/orderType';

import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { CashCheckForm } from './CashCheckForm';
import { buttonStyle, containerStyle } from './styles';

type PaymentSectionProps = {
  formData: OrderFormType;
  handleCheckboxChange: (checkboxField: keyof OrderFormType) => void;
  handleInputChange: (inputField: keyof OrderFormType, value: string) => void;
};

export const PaymentSection = ({
  formData,
  handleCheckboxChange,
  handleInputChange,
}: PaymentSectionProps) => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const { productPrice } = useProductDetail(productId);
  const finalPrice = productPrice * quantity;

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text size="lg" isBold>
        결제 정보
      </Text>
      <Divider />
      <CashCheckForm
        formData={formData}
        handleCheckboxChange={handleCheckboxChange}
        handleInputChange={handleInputChange}
      />
      <Divider />
      <Container justifyContent="space-between" alignItems="center">
        <Text isBold>최종 결제금액</Text>
        <Text size="lg" isBold>
          {finalPrice} 원
        </Text>
      </Container>
      <Divider />
      <Button size="large" css={buttonStyle}>
        {finalPrice} 결제하기
      </Button>
    </Container>
  );
};
