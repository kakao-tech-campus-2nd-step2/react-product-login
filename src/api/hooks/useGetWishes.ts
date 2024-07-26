import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import type { GetWishesResponseBody } from '@/api/type';

type RequestParams = {
  page?: number;
  size?: number;
  sort?: string;
};

export function getWishesPath(): string {
  return '/api/wishes';
}

function useGetWishes({
  size = 10,
  sort = 'createdDate,desc',
}: RequestParams): UseAxiosQueryWithPageResult<GetWishesResponseBody> {
  return useAxiosQueryWithPage<GetWishesResponseBody>(
    {
      method: 'GET',
      url: getWishesPath(),
      params: { size, sort },
    },
    ['wishes'],
    (lastPage) => (!lastPage.last ? (lastPage.number + 1).toString() : undefined),
  );
}

export default useGetWishes;
