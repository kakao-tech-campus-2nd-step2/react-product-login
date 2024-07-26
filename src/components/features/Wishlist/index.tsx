import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from "react";

import { useAuth } from "@/provider/Auth";

type WishlistItem = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export const Wishlist = () => {
  const authInfo = useAuth();
  const [wishlist, setWishList] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (authInfo?.token) {
        try {
          const response = await fetch('/api/wishes', {
            headers: {
              'Authorization': `Bearer ${authInfo.token}`
            }
          });
          const wishData = await response.json();
          setWishList(wishData.content);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [authInfo]);

  return (
    <Box w="100%" display="flex" justifyContent="center">
      <Box p={4} maxW="1024px" w="100%">
        <Heading as="h2" fontSize="25px" mb={4}>
          관심 목록
        </Heading>
        {wishlist.length === 0 ? (
          <Text>관심 상품이 없습니다.</Text>
        ) : (
          <List spacing={3}>
            {wishlist.map((item) => (
              <ListItem key={item.id} p={2} borderWidth={1} borderRadius="md">
                <Box display="flex" alignItems="center" gap="30px">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                  <Box display="flex" flexDirection="column" gap="10px">
                    <Text fontSize="20px" fontWeight={600}>{item.product.name}</Text>
                    <Text fontSize="18px">{item.product.price}원</Text>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};