import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useGetThemesProducts } from '@/api';
import type { ProductData } from '@/api/type';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { ref, inView } = useInView();

  const {
    data: productsPages,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetThemesProducts({
    themeKey,
  });

  const products: ProductData[] = productsPages?.pages.flatMap((page) => page.products) || [];

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
            items={products}
            ItemComponent={({ item }) => (
              <Link to={`/products/${item.id}`}>
                <DefaultGoodsItems
                  key={item.id}
                  imageSrc={item.imageURL}
                  title={item.name}
                  amount={item.price.sellingPrice}
                  subtitle={item.brandInfo.name}
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
