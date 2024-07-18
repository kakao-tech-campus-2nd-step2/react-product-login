import { useLocation } from 'react-router-dom';

import { useProductDetail } from '@/api/hooks/useProductDetail';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { cardStyle, containerStyle, subtitleStyle } from './styles';

export const GiftDetail = () => {
  const location = useLocation();
  const { productId } = location.state;
  const { orderProductDetail } = useProductDetail(productId);

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text isBold>선물내역</Text>
      <Card gap="0.5rem" css={cardStyle}>
        <Image
          src={orderProductDetail.imageURL}
          ratio="square"
          width="7rem"
          radius={0.2}
        />
        <Container flexDirection="column">
          <Text size="sm" css={subtitleStyle}>
            {orderProductDetail.brandName}
          </Text>
          <Text size="sm">{orderProductDetail.productName}</Text>
        </Container>
      </Card>
    </Container>
  );
};
