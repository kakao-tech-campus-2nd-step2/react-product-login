import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchInstance } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
// import { LoadingView } from '@/components/common/View/LoadingView';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

interface ContentData {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}
interface WishListData {
  content: ContentData[];
}

const initdata = {
  content: [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Product A',
        price: 100,
        imageUrl:
          '	https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      },
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Product B',
        price: 150,
        imageUrl:
          '	https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      },
    },
  ],
};

export const WishList = () => {
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await fetchInstance.delete(`/api/wishes/${id}`);
    },
    onSuccess: () => {
      alert('삭제되었습니다.');
    },
    onError: () => {
      alert('삭제에 실패했습니다.');
    },
  });

  const {
    data = initdata,
    isLoading,
    isError,
  } = useQuery<WishListData>({
    queryKey: ['wishList'],
    queryFn: async () => {
      const response = await fetchInstance.get('/api/wishes?page=0&size=10&sort=createdDate,desc');
      return response.data;
    },
  });
  console.log(isError, isLoading);
  // if (isLoading) return <LoadingView />;
  // if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.content.length <= 0) return <TextView>상품이 없어요.</TextView>;

  const flattenGoodsList = data.content.map((page) => page ?? []).flat();

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
            <Flex flexDirection={'column'}>
              <Link key={id} to={getDynamicPath.productsDetail(id)}>
                <DefaultGoodsItems
                  key={id}
                  imageSrc={product.imageUrl}
                  title={product.name}
                  amount={product.price}
                  subtitle={''}
                />
              </Link>
              <Button
                size="small"
                onClick={() => {
                  mutate(id);
                }}
              >
                삭제
              </Button>
            </Flex>
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

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
