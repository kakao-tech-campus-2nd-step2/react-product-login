import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';
import { Radius } from '@/types/uiTypes';

const backgroundColor = {
  kakao: colors.yellow[100],
  skyblue: colors.blue[100],
  lightGray: colors.newGray[100],
};

const borderColor = {
  kakao: colors.yellow[200],
  skyblue: colors.blue[200],
  lightGray: colors.newGray[100],
};

const activeBackgroundColor = {
  kakao: colors.yellow[200],
  skyblue: colors.blue[400],
  lightGray: colors.newGray[100],
};

export const calloutStyles = (
  theme: 'kakao' | 'skyblue' | 'lightGray',
  radius: Radius,
  isActive: boolean
) =>
  css({
    flex: 1,
    maxWidth: '1024px',
    backgroundColor: isActive
      ? activeBackgroundColor[theme]
      : backgroundColor[theme],
    borderRadius: radius,
    border: `1px solid ${borderColor[theme]}`,
    transition: 'all 0.3s ease',
  });
