import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const dividerStyle = (direction: 'vertical' | 'horizontal') => {
  if (direction === 'vertical')
    return css({
      width: '1px',
      height: '100%',
      border: 'none',
      backgroundColor: colors.newGray[200],
    });
  return css({
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: colors.newGray[200],
  });
};
