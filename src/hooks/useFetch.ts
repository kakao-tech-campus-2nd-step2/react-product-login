import { useState, useEffect, useCallback, useMemo } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
  error: AxiosError | null;
}

export default function useFetch<T, P = undefined>(
  apiCall: (params?: P) => Promise<T>,
  apiParams?: P,
  options?: AxiosRequestConfig,
): FetchState<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: true,
    isError: false,
    error: null,
    data: null,
  });

  const memoizedApiCall = useCallback(apiCall, [apiCall]);
  const memoizedParams = useMemo(() => JSON.stringify(apiParams), [apiParams]);

  useEffect(() => {
    const fetchData = async () => {
      setFetchState({ isLoading: true, isError: false, data: null, error: null });
      try {
        const data = await memoizedApiCall(apiParams);
        setFetchState({ isLoading: false, isError: false, data, error: null });
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error fetching data: ', error);
        setFetchState({ isLoading: false, isError: true, data: null, error: axiosError });
      }
    };

    fetchData();
  }, [memoizedApiCall, memoizedParams]);

  return fetchState;
}
