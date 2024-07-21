import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { Divider, Text } from '@chakra-ui/react';
import { z } from 'zod';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { OrderSchema } from '@/schema/index';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout/Container';

import { CashCheckForm } from './CashCheckForm';
import { containerStyle } from './styles';

type PaymentSectionProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const PaymentSection = ({ form }: PaymentSectionProps) => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const { productPrice } = useProductDetail(productId);

  const finalPrice = productPrice * quantity;

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text fontSize="lg" as="b">
        결제 정보
      </Text>
      <Divider />
      <CashCheckForm form={form} />
      <Divider />
      <Container
        justifyContent="space-between"
        alignItems="center"
        css={{ padding: '0 1rem' }}
      >
        <Text as="b">최종 결제금액</Text>
        <Text fontSize="lg" as="b">
          {finalPrice} 원
        </Text>
      </Container>
      <Divider marginBottom="2rem" />
      <Button size="large" type="submit">
        {finalPrice} 결제하기
      </Button>
    </Container>
  );
};
