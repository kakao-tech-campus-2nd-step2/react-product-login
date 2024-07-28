import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import { vercelApiWithAuth } from '@/api/axiosInstance';
import type { GetWishesResponseBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

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
  const token = authSessionStorage.get() ?? '';

  return useAxiosQueryWithPage<GetWishesResponseBody>(
    {
      method: 'GET',
      url: getWishesPath({ size, sort }),
    },
    ['wishes'],
    (lastPage) => (!lastPage.last ? (lastPage.number + 1).toString() : undefined),
    vercelApiWithAuth(token),
  );
}

export default useGetWishes;
