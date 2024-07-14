import { useQuery } from '@tanstack/react-query';

import type { ThemeData } from '@/types';

import { fetchInstance } from '../instance';

export type ThemeResponseData = {
  themes: ThemeData[];
};

const getThemesPath = () => '/v1/themes';
const themesQueryKey = [getThemesPath()];

export const getThemes = async () => {
  const response = await fetchInstance.get<ThemeResponseData>(getThemesPath());
  return response.data;
};

export const useGetThemes = () =>
  useQuery({
    queryKey: themesQueryKey,
    queryFn: getThemes,
  });
