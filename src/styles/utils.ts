import { Radius, Ratio } from '@/types/uiTypes';

export const getBorderRadius = (radius: Radius) => {
  if (radius === 'circle') return '50%';

  return `${radius}rem`;
};

export const getAspectRatio = (ratio: Ratio) => {
  if (ratio === 'square') return '1/1';
  if (ratio === 'auto') return 'auto';
  return `${ratio}`;
};
