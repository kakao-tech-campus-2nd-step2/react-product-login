import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductErrorFallback } from '@/api/components/ProductErrorFallback';
import BaseLayout from '@/layouts/BaseLayout';
import { ROUTER_PATH } from '@/routes/path';

import { Content } from '@/components/Content';
import { UpDownDots } from '@/components/Loading/UpDownDots';

import { ProductDetail } from './components/ProductDetail';
import { ProductForm } from './components/ProductForm';

export const ProductsDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  if (!productId) {
    navigate(ROUTER_PATH.HOME);
    return null;
  }

  return (
    <BaseLayout>
      <ErrorBoundary FallbackComponent={ProductErrorFallback}>
        <Suspense fallback={<UpDownDots />}>
          <Content
            gap="2rem"
            height="92vh"
            maxWidth="1280px"
            padding="0 3rem"
            css={{ padding: '2rem 0' }}
          >
            <ProductDetail productId={productId} />
            <ProductForm productId={productId} />
          </Content>
        </Suspense>
      </ErrorBoundary>
    </BaseLayout>
  );
};
