import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { RankTypeButton } from './RankTypeButton';
import { TargetTypeButton } from './TargetTypeButton';

type Props = {
  filterOption: RankingFilterOption;
  onFilterOptionChange: (option: RankingFilterOption) => void;
};

export const GoodsRankingFilter = ({ filterOption, onFilterOptionChange }: Props) => {
  const handleFilterOption = (
    key: keyof RankingFilterOption,
    value: RankingFilterOption[keyof RankingFilterOption],
  ) => {
    onFilterOptionChange({
      ...filterOption,
      [key]: value,
    });
  };

  return (
    <Wrapper>
      <TargetTypeWrapper>
        <TargetTypeButton
          value="ALL"
          selected={filterOption.targetType === 'ALL'}
          onClick={(value) => {
            handleFilterOption('targetType', value);
          }}
        />
        <TargetTypeButton
          value="FEMALE"
          selected={filterOption.targetType === 'FEMALE'}
          onClick={(value) => {
            handleFilterOption('targetType', value);
          }}
        />
        <TargetTypeButton
          value="MALE"
          selected={filterOption.targetType === 'MALE'}
          onClick={(value) => {
            handleFilterOption('targetType', value);
          }}
        />
        <TargetTypeButton
          value="TEEN"
          selected={filterOption.targetType === 'TEEN'}
          onClick={(value) => {
            handleFilterOption('targetType', value);
          }}
        />
      </TargetTypeWrapper>
      <Spacing />
      <RankTypeWrapper>
        <RankTypeButton
          label="받고 싶어한"
          value="MANY_WISH"
          selected={filterOption.rankType === 'MANY_WISH'}
          onClick={(value) => {
            handleFilterOption('rankType', value);
          }}
        />
        <RankTypeButton
          label="많이 선물한"
          value="MANY_RECEIVE"
          selected={filterOption.rankType === 'MANY_RECEIVE'}
          onClick={(value) => {
            handleFilterOption('rankType', value);
          }}
        />
        <RankTypeButton
          label="위시로 받은"
          value="MANY_WISH_RECEIVE"
          selected={filterOption.rankType === 'MANY_WISH_RECEIVE'}
          onClick={(value) => {
            handleFilterOption('rankType', value);
          }}
        />
      </RankTypeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TargetTypeWrapper = styled.div`
  display: flex;
`;

const RankTypeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(70, 132, 233, 0.1);
  background-color: #e6f1ff;

  border-radius: 8px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border-radius: 12px;
  }
`;
