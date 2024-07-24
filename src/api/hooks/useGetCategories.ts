import type { UseQueryResult } from '@tanstack/react-query';

import { useAxiosQuery } from '@/api';
import type { GetCategoriesResponseBody } from '@/api/type';

export function getCategoriesPath(): string {
  return '/api/categories';
}

function useGetCategories(): UseQueryResult<GetCategoriesResponseBody> {
  return useAxiosQuery<GetCategoriesResponseBody>(
    {
      method: 'GET',
      url: getCategoriesPath(),
    },
    ['categories'],
  );
}

export default useGetCategories;
