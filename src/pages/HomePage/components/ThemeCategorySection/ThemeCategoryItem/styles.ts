import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';

export const containerStyle = css({
  cursor: 'pointer',
  width: '100%',
});

export const imageStyle = css({
  width: '100%',
  maxWidth: '6rem',
  [`@media screen and (min-width: ${breakpoint.sm})`]: {
    maxWidth: '7rem',
  },
});

export const titleStyle = css({
  fontWeight: '500',
});
