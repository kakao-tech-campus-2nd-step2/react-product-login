import { Divider, Text } from '@chakra-ui/react';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { ProductDetailRequestParams } from '@/api/services/productDetail';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

import { containerStyle } from './styles';

type ProductDetailProps = ProductDetailRequestParams;

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { data: productDetail, error } = useProductDetail({ productId });

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  return (
    <Container gap="2rem" css={containerStyle}>
      <Image src={productDetail.imageUrl} ratio="square" />
      <Container flexDirection="column" gap="2rem" css={{ paddingTop: '1rem' }}>
        <Container flexDirection="column" gap="1rem">
          <Text fontSize="2xl" data-testid="product-detail-name">
            {productDetail.name}
          </Text>
          <Text fontSize="3xl" data-testid="product-detail-price">
            {productDetail.price}원
          </Text>
        </Container>
        <Divider />
        <Text fontSize="sm" as="b">
          카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
        </Text>
        <Divider />
      </Container>
    </Container>
  );
};
