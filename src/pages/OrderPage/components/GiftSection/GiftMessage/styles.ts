import { CSSObject, css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const textAreaContainerStyle = css({
  position: 'relative',
  width: '100%',
});

export const textLengthStyle = (isMaxLength: boolean) => {
  const defaultStyle: CSSObject = {
    position: 'absolute',
    bottom: '-1.5rem',
    right: '0',
  };

  if (isMaxLength) {
    return css({
      ...defaultStyle,
      color: colors.red,
    });
  }

  return css({ ...defaultStyle });
};
