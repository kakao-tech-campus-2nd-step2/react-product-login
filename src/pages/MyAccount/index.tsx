import { Box, Button as ChakraButton, Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import type { Wish } from '@/api/hooks/wishes';
import { getWishes, removeWish } from '@/api/hooks/wishes';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishes, setWishes] = useState<Wish[]>([]);

  const fetchWishes = async () => {
    try {
      const data = await getWishes();
      setWishes(data.content);
    } catch (error) {
      console.error('Failed to fetch wishes', error);
    }
  };

  const handleRemoveWish = async (wishId: number) => {
    try {
      await removeWish(wishId);
      setWishes((prevWishes) => prevWishes.filter((wish) => wish.id !== wishId));
    } catch (error) {
      console.error('Failed to remove wish', error);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Text fontSize="2xl" fontWeight="bold">
        {authInfo?.name}님 안녕하세요!
      </Text>
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
      <Spacing height={32} />
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
        {wishes.map((wish) => (
          <GridItem key={wish.id}>
            <Box
              p={4}
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <Image
                src={wish.product.imageUrl}
                alt={wish.product.name}
                borderRadius={8}
                boxSize="150px"
                objectFit="cover"
              />
              <Stack spacing={3} mt={4} textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  {wish.product.name}
                </Text>
                <Text>{wish.product.price.toLocaleString()}원</Text>
              </Stack>
              <ChakraButton
                colorScheme="red"
                onClick={() => handleRemoveWish(wish.id)}
                mt={4}
                width="full"
              >
                관심 삭제
              </ChakraButton>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 20px 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
