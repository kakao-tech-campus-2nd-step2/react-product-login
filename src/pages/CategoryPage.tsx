import { useNavigate, useParams } from 'react-router-dom';
import Page from '@components/templates/Page';
import Banner from '@components/organisms/banner/Banner';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { Suspense, useContext, useEffect } from 'react';
import FetchStatus from '@constants/FetchStatus';
import CategoryProductDisplaySection
  from '@components/organisms/category/CategoryProductDisplaySection';
import Container from '@components/atoms/container/Container';
import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';
import CategoryContextProvider, { CategoryContext } from '@/providers/CategoryContextProvider';

function CategoryPage() {
  const { categoryId } = useParams();
  const { categories, fetchStatus: themeFetchStatus } = useContext(CategoryContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (themeFetchStatus === FetchStatus.FETCHING) return;

    if (!categoryId || !(categoryId in categories)) {
      navigate(-1);
    }
  }, [navigate, categories, categoryId, themeFetchStatus]);

  return (
    <CategoryContextProvider>
      <Page>
        <Banner categoryId={categoryId as string} />
        <Container elementSize="full-width" justifyContent="center">
          <Container
            elementSize="full-width"
            maxWidth={MAX_CONTENT_WIDTH}
            alignItems="center"
            flexDirection="column"
            padding="40px 16px"
            cssProps={{
              gap: '16px',
            }}
          >
            <ErrorBoundary>
              <Suspense fallback={
                <ProductSkeletonGrid columnsDefault={4} itemCount={8} columnsSm={2} />
              }
              >
                <CategoryProductDisplaySection
                  categoryId={parseInt(categoryId as string, 10)}
                />
              </Suspense>
            </ErrorBoundary>
          </Container>
        </Container>
      </Page>
    </CategoryContextProvider>
  );
}

export default CategoryPage;
