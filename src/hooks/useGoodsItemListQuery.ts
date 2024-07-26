import { getThemesProducts } from '@apis/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface useGoodsItemListQueryProps {
  themeKey: string | undefined;
  rowsPerPage: number;
}

export default function useGoodsItemListQuery({ themeKey, rowsPerPage }: useGoodsItemListQueryProps) {
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['themeProduct', themeKey],
    queryFn: ({ pageParam = '0' }) => getThemesProducts({ themeKey, pageToken: pageParam, maxResults: rowsPerPage }),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const products = useMemo(() => data?.pages.flatMap((page) => page.products) || [], [data]);

  return { products, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage };
}
