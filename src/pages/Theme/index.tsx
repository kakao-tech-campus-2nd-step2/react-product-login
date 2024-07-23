import { Navigate, useParams } from 'react-router-dom';

import { useGetThemes } from '@/api';
import Loading from '@/components/common/Loading';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const {
    data: themeListResponse,
    isLoading: isThemeListLoading,
    isError: isThemeListError,
  } = useGetThemes();

  const themeList = themeListResponse?.themes || [];

  const currentTheme = getCurrentTheme(themeKey, themeList);

  if (!isThemeListLoading && !currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <Loading isLoading={isThemeListLoading} error={isThemeListError}>
        <ThemeHeroSection themeKey={themeKey} themeList={themeList} />
      </Loading>
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
