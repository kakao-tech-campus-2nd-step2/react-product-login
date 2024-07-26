import React, { useEffect } from 'react';
import { Input, Button, useNumberInput, HStack } from '@chakra-ui/react';
import { UseFormSetValue } from 'react-hook-form';
import { QuantityValues } from '..';

interface QuantitySelectorProps {
  giftOrderLimit?: number;
  setValue: UseFormSetValue<QuantityValues>;
}

export default function QuantitySelector({ giftOrderLimit, setValue }: QuantitySelectorProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: giftOrderLimit,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    setValue('count', Number(input.value));
  }, [input.value, setValue]);

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
