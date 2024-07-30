import { Box, Flex, Heading, Text, UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { WishList, WishListItem } from '@/types';
import { authSessionStorage, wishListSessionStorage } from '@/utils/storage';

import { WishItemContainer } from './WishItem';

export const WishListSection = () => {
  const [wishList, setWishList] = useState<WishList>([]);
  const auth = authSessionStorage.get();

  useEffect(() => {
    const wishListHistory = wishListSessionStorage.get() as WishList;
    setWishList(wishListHistory || []);
  }, []);

  const handleDelete = (id: number) => {
    const isConfirm = window.confirm('선택한 상품을 삭제하시겠습니까?');
    if (!isConfirm) return;
    const updatedList = wishList.filter((item) => item.id !== id);
    setWishList(updatedList);
    wishListSessionStorage.set(updatedList);
    alert('삭제가 완료되었습니다.');
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box mb={12}>
        <Heading as="h3" size="md" mb={4}>
          🎁{auth?.id}님의 위시리스트🎁
        </Heading>
        {wishList.length > 0 ? (
          <UnorderedList styleType="none" spacing={4}>
            {wishList.map((item: WishListItem) => (
              <WishItemContainer key={item.id} item={item} onDelete={handleDelete} />
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
