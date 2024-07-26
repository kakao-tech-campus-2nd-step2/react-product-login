/* eslint-disable react-hooks/exhaustive-deps */
import type {
  GetNextPageParamFunction,
  InfiniteData,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
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
  axiosInstance: AxiosInstance = vercelApi,
  queryOptions?: Omit<
    UseInfiniteQueryOptions<InfiniteData<T>>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
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

export type UseAxiosMutationResult<T, U> = UseMutationResult<T, Error, U, unknown>;
export function useAxiosMutation<T, U>(
  axiosOptions: AxiosRequestConfig,
  axiosInstance: AxiosInstance = vercelApi,
  refetchQueryKeys?: string[][],
  urlFn?: (body: U) => string,
  mutationOptions?: Omit<UseMutationOptions<T, Error, U>, 'mutationFn'>,
): UseAxiosMutationResult<T, U> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: U): Promise<T> =>
      axiosInstance({
        ...axiosOptions,
        data: body,
        url: urlFn ? urlFn(body) : axiosOptions.url,
      }).then((res) => {
        if (refetchQueryKeys) {
          refetchQueryKeys.forEach((key) => {
            queryClient.invalidateQueries({
              queryKey: key,
            });
          });
        }
        return res.data;
      }),
    ...(mutationOptions || {}),
  });
}
