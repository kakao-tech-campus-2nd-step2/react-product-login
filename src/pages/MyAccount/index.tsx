import { Box, Button, Image, Stack, Text, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

interface Wish {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const toast = useToast();

  const fetchWishes = useCallback(async () => {
    const response = await fetch('/api/wishes', {
      headers: {
        Authorization: `Bearer ${authInfo?.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setWishes(data.content);
    } else {
      toast({ title: "Error fetching wishes", description: data.error, status: "error" });
    }
  }, [authInfo?.token, toast]);

  useEffect(() => {
    if (authInfo?.token) {
      fetchWishes();
    }
  }, [authInfo?.token, fetchWishes]);

  const handleRemoveWish = async (wishId: number) => {
    const response = await fetch(`/api/wishes/${wishId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authInfo?.token}`,
      },
    });
    if (response.ok) {
      setWishes(wishes.filter(wish => wish.id !== wishId));
      toast({ title: "Wish removed", status: "success" });
    } else {
      toast({ title: "Error removing wish", status: "error" });
    }
  };

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Text fontSize="2xl">{authInfo?.id}님, 안녕하세요!</Text>
      <Box height="64px" />
      <Button
        size="sm"
        variant="outline"
        colorScheme="gray"
        onClick={handleLogout}
        style={{ maxWidth: '200px' }}
      >
        로그아웃
      </Button>
      <Box height="64px" />
      <Stack spacing={4} mt={4}>
        {wishes.map(wish => (
          <Box key={wish.id} p={5} shadow='md' borderWidth='1px'>
            <Text fontWeight='bold'>{wish.product.name}</Text>
            <Image src={wish.product.imageUrl} alt={wish.product.name} />
            <Text>{wish.product.price} 원</Text>
            <Button onClick={() => handleRemoveWish(wish.id)}>삭제</Button>
          </Box>
        ))}
      </Stack>
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
