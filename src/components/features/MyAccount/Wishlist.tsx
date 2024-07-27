import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import WishlistItem from './WishlistItem';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistItemProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface WishlistResponse {
  content: Array<{
    id: number;
    product: Product;
  }>;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export const Wishlist = () => {
  const [items, setItems] = useState<WishlistItemProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch('/api/wishes?page=0&size=10&sort=createdDate,desc', {
          headers: {
            Authorization: 'Bearer valid-token',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: WishlistResponse = await response.json();
        setItems(
          data.content.map((item) => ({
            id: item.id,
            name: item.product.name,
            imageUrl: item.product.imageUrl,
            price: item.product.price,
          })),
        );
      } catch (err) {
        setError('위시리스트를 불러오는데 실패했습니다.');
      }
    };

    fetchWishlistItems();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/wishes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer valid-token',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError('상품 삭제에 실패했습니다.');
    }
  };

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>위시리스트</Heading>
      <Divider mb={6} />
      <VStack spacing={4} align="stretch">
        {items.length === 0 ? (
          <>
            <div style={{ width: '800px' }}></div>
            <Text textAlign="center">위시리스트가 비어 있습니다.</Text>
          </>
        ) : (
          items.map((item) => (
            <WishlistItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onDelete={handleDelete}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};

export default Wishlist;
