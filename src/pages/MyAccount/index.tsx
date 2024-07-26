import { Box, Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useDeleteWishlistItem } from '@/api/hooks/useDeleteWishlistItem';
import { useGetWishlist } from '@/api/hooks/useGetWishlist';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const { data, refetch } = useGetWishlist();
  const deleteWishlistItem = useDeleteWishlistItem();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = (id: number) => {
    deleteWishlistItem.mutate(id, {
      onSuccess: () => {
        alert('관심 목록에서 삭제되었습니다.');
        refetch();
      },
      onError: () => {
        alert('관심 목록에서 삭제하는 중 오류가 발생했습니다.');
      },
    });
  };

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
        <Text fontSize="2xl" fontWeight="bold">
          위시리스트
        </Text>
        {data?.content.map((item) => (
          <Flex
            key={item.id}
            p={4}
            w="700px"
            borderWidth={1}
            borderRadius="md"
            alignItems="center"
            mt={7}
          >
            <Image boxSize="100px" src={item.product.imageUrl} alt={item.product.name} />
            <Box ml={4} mr={4}>
              <Text fontSize="xl">{item.product.name}</Text>
              <Text fontSize="xl" as="b">
                {item.product.price}원
              </Text>
            </Box>
            <Box ml="auto" onClick={() => handleDelete(item.id)}>
              ❤️
            </Box>
          </Flex>
        ))}
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
