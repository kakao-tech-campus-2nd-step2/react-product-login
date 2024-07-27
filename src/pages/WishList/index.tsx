import styled from '@emotion/styled';

import { useDeleteWish } from '@/api/hooks/useDeleteWish';
import { useGetWishes } from '@/api/hooks/useGetWish';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { breakpoints } from '@/styles/variants';

export const WishListPage = () => {
  const mutation = useDeleteWish();
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetWishes(
    {
      maxResults: 20,
      sort: 'createdDate,desc',
    },
  );

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.pages[0].wishes.length <= 0) return <TextView>찜한 상품이 없어요.</TextView>;

  const flattenGoodsList = data.pages.map((page) => page?.wishes ?? []).flat();
  const handleDeleteWish = (id: number) => {
    alert(id);
    mutation.mutate({ wishId: String(id) });
  };
  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {flattenGoodsList.map(({ id, product }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={product.imageUrl}
              title={product.name}
              amount={product.price}
              subtitle={''}
              onClick={() => handleDeleteWish(id)}
            />
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
