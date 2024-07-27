import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import type { WishContentData } from "@/api/hooks/useWish";
import { useGetWishList } from "@/api/hooks/useWish";
import { useAuth } from "@/provider/Auth";

export const WishList: React.FC = () => {
  const authInfo = useAuth();
  const token = authInfo?.token || "";

  const { data } = useGetWishList(0, 10, "createdDate,desc", token);

  const handleDelete = (id: number) => {
    console.log(`Delete wish with id: ${id}`);
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
