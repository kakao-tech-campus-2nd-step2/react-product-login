import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';

export const gridStyle = css({
  padding: '3rem 1rem',
  [`@media screen and (min-width: ${breakpoint.sm})`]: {
    padding: '3rem',
  },
});

export const itemContainerStyle = css({
  width: '100%',
});
