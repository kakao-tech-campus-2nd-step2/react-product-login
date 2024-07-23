import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import ResponsiveGrid from '@components/atoms/grid/responsive/ResponsiveGrid';
import MainCategoryItem from '@components/organisms/main/category/MainCategoryItem';
import ResponsiveCategorySection
  from '@components/organisms/main/category/ResponsiveCategorySection';
import { useContext } from 'react';
import FetchStatusBoundary
  from '@components/atoms/boundary/FetchStatusBoundary';
import { CategoryContext } from '@/providers/CategoryContextProvider';

function CategorySection() {
  const { categories, fetchStatus } = useContext(CategoryContext);

  return (
    <ResponsiveCategorySection>
      <Container
        elementSize="full-width"
        maxWidth={MAX_CONTENT_WIDTH}
        justifyContent="center"
      >
        <FetchStatusBoundary fetchStatus={fetchStatus}>
          <ResponsiveGrid columnsDefault={6} columnsMd={4} gap={0}>
            {Object.keys(categories).map((themeKey, i) => {
              const key = `$gift-theme-${i}`;

              return (
                <MainCategoryItem categoryId={themeKey} key={key} />
              );
            })}
          </ResponsiveGrid>
        </FetchStatusBoundary>
      </Container>
    </ResponsiveCategorySection>
  );
}

export default CategorySection;
