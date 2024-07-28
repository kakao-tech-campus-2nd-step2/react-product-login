import React, { useEffect, useState } from 'react';
import { Input, Button, useNumberInput, HStack } from '@chakra-ui/react';
import { UseFormSetValue } from 'react-hook-form';
import { QuantityValues } from '..';

interface QuantitySelectorProps {
  giftOrderLimit?: number;
  setValue: UseFormSetValue<QuantityValues>;
}

export default function QuantitySelector({ giftOrderLimit, setValue }: QuantitySelectorProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: giftOrderLimit,
  });

  const [inputValue, setInputValue] = useState<string>('1');

  const inc = getIncrementButtonProps({ 'data-testid': 'increment-button' });
  const dec = getDecrementButtonProps({ 'data-testid': 'decrement-button' });
  const input = getInputProps({ 'data-testid': 'option-input' });

  useEffect(() => {
    setValue('count', valueAsNumber);
  }, [valueAsNumber, setValue]);

  const handleIncrement = () => {
    setInputValue((prev) => (Number(prev) + 1).toString());
  };

  const handleDecrement = () => {
    setInputValue((prev) => (Number(prev) > 1 ? (Number(prev) - 1).toString() : prev));
  };

  return (
    <HStack maxW="320px">
      <Button {...dec} onClick={handleDecrement}>
        -
      </Button>
      <Input {...input} value={inputValue} />
      <Button {...inc} onClick={handleIncrement}>
        +
      </Button>
    </HStack>
  );
}
