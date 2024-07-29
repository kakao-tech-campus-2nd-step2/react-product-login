import { Grid } from '@chakra-ui/react';
import { GridItem } from '@chakra-ui/react';
import { Button as ChakraButton } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useDeleteWishList } from '@/api/hooks/WishList/useDeleteWishList';
import { useGetWishList } from '@/api/hooks/WishList/useGetWishList';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type Item = {
  product: { id: number; name: string; price: number; imageUrl: string };
};

export const MyAccountPage = () => {
  const { authInfo } = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const { data } = useGetWishList();
  const { mutate } = useDeleteWishList();

  const handleDelete = (wishId: string) => {
    mutate(
      { wishId },
      {
        onSuccess: () => {
          alert('관심 목록에서 제거되었습니다.');
        },
      },
    );
  };

  console.log(data);
  return (
    <Wrapper>
      <Grid
        w="100%"
        h="100%"
        templateColumns="repeat(2, 1fr)"
        gap={6}
        templateRows="repeat(1,1fr)"
        display={'flex'}
        alignContent={'center'}
        justifyContent={'center'}
      >
        <GridItem>
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
        </GridItem>
        <GridItem>
          <div>WishList</div>
          <WishListWrapper>
            {data?.map((item: Item) => (
              <div key={item.product.id}>
                <div>{item.product.name}</div>
                <div>{item.product.price}</div>
                <img src={item.product.imageUrl} alt={item.product.name} width="100%" />
                <ChakraButton onClick={() => handleDelete(String(item.product.id))}>
                  관심 목록 삭제
                </ChakraButton>
              </div>
            ))}
          </WishListWrapper>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;

const WishListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  gap: 20px;
`;
