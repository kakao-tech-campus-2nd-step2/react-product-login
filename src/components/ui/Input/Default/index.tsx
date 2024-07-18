import { InputHTMLAttributes, forwardRef } from 'react';

import { defaultInputStyle } from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <input css={defaultInputStyle} ref={ref} {...props} />;
});

Input.displayName = 'Input';

export { Input };
