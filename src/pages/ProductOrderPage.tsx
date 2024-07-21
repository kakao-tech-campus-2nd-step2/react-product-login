import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import ProductOrderForm from '@components/organisms/product/ProductOrderForm';
import useOrderHistory from '@hooks/useOrderHistory';
import { Suspense } from 'react';
import LoadingSpinner from '@components/atoms/LoadingSpinner';

function ProductOrderPage() {
  const { orderHistory } = useOrderHistory();

  if (!orderHistory) return null;

  return (
    <Page>
      <Container
        elementSize={{
          width: '100%',
          height: '100vh',
        }}
        justifyContent="center"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ProductOrderForm orderHistory={orderHistory} />
        </Suspense>
      </Container>
    </Page>
  );
}

export default ProductOrderPage;
