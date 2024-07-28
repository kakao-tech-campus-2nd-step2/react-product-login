import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetWishes from '@/api/hooks/useGetWishes';
import type { WishesData } from '@/api/type';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Spacing } from '@/components/common/layouts/Spacing';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import WishItems from '@/components/features/MyAccount/WishItems';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetWishes({});

  const flattenWishsList = data?.pages.map((page) => page?.content ?? []).flat();

  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
      <Spacing height={32} />
      <Divider />
      <h1>찜한 상품</h1>
      <Divider />
      <Spacing height={32} />
      <Container>
        <Loading isLoading={isLoading} error={isError}>
          <ListMapper<WishesData>
            items={flattenWishsList}
            ItemComponent={WishItems}
            Wrapper={Grid}
            wrapperProps={{
              columns: {
                initial: 2,
                md: 4,
              },
              gap: 16,
            }}
          />
          <div ref={ref} />
        </Loading>
      </Container>
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
