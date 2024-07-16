import {
  TargetButtons,
  TargetFilterButton,
} from '@/pages/HomePage/data/filterButton';
import { RankingFilter } from '@/types/productType';

import { Container } from '@/components/ui/Layout/Container';

import { ActiveTargetButton } from './ActiveTargetButton';

type TargetTypeFilterProps = {
  targetFilter: RankingFilter['targetType'];
  setTargetFilter: (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => void;
};

export const TargetTypeFilter = ({
  targetFilter,
  setTargetFilter,
}: TargetTypeFilterProps) => {
  return (
    <Container justifyContent="space-around">
      {TargetButtons.map(({ index, text, value }: TargetFilterButton) => {
        return (
          <ActiveTargetButton
            key={index}
            icon={text.icon}
            label={text.label}
            isActive={value === targetFilter}
            onClick={() => setTargetFilter('targetType', value)}
          />
        );
      })}
    </Container>
  );
};
