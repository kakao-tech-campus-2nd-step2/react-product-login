import { useLocation } from 'react-router-dom';

import { Divider, Text } from '@chakra-ui/react';

import { useProductDetail } from '@/api/hooks/useProductDetail';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout/Container';

import { CashCheckFields } from './CashCheckFields';
import { containerStyle } from './styles';

export const PaymentSection = () => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const { data: productDetail } = useProductDetail(productId);

  const totalPrice = productDetail.price * quantity;

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text fontSize="lg" as="b">
        결제 정보
      </Text>
      <Divider />
      <CashCheckFields />
      <Divider />
      <Container
        justifyContent="space-between"
        alignItems="center"
        css={{ padding: '0 1rem' }}
      >
        <Text as="b">최종 결제금액</Text>
        <Text fontSize="lg" as="b">
          {totalPrice} 원
        </Text>
      </Container>
      <Divider marginBottom="2rem" />
      <Button size="large" type="submit">
        {totalPrice} 결제하기
      </Button>
    </Container>
  );
};
