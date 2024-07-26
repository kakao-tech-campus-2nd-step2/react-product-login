import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistItem {
  id: number;
  product: Product;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wishes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setWishlist(response.data.content);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (wishId: number) => {
    try {
      await axios.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWishlist(wishlist.filter(item => item.id !== wishId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {wishlist.map(item => (
        <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={item.product.imageUrl} alt={item.product.name} />
          <Box p="6">
            <Text fontWeight="bold" fontSize="xl">{item.product.name}</Text>
            <Text>{item.product.price}원</Text>
            <Button colorScheme="red" onClick={() => handleRemoveFromWishlist(item.id)}>삭제</Button>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default Wishlist;
