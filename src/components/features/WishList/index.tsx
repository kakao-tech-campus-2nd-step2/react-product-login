import { Box, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Image } from '@/components/common/Image';
import type { WishList, WishListItem } from '@/types';
import { authSessionStorage, wishListSessionStorage } from '@/utils/storage';

export const WishListSection = () => {
  const [wishList, setWishList] = useState<WishList>([]);
  const auth = authSessionStorage.get();

  useEffect(() => {
    const wishListHistory = wishListSessionStorage.get() as WishList;
    setWishList(wishListHistory || []);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box mb={12}>
        <Heading as="h3" size="md" mb={4}>
          🎁{auth?.id}님의 위시리스트🎁
        </Heading>
        {wishList.length > 0 ? (
          <UnorderedList styleType="none" spacing={4}>
            {wishList.map((item: WishListItem) => (
              <ListItem key={item.id} p={4} shadow="md" borderWidth="2px" borderRadius="md">
                <Flex align="center">
                  <Image src={item.product.imageUrl} alt={item.product.name} width="100px" />
                  <Box ml={4}>
                    <Heading as="h3" size="sm">
                      {item.product.name}
                    </Heading>
                    <Text fontSize="lg" fontWeight="700">
                      {item.product.price.toLocaleString()} 원
                    </Text>
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Text fontSize="md" textAlign="center" color="red" fontWeight="700">
            😭위시리스트가 비어있습니다.😭
          </Text>
        )}
      </Box>
    </Flex>
  );
};
