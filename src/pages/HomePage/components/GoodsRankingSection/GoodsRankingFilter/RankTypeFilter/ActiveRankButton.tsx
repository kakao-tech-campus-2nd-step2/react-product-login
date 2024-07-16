import { ButtonHTMLAttributes } from 'react';

import { textStyle } from './styles';

interface ActiveRankButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ActiveRankButton = ({
  label,
  isActive,
  onClick,
  ...props
}: ActiveRankButtonProps) => {
  return (
    <button onClick={onClick} css={textStyle(isActive)} {...props}>
      {label}
    </button>
  );
};
