import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchThemes } from '@/api/services/themes';
import { RENDER_ERROR_MESSAGES } from '@/constants/errorMessage';

export const useThemeHero = (themeKey: string) => {
  const { data, status, error } = useSuspenseQuery({
    queryKey: ['themeData'],
    queryFn: () => fetchThemes(),
    refetchOnMount: false,
  });

  const themeHero = data?.themes.find((theme) => theme.key === themeKey);

  if (!themeHero) {
    throw new Error(RENDER_ERROR_MESSAGES.THEME_NOT_FOUND);
  }

  return { themeHero, status, error };
};
