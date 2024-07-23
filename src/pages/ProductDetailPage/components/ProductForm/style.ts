import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';

export const containerStyle = css({
  minWidth: '16rem',
  [`@media (min-width: ${breakpoint.sm})`]: {
    maxWidth: '22rem',
  },
});
