import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeErrorFallback } from '@/api/components/ThemeErrorFallback';
import BaseLayout from '@/layouts/BaseLayout';
import { ROUTER_PATH } from '@/routes/path';

import { Skeleton } from '@/components/Loading/Skeleton';

import { ThemeGoodsSection } from './components/ThemeGoodsSection';
import { ThemeHeroSection } from './components/ThemeHeroSection';

export const ThemePage = () => {
  const navigate = useNavigate();
  const { themeKey } = useParams();

  if (!themeKey) {
    navigate(ROUTER_PATH.HOME);
    return null;
  }

  return (
    <BaseLayout>
      <ErrorBoundary FallbackComponent={ThemeErrorFallback}>
        <Suspense fallback={<Skeleton width="100vw" height="13rem" />}>
          <ThemeHeroSection themeKey={themeKey} />
        </Suspense>
      </ErrorBoundary>
      <ThemeGoodsSection themeKey={themeKey} />
    </BaseLayout>
  );
};
