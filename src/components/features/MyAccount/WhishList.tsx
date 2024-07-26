import { Box, Container, VStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import { getWishlist } from '@/api/utils';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Spacing } from '@/components/common/layouts/Spacing';

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}
export const Wishlist = () => {
  const page = 0;
  const size = 10;
  const { data: wishlist } = useSuspenseQuery({
    queryKey: ['wishlist', page, size],
    queryFn: () => getWishlist(page, size),
  });

  return (
    <Container maxW="container.md" py={8}>
      <Spacing height={4} />
      <VStack spacing={4}>
        {wishlist.content.map((item: WishlistItem) => (
          <Fragment key={item.id}>
            <Box
              borderRadius="md"
              border="1px"
              borderColor="gray.200"
              p={4}
              w="300px"
              bg="white"
              boxShadow="sm"
            >
              <DefaultGoodsItems
                imageSrc={item.product.imageUrl}
                subtitle={item.product.name}
                title={item.product.name}
                amount={item.product.price}
              />
              <Spacing height={4} />
            </Box>
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};
