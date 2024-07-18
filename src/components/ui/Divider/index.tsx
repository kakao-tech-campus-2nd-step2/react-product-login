import { HTMLAttributes } from 'react';

import { dividerStyle } from './styles';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
}

export const Divider = ({
  direction = 'horizontal',
  ...props
}: DividerProps) => {
  return <hr css={dividerStyle(direction)} {...props} />;
};
