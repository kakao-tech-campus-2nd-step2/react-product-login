import { Box, Button,Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { ApiError, WishItem, WishListResponse } from '@/types';

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
        } catch (fetchError) {
          if (fetchError instanceof Error) {
            setError(fetchError.message);
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        }
      };
  
      fetchWishList();
    }, []);
  
    const handleRemoveWish = async (id: number) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('로그인이 필요합니다.');
          return;
        }
  
        const response = await fetch(`/api/wishes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.message || '관심 목록에서 삭제하는데 실패했습니다.');
        }
  
        setWishList(prevWishList => prevWishList.filter(item => item.id !== id));
      } catch (deleteError) {
        if (deleteError instanceof Error) {
          setError(deleteError.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    };
  
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
              <Button colorScheme="red" onClick={() => handleRemoveWish(item.id)}>
                삭제
              </Button>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  };
  
  export default WishListPage;