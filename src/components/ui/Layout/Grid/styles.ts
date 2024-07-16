import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';
import { ResponseGrid } from '@/types/uiTypes';

export const gridStyle = (gap: number, columns: number | ResponseGrid) => {
  const baseStyle = {
    display: 'grid',
    width: '100%',
    placeItems: 'start',
    gap: `${gap}px`,
  };

  if (typeof columns === 'number') {
    return css({
      ...baseStyle,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    });
  }

  const breakpoints = Object.keys(columns) as (keyof typeof breakpoint)[];
  const responseGridStyle = Object.fromEntries(
    breakpoints.map((point) => [
      `@media screen and (min-width: ${breakpoint[point]})`,
      { gridTemplateColumns: `repeat(${columns[point]}, 1fr)` },
    ])
  );

  return css({
    ...baseStyle,
    ...responseGridStyle,
  });
};
