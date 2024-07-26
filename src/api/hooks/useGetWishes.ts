import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import type { GetWishesResponseBody } from '@/api/type';

type RequestParams = {
  size?: number;
  sort?: string;
};

export function getWishesPath({ size, sort }: RequestParams): string {
  return '/api/wishes' + (size ? `?size=${size}` : '') + (sort ? `&sort=${sort}` : '');
}

function useGetWishes({
  size = 10,
  sort = 'createdDate,desc',
}: RequestParams): UseAxiosQueryWithPageResult<GetWishesResponseBody> {
  return useAxiosQueryWithPage<GetWishesResponseBody>(
    {
      method: 'GET',
      url: getWishesPath({ size, sort }),
    },
    ['wishes'],
    (lastPage) => (!lastPage.last ? (lastPage.number + 1).toString() : undefined),
  );
}

export default useGetWishes;
