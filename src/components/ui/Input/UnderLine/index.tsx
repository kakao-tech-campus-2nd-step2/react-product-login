import { InputHTMLAttributes, forwardRef } from 'react';

import { Size } from '@/types/uiTypes';

import { inputStyle } from './styles';

interface UnderLineInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  invalid?: boolean;
}

const UderLineInput = forwardRef<HTMLInputElement, UnderLineInputProps>(
  ({ size = 'small', invalid = false, disabled = false, ...props }, ref) => {
    return (
      <input
        disabled={disabled}
        css={inputStyle({ size, invalid, disabled })}
        ref={ref}
        {...props}
      />
    );
  }
);

UderLineInput.displayName = 'UnderLineInput';

export { UderLineInput };
