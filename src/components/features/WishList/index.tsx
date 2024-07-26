import { Box, Button, HStack, Image, SimpleGrid, Text, useToast, VStack } from '@chakra-ui/react';
import React from 'react';

interface WishItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface WishListProps {
  wishes: WishItem[];
  onRemove: (wishId: number) => void;
}

export const WishList: React.FC<WishListProps> = ({ wishes, onRemove }) => {
  const toast = useToast();

  const handleRemove = (wishId: number) => {
    onRemove(wishId);
    toast({
      title: '상품이 위시리스트에서 제거되었습니다.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
      {wishes.map((wish) => (
        <Box key={wish.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={wish.product.imageUrl} alt={wish.product.name} />
          <VStack p={4} align="start">
            <Text fontWeight="bold">{wish.product.name}</Text>
            <Text>{wish.product.price.toLocaleString()}원</Text>
            <Button colorScheme="red" onClick={() => handleRemove(wish.id)}>
              삭제
            </Button>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
