import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';

export const containerStyle = css({
  flexDirection: 'column',
  [`@media screen and (min-width: ${breakpoint.md})`]: {
    flexDirection: 'row',
  },
});

export const textContainerStyle = css({
  paddingTop: '1rem',
});
