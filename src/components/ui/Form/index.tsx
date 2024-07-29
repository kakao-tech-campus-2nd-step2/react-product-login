import { css } from '@emotion/react';

import { HTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  FormFieldProvider,
  FormItemProvider,
} from '@/provider/form/FormProvider';
import { useFormField } from '@/provider/form/useFormField';

const Form = FormProvider;
const FormField = FormFieldProvider;

const FormItem = FormItemProvider;

const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formMessageId } = useFormField();

    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={`${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      css={css({
        color: 'red',
      })}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const FormLabel = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ ...props }, ref) => {
  const { formItemId } = useFormField();

  return <label ref={ref} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = 'FormLabel';

export { Form, FormField, FormItem, FormControl, FormMessage, FormLabel };
