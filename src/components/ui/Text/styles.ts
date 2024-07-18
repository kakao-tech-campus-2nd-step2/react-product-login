import { css } from '@emotion/react';

const fontSize = {
  sm: '0.9rem',
  md: '1rem',
  lg: '1.2rem',
  xl: '1.5rem',
  '2xl': '1.7rem',
};

export const textStyle = (
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  isBold: boolean
) => {
  if (isBold) {
    return css({
      fontWeight: '700',
      fontSize: fontSize[size],
    });
  }
  return css({
    fontSize: fontSize[size],
  });
};
