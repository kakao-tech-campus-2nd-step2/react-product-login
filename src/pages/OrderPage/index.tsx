import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ProductErrorFallback } from '@/api/components/ProductErrorFallback';
import BaseLayout from '@/layouts/BaseLayout';

import { UpDownDots } from '@/components/Loading/UpDownDots';

import { OrderForm } from './components/OrderForm';
import { useOrderHistory } from './hooks/useOrderHistory';

export const OrderPage = () => {
  const { orderHistory } = useOrderHistory();

  return (
    <BaseLayout>
      <ErrorBoundary FallbackComponent={ProductErrorFallback}>
        <Suspense fallback={<UpDownDots />}>
          <OrderForm orderHistory={orderHistory} />
        </Suspense>
      </ErrorBoundary>
    </BaseLayout>
  );
};
