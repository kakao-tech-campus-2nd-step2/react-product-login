import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useProducts } from '@/api/hooks/useProducts';

import { Content } from '@/components/Content';
import { GoodsItem } from '@/components/GoodsItem/Default/Default';
import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Grid } from '@/components/ui/Layout/Grid';

import { gridStyle } from './styles';

type CategoryProductsSectionProps = {
  categoryId: number;
};

export const CategoryProductsSection = ({
  categoryId,
}: CategoryProductsSectionProps) => {
  const { ref, inView } = useInView();

  const { categoryProducts, status, error, fetchNextPage, hasNextPage } =
    useProducts({ categoryId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <UpDownDots />;
  }

  if (!categoryProducts?.length) {
    return <OneTextContainer>상품 목록이 없습니다.</OneTextContainer>;
  }

  return (
    <Content>
      <Grid
        gap={16}
        columns={{
          initial: 2,
          md: 4,
        }}
        css={gridStyle}
      >
        {categoryProducts.map(({ id, imageUrl, name, price }, index) => {
          return (
            <Link
              key={id}
              to={`/products/${id}`}
              ref={categoryProducts.length === index + 1 ? ref : undefined}
            >
              <GoodsItem
                imageSrc={imageUrl}
                subtitle=""
                title={name}
                amount={price}
              />
            </Link>
          );
        })}
      </Grid>
    </Content>
  );
};
