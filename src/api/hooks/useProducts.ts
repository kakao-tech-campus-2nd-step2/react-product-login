import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchThemeProduct } from '@/api/services/themeProduct';
import { ProductsRequestParams } from '@/api/services/themeProduct/types';

type ProductsParams = Pick<
  ProductsRequestParams,
  'maxResults' | 'categoryId'
> & { initPageToken?: string };

export const useProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: ProductsParams) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      fetchThemeProduct({ categoryId, pageToken: pageParam, maxResults }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const categoryProducts = data?.pages.flatMap((page) => page.products);

  return {
    categoryProducts,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
