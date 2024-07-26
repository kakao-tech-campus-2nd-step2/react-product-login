import { Box, Button, HStack, Image, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchInstance } from '@/api/instance';
import { useAuth } from '@/provider/Auth';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export const MyAccount = () => {
  const authInfo = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (authInfo) {
        setLoading(true);
        try {
          const response = await fetchInstance.get(
            '/api/wishes?page=0&size=10&sort=createdDate,desc',
            {
              headers: {
                Authorization: `Bearer ${authInfo.token}`,
              },
            },
          );
          setWishlist(response.data.content);
        } catch (err) {
          console.error('Failed to fetch wishlist:', err);
          setError('Failed to fetch wishlist');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWishlist();
  }, [authInfo]);

  const handleRemoveFromWishlist = async (wishId: number) => {
    if (!authInfo) {
      console.error('User is not authenticated');
      return;
    }

    try {
      await fetchInstance.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
        },
      });
      setWishlist((prev) => prev.filter((item) => item.id !== wishId));
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      alert('관심 상품 삭제 실패');
    }
  };

  const maxWidth = useBreakpointValue({ base: '100%', sm: '600px' });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Wrapper>
      <Box mb={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          관심 상품 목록
        </Text>
      </Box>
      <VStack spacing={4} align="stretch" maxWidth={maxWidth} margin="0 auto">
        {wishlist.map((item) => (
          <HStack
            key={item.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            align="center"
            spacing={4}
            width="100%"
          >
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              boxSize="100px"
              objectFit="cover"
            />
            <Box flex="1">
              <Text fontSize="lg" fontWeight="bold">
                {item.product.name}
              </Text>
              <Text>{item.product.price}원</Text>
            </Box>
            <Button colorScheme="red" onClick={() => handleRemoveFromWishlist(item.id)}>
              삭제
            </Button>
          </HStack>
        ))}
      </VStack>
      <Box textAlign="center" mt={8}>
        <Button
          onClick={() => {
            authSessionStorage.set(undefined);
            window.location.reload();
          }}
          colorScheme="yellow"
          size="lg"
        >
          로그아웃
        </Button>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px;
  }
`;
