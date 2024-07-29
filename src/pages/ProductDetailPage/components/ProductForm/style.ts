import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';

export const containerStyle = css({
  minWidth: '16rem',
  [`@media (min-width: ${breakpoint.sm})`]: {
    maxWidth: '22rem',
  },
});

export const submitButton = css({
  flex: 1,
  height: '5rem',
  fontSize: '1.2rem',
});
