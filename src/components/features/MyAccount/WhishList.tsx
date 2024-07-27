import { Box, Button, Container, VStack } from '@chakra-ui/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import { queryClient } from '@/api/instance';
import { deleteFromWishlist, getWishlist } from '@/api/utils';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Spacing } from '@/components/common/layouts/Spacing';

export interface WishlistItem {
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

  // NOTE: 타입 명시 가능
  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteFromWishlist,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['wishlist', page, size] });
    },
    onError: () => {
      alert('관심 물품 삭제에 실패했습니다.');
    },
  });

  const handleDelete = (productId: number) => async () => {
    // TODO: 알람까지 띄워야 하는지
    deleteMutation.mutateAsync(productId).then(() => alert('관심 물품 삭제에 성공했습니다.'));
  };

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
              <Button colorScheme="red" mt={4} onClick={handleDelete(item.product.id)}>
                삭제
              </Button>
              <Spacing height={4} />
            </Box>
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};
