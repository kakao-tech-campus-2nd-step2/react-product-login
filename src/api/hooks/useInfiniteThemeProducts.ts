import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchThemeProduct } from '@/api/services/themeProduct';

const DEFAULT_MAX_RESULTS = 20;

export const useInfiniteThemeProducts = (
  themeKey: string,
  maxResults: number = DEFAULT_MAX_RESULTS
) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['themeProducts', themeKey, maxResults],
    queryFn: ({ pageParam }) =>
      fetchThemeProduct(themeKey, pageParam, maxResults),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPageToken ? allPages.length : undefined;
    },
  });

  const themeProducts = data?.pages.flatMap((page) => page.products);

  return {
    themeProducts,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
