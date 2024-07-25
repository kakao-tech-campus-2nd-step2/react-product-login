import {
  useCallback,
} from 'react';
import { axiosInstance } from '@utils/network';
import {
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import RequestURLs from '@constants/RequestURLs';
import {
  CategoryProductsResponse,
} from '@/types/response';
import { CategoryProductsRequestQuery } from '@/types/request';

interface FetchParams {
  categoryId: number;
}

const MAX_RESULTS_PER_PAGE = 20;

function useFetchCategoryProducts({ categoryId }: FetchParams) {
  const fetchPage = useCallback(async ({ pageParam = 0 }) => {
    const params: CategoryProductsRequestQuery = {
      size: MAX_RESULTS_PER_PAGE,
      page: pageParam,
      sort: 'name,asc', // 임시 하드코딩
      categoryId,
    };

    const response = await axiosInstance.get<CategoryProductsResponse>(
      RequestURLs.CATEGORY_PRODUCTS,
      {
        params,
      },
    );

    return response.data;
  }, [categoryId]);
  const {
    data: productResponse,
    fetchNextPage, hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    initialData: undefined,
    initialPageParam: undefined,
    queryKey: [QueryKeys.CATEGORY_PRODUCTS, categoryId],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.pageable.pageNumber + 1),
  });

  return {
    productResponse, fetchNextPage, hasNextPage, isFetchingNextPage,
  };
}

export default useFetchCategoryProducts;
