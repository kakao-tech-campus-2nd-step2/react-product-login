import { Box, CloseButton, Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useDeleteWish } from '@/api/hooks/useDeleteWishList';
import { useGetWishList } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useGetWishList({});
  const deleteWish = useDeleteWish();
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleDelete = (wishId: number) => {
    deleteWish.mutate(wishId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading wishlist</div>;
  }

  return (
    <Wrapper>
      {authInfo?.email}님 안녕하세요! <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" ml={5}>
          관심 목록
        </Text>
        {data?.pages.map((page) =>
          page.products.map((item) => (
            <Flex key={item.id} p={4} borderWidth="1px" borderRadius="md" m={5}>
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                boxSize="100px"
                objectFit="cover"
              />
              <Box ml={4} flex="1" mr={8}>
                <Text fontSize={18} fontWeight="bold">
                  {item.product.name}
                </Text>
                <Text fontSize={15} color="gray.500">
                  {item.product.price}원
                </Text>
              </Box>
              <CloseButton size="md" colorScheme="red" onClick={() => handleDelete(item.id)} />
            </Flex>
          )),
        )}
        {hasNextPage && (
          <Box textAlign="center" ml={100} mr={100}>
            <Button size="small" theme="lightGray" onClick={() => fetchNextPage()}>
              더 보기
            </Button>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
