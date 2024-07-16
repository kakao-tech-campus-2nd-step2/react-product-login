import { RankingFilter } from '@/types/productType';

import { RankTypeFilter } from './RankTypeFilter';
import { TargetTypeFilter } from './TargetTypeFilter';

type GoodsRankingFilterProps = {
  filter: RankingFilter;
  handleFilter: (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => void;
};

export const GoodsRankingFilter = ({
  filter,
  handleFilter,
}: GoodsRankingFilterProps) => {
  return (
    <>
      <TargetTypeFilter
        targetFilter={filter.targetType}
        setTargetFilter={handleFilter}
      />
      <RankTypeFilter
        rankFilter={filter.rankType}
        setRankFilter={handleFilter}
      />
    </>
  );
};
