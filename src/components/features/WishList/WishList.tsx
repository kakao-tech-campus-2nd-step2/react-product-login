import { Button,HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { useDeleteWish } from '@/api/hooks/useDeleteWish';
import type { WishListItem } from '@/api/hooks/useGetWishList';
import { useGetWishList } from '@/api/hooks/useGetWishList';

export const WishList = () => {
  const [page, setPage] = React.useState(0);
  const { data, isLoading, isError, error } = useGetWishList(page, 10);
  const { mutate: deleteWish } = useDeleteWish();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text color="red.500">관심 목록을 불러오는 데 실패했습니다: {error.message}</Text>;
  }

  const handleDelete = (wishId: number) => {
    deleteWish(wishId);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <VStack spacing={4} width="100%" maxWidth="600px">
      <Text fontSize="2xl" fontWeight="bold">
        관심 목록
      </Text>
      {data?.content.map((item: WishListItem) => (
        <HStack key={item.id} spacing={4} p={4} borderWidth="1px" borderRadius="md" width="100%">
          <Image src={item.product.imageUrl} alt={item.product.name} boxSize="80px" />
          <VStack align="start">
            <Text fontWeight="bold">{item.product.name}</Text>
            <Text>{item.product.price}원</Text>
          </VStack>
          <Button colorScheme="red" onClick={() => handleDelete(item.id)}>
            삭제
          </Button>
        </HStack>
      ))}
      <HStack>
        <Button onClick={handlePrevPage} isDisabled={page === 0}>
          이전
        </Button>
        <Button onClick={handleNextPage} isDisabled={data?.last}>
          다음
        </Button>
      </HStack>
    </VStack>
  );
};
