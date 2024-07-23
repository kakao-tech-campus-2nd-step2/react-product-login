import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetThemes } from '@/api';
import type { ThemeData } from '@/api/type';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { data: themesResponse, isLoading, isError } = useGetThemes();
  const themes = themesResponse?.themes;

  return (
    <Wrapper>
      <Container>
        <Loading isLoading={isLoading} error={isError}>
          <ListMapper<ThemeData>
            items={themes}
            ItemComponent={({ item }) => (
              <Link key={item.id} to={getDynamicPath.theme(item.key)}>
                <ThemeCategoryItem image={item.imageURL} label={item.label} />
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
