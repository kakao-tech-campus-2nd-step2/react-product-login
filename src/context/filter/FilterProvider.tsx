import React, { ReactNode, useState, useMemo, useCallback } from 'react';
import { TargetType, WishType } from '@components/features/Home/Filter/constants';
import FilterContext from './FilterContext';

interface FilterState {
  target: TargetType;
  wish: WishType;
}

interface FilterProviderProps {
  children: ReactNode;
}

export default function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState<FilterState>({
    target: 'ALL',
    wish: 'MANY_WISH',
  });

  const selectTarget = useCallback(
    (target: TargetType) => {
      setFilter((prevFilters) => ({ ...prevFilters, target }));
    },
    [setFilter],
  );

  const selectWish = useCallback(
    (wish: WishType) => {
      setFilter((prevFilters) => ({ ...prevFilters, wish }));
    },
    [setFilter],
  );

  const value = useMemo(
    () => ({
      selectedTarget: filter.target,
      selectedWish: filter.wish,
      selectTarget,
      selectWish,
    }),
    [filter, selectTarget, selectWish],
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}
