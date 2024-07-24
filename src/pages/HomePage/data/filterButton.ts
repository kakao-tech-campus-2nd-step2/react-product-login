import { RankingFilter } from '@/types/productType';

export type TargetFilterButton = {
  index: number;
  value: RankingFilter['targetType'];
  text: {
    icon: string;
    label: string;
  };
};

export type RankFilterButton = {
  index: number;
  value: RankingFilter['rankType'];
  label: string;
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

export const TargetButtons: TargetFilterButton[] = [
  { index: 0, value: 'ALL', text: TARGET_TYPE_TEXT.ALL },
  { index: 1, value: 'FEMALE', text: TARGET_TYPE_TEXT.FEMALE },
  { index: 2, value: 'MALE', text: TARGET_TYPE_TEXT.MALE },
  { index: 3, value: 'TEEN', text: TARGET_TYPE_TEXT.TEEN },
];

export const RankButtons: RankFilterButton[] = [
  { index: 0, value: 'MANY_WISH', label: '받고 싶어한' },
  { index: 1, value: 'MANY_RECEIVE', label: '많이 선물한' },
  { index: 2, value: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];
