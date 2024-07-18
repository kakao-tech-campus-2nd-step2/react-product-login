import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const textAreaStyle = css({
  width: '100%',
  border: `1px solid ${colors.newGray[200]}`,
  borderRadius: '0.3rem',
  padding: '0.5rem 0.7rem',
  backgroundColor: colors.newGray[100],
  '&:focus': {
    backgroundColor: colors.white,
    outline: 'none',
  },
  '::placeholder': {
    color: colors.newGray[500],
  },
});
