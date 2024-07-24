import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import type { GetCategoriesProductsResponseBody } from '@/api/type';

type RequestParams = {
  categoryId: string;
  maxResults?: number;
  initPageToken?: string;
};

export function getProductsPath({ categoryId, maxResults }: RequestParams): string {
  return `/api/products?categoryId=${categoryId}` + (maxResults ? `&maxResults=${maxResults}` : '');
}

function useGetProducts({
  categoryId,
  maxResults = 20,
}: RequestParams): UseAxiosQueryWithPageResult<GetCategoriesProductsResponseBody> {
  return useAxiosQueryWithPage<GetCategoriesProductsResponseBody>(
    {
      method: 'GET',
      url: getProductsPath({ categoryId, maxResults }),
    },
    ['products', categoryId],
    (lastPage) => (!lastPage.last ? (lastPage.number + 1).toString() : undefined),
  );
}

export default useGetProducts;
