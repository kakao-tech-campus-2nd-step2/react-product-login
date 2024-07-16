import {
  RankButtons,
  RankFilterButton,
} from '@/pages/HomePage/data/filterButton';
import { RankingFilter } from '@/types/productType';

import { Callout } from '@/components/Callout';

import { ActiveRankButton } from './ActiveRankButton';
import { calloutStyle } from './styles';

type RankTypeFilterProps = {
  rankFilter: RankingFilter['rankType'];
  setRankFilter: (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => void;
};

export const RankTypeFilter = ({
  rankFilter,
  setRankFilter,
}: RankTypeFilterProps) => {
  return (
    <Callout justifyContent="space-around" theme="skyblue" css={calloutStyle}>
      {RankButtons.map(({ index, label, value }: RankFilterButton) => (
        <ActiveRankButton
          key={index}
          label={label}
          isActive={value === rankFilter}
          onClick={() => setRankFilter('rankType', value)}
        />
      ))}
    </Callout>
  );
};
