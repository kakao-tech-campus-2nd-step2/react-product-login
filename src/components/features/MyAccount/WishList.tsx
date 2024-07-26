import styled from '@emotion/styled';

import { useGetWishList } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { breakpoints } from '@/styles/variants';

export const WishList = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetWishList();

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.pages[0].content.length <= 0) return <TextView>위시리스트가 없어요.</TextView>;

  const flattenWishList = data.pages.map((page) => page?.content ?? []).flat();

  return (
    <Wrapper>
      <h2>Wish List</h2>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {flattenWishList.map(({ id, imageUrl, name, price }) => (
            <>
              <DefaultGoodsItems key={id} imageSrc={imageUrl} title={name} amount={price} subtitle={''} />
              <Button>삭제</Button>
            </>
          ))}
        </Grid>
        {hasNextPage && (
          <VisibilityLoader
            callback={() => {
              if (!isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
