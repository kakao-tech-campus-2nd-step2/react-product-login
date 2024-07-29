import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeErrorFallback } from '@/api/components/ThemeErrorFallback';
import BaseLayout from '@/layouts/BaseLayout';
import { ROUTER_PATH } from '@/routes/path';

import { Skeleton } from '@/components/Loading/Skeleton';

import { CategoryHeroSection } from './components/CategoryHeroSection';
import { CategoryProductsSection } from './components/CategoryProductsSection';

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  if (!categoryId) {
    navigate(ROUTER_PATH.HOME);
    return null;
  }

  return (
    <BaseLayout>
      <ErrorBoundary FallbackComponent={ThemeErrorFallback}>
        <Suspense fallback={<Skeleton width="100vw" height="13rem" />}>
          <CategoryHeroSection categoryId={Number(categoryId)} />
        </Suspense>
      </ErrorBoundary>
      <CategoryProductsSection categoryId={Number(categoryId)} />
    </BaseLayout>
  );
};
