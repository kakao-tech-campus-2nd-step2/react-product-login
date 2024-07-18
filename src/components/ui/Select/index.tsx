import { SelectHTMLAttributes, forwardRef } from 'react';

import { selectStyle } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => {
    return (
      <select ref={ref} css={selectStyle} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
