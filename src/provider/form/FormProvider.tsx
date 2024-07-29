import { HTMLAttributes, forwardRef, useId, useMemo } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { FormFieldContext, FormItemContext } from './FormContext';

export const FormItemProvider = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const id = useId();
  const value = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={value}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});
FormItemProvider.displayName = 'FormItem';

export const FormFieldProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const value = useMemo(() => ({ name: props.name }), [props.name]);

  return (
    <FormFieldContext.Provider value={value}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};
