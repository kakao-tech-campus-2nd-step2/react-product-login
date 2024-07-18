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
import { containerStyle } from './styles';

export const ProductPage = () => {
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
            css={containerStyle}
          >
            <ProductDetail productId={Number(productId)} />
            <ProductForm productId={Number(productId)} />
          </Content>
        </Suspense>
      </ErrorBoundary>
    </BaseLayout>
  );
};
