import { useLocation } from 'react-router-dom';

import { Heading, Text } from '@chakra-ui/react';

import { useProductDetail } from '@/api/hooks/useProductDetail';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

export const GiftInfo = () => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const { data: productDetail } = useProductDetail(productId);

  return (
    <Container flexDirection="column" gap="1rem" css={{ padding: '1rem' }}>
      <Heading size="sm">선물내역</Heading>
      <Card gap="0.5rem" css={{ padding: '1rem' }}>
        <Image
          src={productDetail.imageUrl}
          ratio="square"
          width="6rem"
          radius={0.2}
        />
        <Text>
          {productDetail.name} x {quantity}개
        </Text>
      </Card>
    </Container>
  );
};
