import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import ProductDetailDisplaySection from '@components/organisms/product/ProductDetailDisplaySection';
import { LoadingSpinnerFullWidth } from '@components/atoms/LoadingSpinner';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';

function ProductDetailsPage() {
  const { productId } = useParams<string>();

  return (
    <Page>
      <Container elementSize="full-width" justifyContent="center">
        <Container elementSize="full-width" maxWidth="1280px">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinnerFullWidth />}>
              <ProductDetailDisplaySection productId={productId} />
            </Suspense>
          </ErrorBoundary>
        </Container>
      </Container>
    </Page>
  );
}

export default ProductDetailsPage;
