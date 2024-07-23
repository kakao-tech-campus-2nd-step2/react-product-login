import {
  createContext, ReactNode, useMemo,
} from 'react';
import FetchStatus from '@constants/FetchStatus';
import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@utils/query';
import { QueryKeys } from '@constants/QueryKeys';
import { FetchStatusType, ThemeDataRepository } from '@/types';

interface ThemeContextData {
  themes: ThemeDataRepository;
  fetchStatus: FetchStatusType;
}

const defaultThemeContextData = {
  themes: {},
  fetchStatus: FetchStatus.FETCHING,
};

export const ThemeContext = createContext<ThemeContextData>(defaultThemeContextData);

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { data: themes = {}, status } = useQuery({
    queryKey: [QueryKeys.THEMES],
    queryFn: fetchThemes,
  });
  const value = useMemo<ThemeContextData>(() => ({
    themes, fetchStatus: status,
  }), [themes, status]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
