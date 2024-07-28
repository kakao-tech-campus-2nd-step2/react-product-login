import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
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
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');

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
        <Box
          key={wish.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg={cardBg}
          borderColor={cardBorder}
          shadow="md"
          _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
        >
          <Image src={wish.product.imageUrl} alt={wish.product.name} />
          <VStack p={4} align="start" spacing={2}>
            <Text fontWeight="bold" fontSize="lg">
              {wish.product.name}
            </Text>
            <Text fontSize="md" color="gray.500">
              {wish.product.price.toLocaleString()}원
            </Text>
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={() => handleRemove(wish.id)}
            >
              삭제
            </Button>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
