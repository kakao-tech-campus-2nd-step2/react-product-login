import { useMemo } from 'react';

import { useGetThemes } from '@/api/hooks/useGetThemes';
import { getCurrentTheme } from '@/components/features/Theme/ThemeHeroSection';

type Props = { themeKey: string };

export const useCurrentTheme = ({ themeKey }: Props) => {
  const { data, isLoading, isError } = useGetThemes();

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentTheme = getCurrentTheme(themeKey, data?.themes ?? []);

  return {
    isRender,
    currentTheme,
  };
};
