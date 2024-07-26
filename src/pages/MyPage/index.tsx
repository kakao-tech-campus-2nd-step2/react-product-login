import { Box, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { useRemoveWish, useWishList } from '@/api/hooks/useWishList';
import { WishList } from '@/components/features/WishList';

export const MyPage: React.FC = () => {
  const { data, isLoading, error } = useWishList();
  const removeWishMutation = useRemoveWish();

  const handleRemoveWish = (wishId: number) => {
    removeWishMutation.mutate(wishId);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text>에러가 발생했습니다: {error.message}</Text>;

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">마이 페이지</Heading>
        <Heading size="md">위시 리스트</Heading>
        {data && data.content.length > 0 ? (
          <WishList wishes={data.content} onRemove={handleRemoveWish} />
        ) : (
          <Text>위시리스트가 비어있습니다.</Text>
        )}
      </VStack>
    </Box>
  );
};
