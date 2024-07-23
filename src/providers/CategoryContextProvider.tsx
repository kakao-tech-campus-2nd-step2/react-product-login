import {
  createContext, ReactNode, useMemo,
} from 'react';
import FetchStatus from '@constants/FetchStatus';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@utils/query';
import { QueryKeys } from '@constants/QueryKeys';
import { FetchStatusType, CategoryRepository } from '@/types';

interface ThemeContextData {
  themes: CategoryRepository;
  fetchStatus: FetchStatusType;
}

const defaultThemeContextData = {
  themes: {},
  fetchStatus: FetchStatus.FETCHING,
};

export const CategoryContext = createContext<ThemeContextData>(defaultThemeContextData);

function CategoryContextProvider({ children }: { children: ReactNode }) {
  const { data: themes = {}, status } = useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: fetchCategories,
  });
  const value = useMemo<ThemeContextData>(() => ({
    themes, fetchStatus: status,
  }), [themes, status]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContextProvider;
