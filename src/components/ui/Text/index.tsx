import { HTMLAttributes } from 'react';

import { textStyle } from './styles';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isBold?: boolean;
}

export const Text = ({
  size = 'md',
  isBold = false,
  children,
  ...props
}: TextProps) => {
  return (
    <p css={textStyle(size, isBold)} {...props}>
      {children}
    </p>
  );
};
