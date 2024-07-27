import { Flex, Grid } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { useDeleteWishlist } from '@/api/hooks/useDeleteWishlist';
import { useGetWishlist } from '@/api/hooks/useGetWishlist';
import { Button } from '@/components/common/Button';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

const DEFAULT_PAGE_SIZE = 10;

export const MyAccountPage = () => {
  const [page, setPage] = useState(0);
  const authInfo = useAuth();
  const { data: wishlistData } = useGetWishlist({
    page,
    size: DEFAULT_PAGE_SIZE,
    sort: '',
  });
  const { mutate: deleteWishlist } = useDeleteWishlist();

  if (!wishlistData) {
    return null;
  }

  const { totalPages } = wishlistData;

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleDeleteWishlist = (productId: string) => {
    deleteWishlist({ productId });
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <Grid templateColumns="repeat(5, 1fr)" gap={'1rem'}>
        {wishlistData.content.map(({ id, product: { name, imageUrl, price } }) => (
          <div key={id}>
            <DefaultGoodsItems amount={price} imageSrc={imageUrl} subtitle={name} title={name} />
            <Button size="small" theme="darkGray" onClick={() => handleDeleteWishlist(`${id}`)}>
              삭제
            </Button>
          </div>
        ))}
      </Grid>
      <Spacing height={64} />
      <Flex gap={'1rem'}>
        <Button
          size="small"
          theme="darkGray"
          onClick={() => setPage((prev) => (prev <= 0 ? 0 : prev - 1))}
          style={{
            maxWidth: '200px',
          }}
        >
          {'<'}
        </Button>
        <Button
          size="small"
          theme="darkGray"
          onClick={() => setPage((prev) => (prev >= totalPages ? totalPages : prev + 1))}
          style={{
            maxWidth: '200px',
          }}
        >
          {'>'}
        </Button>
      </Flex>
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
