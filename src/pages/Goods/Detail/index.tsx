import { useParams } from 'react-router-dom';

import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/View/LoadingView';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();

  // productId를 숫자로 변환
  const numericProductId = parseInt(productId, 10);

  // productId가 유효한 숫자가 아닐 경우 에러 처리
  if (isNaN(numericProductId)) {
    return <div>Invalid product ID</div>;
  }

  return (
    <>
      <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<OptionSection productId={numericProductId} />}>
          <GoodsDetail productId={numericProductId} />
        </SplitLayout>
      </AsyncBoundary>
    </>
  );
};
