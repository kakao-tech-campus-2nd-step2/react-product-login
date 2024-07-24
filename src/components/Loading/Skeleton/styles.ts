import { css } from '@emotion/react';

import { pulse } from '@/styles/animation';
import { getBorderRadius } from '@/styles/utils';
import { colors } from '@/styles/variants/theme';
import { Radius } from '@/types/uiTypes';

export const skeletonStyles = (width: string, height: string, radius: Radius) =>
  css({
    animation: `${pulse} 2s ease infinite`,
    backgroundColor: colors.gray[200],
    borderRadius: getBorderRadius(radius),
    width,
    height,
  });
