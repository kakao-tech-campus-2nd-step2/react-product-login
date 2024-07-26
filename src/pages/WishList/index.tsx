import { Box, Heading,HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type WishItem = {
  id: number;
  product: Product;
};

type WishListResponse = {
  content: WishItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageable: any;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

type ApiError = {
  message: string;
};

const WishListPage = () => {
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('로그인이 필요합니다.');
          return;
        }

        const response = await fetch('/api/wishes', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.message || '위시리스트를 불러오는데 실패했습니다.');
        }

        const data: WishListResponse = await response.json();
        setWishList(data.content);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    fetchWishList();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>위시리스트</Heading>
      <VStack spacing={4} align="stretch">
        {wishList.map(item => (
          <HStack key={item.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
            <Image src={item.product.imageUrl} alt={item.product.name} boxSize="100px" />
            <VStack align="start">
              <Text fontSize="lg">{item.product.name}</Text>
              <Text color="gray.500">{item.product.price}원</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default WishListPage;
