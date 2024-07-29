import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useRemoveWish, useWishList } from '@/api/hooks/fetchWishList';
import { useAuth } from '@/provider/Auth';

const FavoritesPage = () => {
  const authInfo = useAuth();
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useWishList(page);
  const removeWish = useRemoveWish();
  const [wishList, setWishList] = useState(data?.content || []);

  useEffect(() => {
    if (data) {
      setWishList(data.content);
    }
  }, [data]);

  const handleRemoveFavorite = (id: number) => {
    removeWish.mutate(id, {
      onSuccess: () => {
        setWishList((prevList) => prevList.filter((item) => item.id !== id));
      },
    });
  };

  const handleNextPage = () => {
    if (data && page < data.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (!authInfo) {
    return <Text>로그인이 필요합니다.</Text>;
  }

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <Text>오류가 발생했습니다.</Text>;
  } else {
    content = (
      <>
        <List spacing={3}>
          {wishList.map((item) => (
            <ListItem key={item.id} p={4} borderWidth="1px" borderRadius="lg">
              <Flex align="center">
                <Image boxSize="100px" src={item.product.imageUrl} alt={item.product.name} mr={4} />
                <Box flex="1">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.product.name}
                  </Text>
                  <Text>{item.product.price}원</Text>
                </Box>
                <IconButton
                  icon={<CloseIcon />}
                  aria-label="Remove from favorites"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => handleRemoveFavorite(item.id)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
        <Flex justify="space-between" mt={4}>
          <Button onClick={handlePreviousPage} disabled={page === 0}>
            이전
          </Button>
          <Button onClick={handleNextPage} disabled={data && page >= data.totalPages - 1}>
            다음
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        관심 목록
      </Text>
      {content}
    </Box>
  );
};

export default FavoritesPage;
