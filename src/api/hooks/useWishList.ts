import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchWishList } from '@/api/services/wish';
import { WishListRequestParams } from '@/api/services/wish/types';

type WishListParams = Pick<WishListRequestParams, 'maxResults'> & {
  initPageToken?: string;
};

export const useWishList = ({
  maxResults = 20,
  initPageToken,
}: WishListParams) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['wish', maxResults, initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      fetchWishList({ pageToken: pageParam, maxResults }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const wishList = data?.pages.flatMap((page) => page.wishList);

  return {
    wishList,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
