import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import type { WishContentData } from "@/api/hooks/useWish";
import { useDeleteWish } from "@/api/hooks/useWish";
import { useGetWishList } from "@/api/hooks/useWish";
import { useAuth } from "@/provider/Auth";

export const WishList: React.FC = () => {
  const authInfo = useAuth();
  const token = authInfo?.token || "";

  const { data, refetch } = useGetWishList(0, 10, "createdDate,desc", token);
  const deleteWishMutation = useDeleteWish(token);

  const handleDelete = (id: number) => {
    deleteWishMutation.mutate(
      { productId: id },
      {
        onSuccess: () => {
          alert("위시리스트에서 상품이 삭제되었습니다.");
          refetch();
        },
        onError: () => {
          alert("오류가 발생했습니다.");
        },
      },
    );
  };

  return (
    <Box p={4}>
      {data?.content?.length ? (
        data.content.map((wish: WishContentData) => (
          <Flex
            key={wish.id}
            p={4}
            mb={4}
            borderWidth={1}
            borderRadius="lg"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              src={wish.product.imageUrl}
              alt={wish.product.name}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
              mr={4}
            />
            <Box flex="1" marginRight="10px">
              <Text fontSize="lg" fontWeight="bold">
                {wish.product.name}
              </Text>
              <Text fontSize="md" color="gray.500">
                {wish.product.price}원
              </Text>
            </Box>
            <Button colorScheme="gray" onClick={() => handleDelete(wish.id)}>
              삭제
            </Button>
          </Flex>
        ))
      ) : (
        <Text>No wishes found</Text>
      )}
    </Box>
  );
};
