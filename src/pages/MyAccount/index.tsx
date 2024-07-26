import { Box, Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetWishList } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useGetWishList({});

  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading wishlist</div>;
  }

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
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
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          관심 목록
        </Text>
        {data?.pages.map((page) =>
          page.products.map((item) => (
            <Flex key={item.id} p={4} borderWidth="1px" borderRadius="md">
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                boxSize="100px"
                objectFit="cover"
              />
              <Box ml={4} flex="1">
                <Text fontSize={18} fontWeight="bold">
                  {item.product.name}
                </Text>
                <Text fontSize={15} color="gray.500">
                  {item.product.price}원
                </Text>
              </Box>
            </Flex>
          )),
        )}
        {hasNextPage && <Button onClick={() => fetchNextPage()}>더 보기</Button>}
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
