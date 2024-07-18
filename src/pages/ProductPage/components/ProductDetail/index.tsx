import { useProductDetail } from '@/api/hooks/useProductDetail';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Divider } from '@/components/ui/Divider';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { containerStyle, textContainerStyle } from './styles';

type ProductDetailProps = {
  productId: number;
};

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { productDetail, error } = useProductDetail(productId);

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  return (
    <Container gap="2rem" css={containerStyle}>
      <Image src={productDetail.imageURL} ratio="square" />
      <Container flexDirection="column" gap="2rem" css={textContainerStyle}>
        <Container flexDirection="column" gap="1rem">
          <Text size="xl">{productDetail.productName}</Text>
          <Text size="2xl">{productDetail.price}원</Text>
        </Container>
        <Divider />
        <Text size="sm" isBold>
          카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
        </Text>
        <Divider />
      </Container>
    </Container>
  );
};
