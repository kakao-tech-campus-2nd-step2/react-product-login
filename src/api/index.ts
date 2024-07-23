/* eslint-disable react-hooks/exhaustive-deps */
import type {
  InfiniteData,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useInfiniteQuery, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { vercelApi } from '@/api/axiosInstance';
import type {
  GetProductsDetailResponseBody,
  GetProductsOptionResponseBody,
  GetRankingProductsRequestBody,
  GetRankingProductsResponseBody,
  GetThemesProductsRequestBody,
  GetThemesProductsResponseBody,
  GetThemesResponseBody,
} from '@/api/type';

function useAxiosQuery<T>(
  axiosOptions: AxiosRequestConfig,
  keys: string[],
  queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
  axiosInstance: AxiosInstance = vercelApi,
): UseQueryResult<T> {
  return useQuery({
    queryKey: keys,
    queryFn: async (): Promise<T> => axiosInstance(axiosOptions).then((res) => res.data),
    ...(queryOptions || {}),
  });
}

type UseAxiosQueryWithPageResult<T> = UseInfiniteQueryResult<InfiniteData<T>>;
function useAxiosQueryWithPage<T extends { nextPageToken: string }>(
  axiosOptions: AxiosRequestConfig,
  keys: string[],
  queryOptions?: Omit<
    UseInfiniteQueryOptions<InfiniteData<T>>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
  axiosInstance: AxiosInstance = vercelApi,
): UseAxiosQueryWithPageResult<T> {
  return useInfiniteQuery({
    queryKey: keys,
    queryFn: async ({ pageParam }: QueryFunctionContext) =>
      axiosInstance({
        ...axiosOptions,
        params: { ...axiosOptions.params, pageToken: pageParam },
      }).then((res) => res.data),
    initialPageParam: '0',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any) => lastPage.nextPageToken,
    ...(queryOptions || {}),
  });
}

export function useGetRankingProducts({
  targetType,
  rankType,
}: GetRankingProductsRequestBody): UseQueryResult<GetRankingProductsResponseBody> {
  return useAxiosQuery<GetRankingProductsResponseBody>(
    {
      method: 'GET',
      url: '/api/v1/ranking/products',
      params: { targetType, rankType },
    },
    ['ranking', targetType, rankType],
  );
}

export function useGetThemes(): UseQueryResult<GetThemesResponseBody> {
  return useAxiosQuery<GetThemesResponseBody>(
    {
      method: 'GET',
      url: '/api/v1/themes',
    },
    ['themes'],
  );
}

export function useGetThemesProducts({
  themeKey,
  ...params
}: GetThemesProductsRequestBody): UseAxiosQueryWithPageResult<GetThemesProductsResponseBody> {
  return useAxiosQueryWithPage<GetThemesProductsResponseBody>(
    {
      method: 'GET',
      url: `/api/v1/themes/${themeKey}/products`,
      params,
    },
    ['themes', themeKey],
  );
}

export function useGetProductsDetail({
  productsId,
}: {
  productsId: string;
}): UseQueryResult<GetProductsDetailResponseBody> {
  return useAxiosQuery<GetProductsDetailResponseBody>(
    {
      method: 'GET',
      url: `/api/v1/products/${productsId}/detail`,
    },
    ['products', productsId],
  );
}

export function useGetProductsOption({
  productsId,
}: {
  productsId: string;
}): UseQueryResult<GetProductsOptionResponseBody> {
  return useAxiosQuery<GetProductsOptionResponseBody>(
    {
      method: 'GET',
      url: `/api/v1/products/${productsId}/options`,
    },
    ['productsOptions', productsId],
  );
}
