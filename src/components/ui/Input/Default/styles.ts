import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const inputStyle = {
  border: `1px solid ${colors.newGray[200]}`,
  borderRadius: '0.3rem',
  width: '100%',
  height: '2.5rem',
  padding: '0 1rem',
};

export const defaultInputStyle = css({
  ...inputStyle,
});
