import { ChangeEvent, forwardRef } from 'react';

import { InputProps } from '../Default';
import { checkboxStyle } from './styles';

interface CheckboxProps extends InputProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ ...props }, ref) => {
    return <input type="checkbox" css={checkboxStyle} ref={ref} {...props} />;
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
