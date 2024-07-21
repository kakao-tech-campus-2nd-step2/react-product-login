import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import ProductDetailDisplaySection from '@components/organisms/product/ProductDetailDisplaySection';
import { LoadingSpinnerFullWidth } from '@components/atoms/LoadingSpinner';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';
import Paths from '@constants/Paths';

function ProductDetailsPage() {
  const { productId } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [productId, navigate]);

  if (!productId) {
    return null;
  }

  return (
    <Page>
      <Container elementSize="full-width" justifyContent="center">
        <Container elementSize="full-width" maxWidth="1280px">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinnerFullWidth />}>
              <ProductDetailDisplaySection productId={parseInt(productId, 10)} />
            </Suspense>
          </ErrorBoundary>
        </Container>
      </Container>
    </Page>
  );
}

export default ProductDetailsPage;
