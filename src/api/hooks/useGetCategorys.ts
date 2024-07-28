import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { CATEGORIES_RESPONSE_DATA, getCategoriesPath } from '../mocks/categories.mock';

// 모킹 데이터 타입 정의
export type CategoryResponseData = CategoryData[];

// React Query에서 사용할 쿼리 키
const categoriesQueryKey = [getCategoriesPath()];

// 모킹 데이터를 반환하는 함수
export const getCategories = async () => {
  // 실제 API 호출 대신 모킹 데이터를 반환합니다.
  return CATEGORIES_RESPONSE_DATA;
};

// useGetCategories 훅
export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
