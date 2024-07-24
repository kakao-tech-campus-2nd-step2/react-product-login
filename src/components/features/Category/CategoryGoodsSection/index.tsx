import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import useGetProducts from '@/api/hooks/useGetProducts';
import type { ProductData } from '@/api/type';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';

type Props = {
  categoryId: string;
};

export const CategoryGoodsSection = ({ categoryId }: Props) => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetProducts({
    categoryId,
  });

  const flattenGoodsList = data?.pages.map((page) => page?.content ?? []).flat();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Wrapper>
      <Container>
        <Loading isLoading={isLoading} error={isError}>
          <ListMapper<ProductData>
            items={flattenGoodsList}
            ItemComponent={({ item }) => (
              <Link to={`/products/${item.id}`}>
                <DefaultGoodsItems
                  key={item.id}
                  imageSrc={item.imageUrl}
                  title={item.name}
                  amount={item.price}
                />
              </Link>
            )}
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

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
