import { HTMLAttributes, ReactNode } from 'react';

import { ResponseGrid } from '@/types/uiTypes';

import { gridStyle } from './styles';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  columns: number | ResponseGrid;
  children: ReactNode;
}

export const Grid = ({ gap = 0, columns, children, ...props }: GridProps) => {
  return (
    <div css={gridStyle(gap, columns)} {...props}>
      {children}
    </div>
  );
};
