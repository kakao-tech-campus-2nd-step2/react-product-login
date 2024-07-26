import { Box, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useRemoveWish, useWishList } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { WishList } from '@/components/features/WishList';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { data, isLoading, error } = useWishList();
  const removeWishMutation = useRemoveWish();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleRemoveWish = (wishId: number) => {
    removeWishMutation.mutate(wishId);
  };

  return (
    <Wrapper>
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          <Heading size="lg">{authInfo?.name}님 안녕하세요!</Heading>
          <Spacing height={64} />
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
          <Heading size="md">위시 리스트</Heading>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Text>에러가 발생했습니다: {(error as Error).message}</Text>
          ) : data && data.content.length > 0 ? (
            <WishList wishes={data.content} onRemove={handleRemoveWish} />
          ) : (
            <Text>위시리스트가 비어있습니다.</Text>
          )}
        </VStack>
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
