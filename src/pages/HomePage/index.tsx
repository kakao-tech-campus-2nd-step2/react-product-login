import BaseLayout from '@/layouts/BaseLayout';

import { BannerBottom } from './components/BannerBottom';
import { BannerTop } from './components/BannerTop';
import { GoodsRankingSection } from './components/GoodsRankingSection';
import { ThemeCategorySection } from './components/ThemeCategorySection';

export const HomePage = () => {
  return (
    <BaseLayout>
      <BannerTop />
      <ThemeCategorySection />
      <BannerBottom />
      <GoodsRankingSection />
    </BaseLayout>
  );
};
