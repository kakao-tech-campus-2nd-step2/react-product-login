import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/api/services/category';
import { RENDER_ERROR_MESSAGES } from '@/constants/errorMessage';

export const useCurrentCategory = (categoryId: string) => {
  const { data, status, error } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    refetchOnMount: false,
  });

  const currentCaterogy = data?.find(
    (category) => category.id.toString() === categoryId
  );

  if (!currentCaterogy) {
    throw new Error(RENDER_ERROR_MESSAGES.THEME_NOT_FOUND);
  }

  return { currentCaterogy, status, error };
};
