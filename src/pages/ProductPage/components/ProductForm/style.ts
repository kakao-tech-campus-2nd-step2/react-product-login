import { css } from '@emotion/react';

export const containerStyle = css({
  minWidth: '18rem',
  '@media (min-width: 768px)': {
    maxWidth: '24rem',
  },
});

export const buttonStyle = css({
  height: '3.5rem',
  fontSize: '1rem',
});
