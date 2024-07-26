import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/View/LoadingView';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<ProductDetailRequestParams>();

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post('/api/wishes', { productId: parseInt(productId) }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        alert('관심 등록 완료');
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert('관심 등록 실패');
    }
  };

  return (
    <>
      <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<OptionSection productId={productId} />}>
          <GoodsDetail productId={productId} />
          <Button onClick={handleAddToWishlist}>관심 등록</Button>
        </SplitLayout>
      </AsyncBoundary>
    </>
  );
};
