import { useQuery } from '@tanstack/react-query';

import { fetchThemes } from '@/api/services/themes';

export const useThemeCategory = () => {
  const { data, status, error } = useQuery({
    queryKey: ['themeData'],
    queryFn: () => fetchThemes(),
    refetchOnMount: false,
  });

  const themeCategoryList = data?.categories;

  return { themeCategoryList, status, error };
};
