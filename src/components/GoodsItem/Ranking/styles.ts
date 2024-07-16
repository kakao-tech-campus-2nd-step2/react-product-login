import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const rankingWrapperStyle = css({
  position: 'relative',
  width: '100%',
  height: 'auto',
  display: 'inline-block',
});

export const rankingStyle = (rankingIndex: number) =>
  css({
    position: 'absolute',
    top: '0.25rem',
    left: '0.25rem',
    width: '1.5rem',
    height: '1.5rem',
    zIndex: 10,
    backgroundColor: rankingIndex <= 3 ? colors.pink : colors.gray[400],
    color: colors.white,
    borderRadius: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  });
