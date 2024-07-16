import { useEffect, useState } from 'react';

import { INITIAL_ITEMS_COUNT } from '@/pages/HomePage/data/initailCount';
import { ProductData, RankingFilter } from '@/types/productType';

export const useVisibleList = (
  filteredList: ProductData[],
  filter: RankingFilter
) => {
  const [visibleItemCount, setVisibleItemCount] = useState(INITIAL_ITEMS_COUNT);
  const visibleItems = filteredList.slice(0, visibleItemCount);

  useEffect(() => {
    setVisibleItemCount(INITIAL_ITEMS_COUNT);
  }, [filter]);

  return { visibleItems, visibleItemCount, setVisibleItemCount };
};
