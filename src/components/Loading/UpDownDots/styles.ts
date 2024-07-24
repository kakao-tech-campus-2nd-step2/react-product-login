import { css } from '@emotion/react';

import { sync } from '@/styles/animation';
import { colors } from '@/styles/variants/theme';

export const containerStyle = css({
  height: '15rem',
  gap: '0.5rem',
});

export const dotStyle = (delay: number) =>
  css({
    animation: `${sync} 0.75s infinite ease-in-out`,
    animationDelay: `${delay}ms`,
    width: '0.7rem',
    height: '0.7rem',
    borderRadius: '50%',
    backgroundColor: colors.blackOpacity[40],
  });
