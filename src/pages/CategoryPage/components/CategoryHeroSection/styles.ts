import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const heroStyle = css({
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
});

const textColor = {
  label: colors.whiteOpacity[60],
  title: colors.white,
  description: colors.whiteOpacity[60],
};

const fontWeight = {
  label: '800',
  title: '800',
  description: '500',
};

const fontSize = {
  label: '1.25rem',
  title: '2rem',
  description: '1.4rem',
};

export const textStyle = (textType: 'label' | 'title' | 'description') =>
  css({
    color: textColor[textType],
    fontWeight: fontWeight[textType],
    fontSize: fontSize[textType],
  });
