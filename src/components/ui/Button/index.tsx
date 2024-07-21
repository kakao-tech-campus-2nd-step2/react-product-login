import { ButtonHTMLAttributes } from 'react';

import { Size, Theme } from '@/types/uiTypes';

import { buttonStyle } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  size?: Size;
  width?: string;
}

export const Button = ({
  children,
  onClick,
  theme = 'kakao',
  size = 'small',
  width = '100%',
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      css={buttonStyle(theme, size, width, disabled)}
      {...props}
    >
      {children}
    </button>
  );
};
