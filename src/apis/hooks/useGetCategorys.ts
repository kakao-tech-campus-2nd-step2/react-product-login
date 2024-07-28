import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@internalTypes/dataTypes';

import axiosInstance from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${process.env.REACT_APP_BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await axiosInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
