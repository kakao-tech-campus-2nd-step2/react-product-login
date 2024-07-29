import { Link } from 'react-router-dom';

import { useCategories } from '@/api/hooks/useCategories';
import { getDynamicPath } from '@/routes/path';
import { CategoryData } from '@/types/categoryType';

import { Content } from '@/components/Content';
import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Grid } from '@/components/ui/Layout/Grid';

import { ThemeCategoryItem } from './ThemeCategoryItem';
import { gridStyle, itemContainerStyle } from './styles';

export const ThemeCategorySection = () => {
  const { data: categories, status, error } = useCategories();

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <UpDownDots />;
  }

  return (
    <Content height="fit-content" justifyContent="center">
      <Grid
        columns={{
          initial: 4,
          md: 6,
        }}
        gap={40}
        css={gridStyle}
      >
        {categories?.map(({ id, name, imageUrl }: CategoryData) => (
          <Link
            key={id}
            to={getDynamicPath.category(id)}
            css={itemContainerStyle}
          >
            <ThemeCategoryItem label={name} imageURL={imageUrl} />
          </Link>
        ))}
      </Grid>
    </Content>
  );
};
