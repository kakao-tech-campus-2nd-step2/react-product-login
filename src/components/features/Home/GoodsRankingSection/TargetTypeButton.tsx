import styled from '@emotion/styled';

import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

type Props = {
  value: RankingFilterOption['targetType'];
  selected: boolean;
  onClick: (value: RankingFilterOption['targetType']) => void;
};
export const TargetTypeButton = ({ value, selected, onClick }: Props) => {
  return (
    <Wrapper
      onClick={() => {
        onClick(value);
      }}
    >
      <Icon selected={selected}>{TARGET_TYPE_TEXT[value].icon}</Icon>
      <Label selected={selected}>{TARGET_TYPE_TEXT[value].label}</Label>
    </Wrapper>
  );
};

const TARGET_TYPE_TEXT = {
  ALL: {
    icon: 'ALL',
    label: '전체',
  },
  FEMALE: {
    icon: '👩🏻‍🦳',
    label: '여성이',
  },
  MALE: {
    icon: '👨🏻‍🦳',
    label: '남성이',
  },
  TEEN: {
    icon: '👦🏻',
    label: '청소년이',
  },
};

const Wrapper = styled.button`
  width: 100%;
  min-width: 58px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & + & {
    padding-left: 16px;
  }

  &:focus {
    outline: none;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    min-width: 90px;

    & + & {
      margin-left: 36px;
    }
  }
`;

const Icon = styled.div<Pick<Props, 'selected'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ selected }) => (selected ? '#4684e9' : '#e6f1ff')};
  transition: background-color 200ms;

  @media screen and (min-width: ${breakpoints.sm}) {
    width: 60px;
    height: 60px;
    border-radius: 24px;
    font-size: 20px;
  }
`;

const Label = styled.p<Pick<Props, 'selected'>>`
  padding: 5px 0;
  font-size: 14px;
  line-height: 16px;

  color: ${({ selected }) => (selected ? '#4684e9' : '#666')};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  transition:
    color 200ms,
    font-weight 200ms;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 10px 0 6px;
    font-size: 20px;
    line-height: 24px;
  }
`;
