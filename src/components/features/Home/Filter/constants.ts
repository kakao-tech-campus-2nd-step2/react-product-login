export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type WishType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

export const FILTER_TARGETS: { id: number; icon: string; name: string; targetType: TargetType }[] = [
  { id: 1, icon: 'ALL', name: '전체', targetType: 'ALL' },
  { id: 2, icon: '👩🏻‍🦳', name: '여성이', targetType: 'FEMALE' },
  { id: 3, icon: '👨🏻‍🦳', name: '남성이', targetType: 'MALE' },
  { id: 4, icon: '👦🏻', name: '청소년이', targetType: 'TEEN' },
];

export const FILTER_WISHS: { id: number; wish: string; rankType: WishType }[] = [
  { id: 1, wish: '받고 싶어한', rankType: 'MANY_WISH' },
  { id: 2, wish: '많이 선물한', rankType: 'MANY_RECEIVE' },
  { id: 3, wish: '위시로 받은', rankType: 'MANY_WISH_RECEIVE' },
];
