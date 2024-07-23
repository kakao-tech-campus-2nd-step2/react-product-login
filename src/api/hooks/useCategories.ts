import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/api/services/category';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    refetchOnMount: false,
  });
};
