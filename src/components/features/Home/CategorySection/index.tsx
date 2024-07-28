import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import useGetCategories from '@/api/hooks/useGetCategories';
import type { CategoryData } from '@/api/type';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import { CategoryItem } from '@/components/features/Home/CategorySection/CategoryItem';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const CategorySection = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  return (
    <Wrapper>
      <Container>
        <Loading isLoading={isLoading} error={isError}>
          <ListMapper<CategoryData>
            items={categories}
            ItemComponent={({ item }) => (
              <Link key={item.id} to={getDynamicPath.category(item.id.toString())}>
                <CategoryItem image={item.imageUrl} label={item.name} />
              </Link>
            )}
            Wrapper={Grid}
            wrapperProps={{
              columns: {
                initial: 4,
                md: 6,
              },
            }}
          />
        </Loading>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
