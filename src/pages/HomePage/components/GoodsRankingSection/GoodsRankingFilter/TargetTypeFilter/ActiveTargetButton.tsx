import { ButtonHTMLAttributes } from 'react';

import { Callout } from '@/components/Callout';

import { buttonStyle, calloutStyle, textStyle } from './styles';

interface ActiveTargetButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ActiveTargetButton = ({
  icon,
  label,
  isActive,
  onClick,
  ...props
}: ActiveTargetButtonProps) => {
  return (
    <button onClick={onClick} css={buttonStyle} {...props}>
      <Callout
        isActive={isActive}
        theme="skyblue"
        radius={20}
        justifyContent="center"
        alignItems="center"
        css={calloutStyle}
      >
        {icon}
      </Callout>
      <div css={textStyle(isActive)}>{label}</div>
    </button>
  );
};
