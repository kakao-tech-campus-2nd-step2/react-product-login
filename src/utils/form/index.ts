import { useMemo } from 'react';
import type { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type RegisterOption<T extends FieldValues> = {
  name: Path<T>;
  option?: RegisterOptions<T>;
};

export type UseCreateRegisterProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  options: RegisterOption<T>[];
};

export function useCreateRegister<T extends FieldValues>({
  register,
  options,
}: UseCreateRegisterProps<T>) {
  const registers = useMemo(
    () =>
      options.map((option) => ({
        name: option.name,
        register: register(option.name, option.option),
      })),
    [register, options],
  );

  const getRegister = (name: Path<T>) => registers.find((reg) => reg.name === name)?.register;

  return getRegister;
}
