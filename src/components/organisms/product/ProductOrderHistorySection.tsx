import Container from '@components/atoms/container/Container';
import { Box, Text } from '@chakra-ui/react';
import { defaultBorderColor, textColors } from '@styles/colors';
import Image from '@components/atoms/image/Image';
import { ProductDetailData } from '@/dto';

interface ProductOrderHistorySectionProps {
  productDetails: ProductDetailData;
  count: number;
}

function ProductOrderHistorySection({ productDetails, count }: ProductOrderHistorySectionProps) {
  return (
    <Container elementSize="full-width" flexDirection="column" padding="16px">
      <Text>선물내역</Text>
      <Box
        width="100%"
        padding="20px 16px 16px"
        border={`1px solid ${defaultBorderColor}`}
        marginTop="16px"
        display="flex"
      >
        <Container elementSize={{ width: '86px', height: 'auto' }}>
          <Image
            ratio="square"
            src={productDetails.imageURL}
            style={{
              borderRadius: '3px',
            }}
          />
        </Container>
        <Container flexDirection="column" cssProps={{ flexGrow: 1 }} padding="0 8px">
          <Text color={textColors.subtitle}>{productDetails.brandInfo.name}</Text>
          <Text>{`${productDetails.name} X ${count}개`}</Text>
        </Container>
      </Box>
    </Container>
  );
}

export default ProductOrderHistorySection;
