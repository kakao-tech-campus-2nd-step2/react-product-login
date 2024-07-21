import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { LoadingView } from '@/components/common/View/LoadingView';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { useHandleOrderHistory } from '@/hooks/useHandleOrderHistory';

export const OrderPage = () => {
  const { orderHistory } = useHandleOrderHistory();

  if (!orderHistory) return <LoadingView />;
  return (
    <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
      <OrderForm orderHistory={orderHistory} />
    </AsyncBoundary>
  );
};
