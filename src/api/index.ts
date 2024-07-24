/* eslint-disable react-hooks/exhaustive-deps */
import type {
  GetNextPageParamFunction,
  InfiniteData,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useInfiniteQuery, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { vercelApi } from '@/api/axiosInstance';

export function useAxiosQuery<T>(
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

export type UseAxiosQueryWithPageResult<T> = UseInfiniteQueryResult<InfiniteData<T>>;
export function useAxiosQueryWithPage<T>(
  axiosOptions: AxiosRequestConfig,
  keys: string[],
  getNextPageParam: (lastPage: T) => string | undefined,
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
        params: { ...axiosOptions.params, initPageToken: pageParam },
      }).then((res) => res.data),
    initialPageParam: '0',
    getNextPageParam: getNextPageParam as GetNextPageParamFunction<unknown>,
    ...(queryOptions || {}),
  });
}
