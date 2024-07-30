import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useDeleteWishs } from '@/api/hooks/useDeleteWish';
import { useGetWishList } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
import { breakpoints } from '@/styles/variants';

export const WishList = () => {
  const { data, isError, isLoading } = useGetWishList({
    maxResults: 10,
    initPageToken: 'undefined',
  });
  const { mutate: deleteWish } = useDeleteWishs();

  const handleDeleteWish = (id: number) => {
    deleteWish(id, {
      onSuccess: () => {
        alert('삭제 완료');
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    });
  };
  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.pages[0].products.length <= 0) return <TextView>위시리스트가 없어요.</TextView>;
  const flattenWishList = data.pages.map((page) => page?.products ?? []).flat();
  return (
    <Wrapper>
      <Title>Wish List</Title>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
          gap={16}
        >
          {flattenWishList.map(({ id, product }) => (
            <div
              key={id}
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <DefaultGoodsItems
                imageSrc={product.imageUrl}
                title={product.name}
                amount={product.price}
                subtitle={''}
              />
              <Button theme="darkGray" size="small" onClick={() => handleDeleteWish(product.id)}>
                삭제
              </Button>
            </div>
          ))}
        </Grid>
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
const Title = styled.h2`
  text-align: center;
  margin: 20px;
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
