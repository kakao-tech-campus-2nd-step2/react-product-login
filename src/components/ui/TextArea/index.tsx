import { TextareaHTMLAttributes, forwardRef } from 'react';

import { textAreaStyle } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }, ref) => {
    return <textarea ref={ref} css={textAreaStyle} {...props} />;
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
