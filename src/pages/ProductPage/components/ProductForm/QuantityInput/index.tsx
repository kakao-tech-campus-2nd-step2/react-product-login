import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, Text, useNumberInput } from '@chakra-ui/react';

import { ProductOptions } from '@/types/productType';

import { Card } from '@/components/Card';
import { Container } from '@/components/ui/Layout/Container';

type QuantityInputProps = {
  productOptions: ProductOptions;
  quantity: number;
  onChangeQuantity: (newQuantity: number) => void;
};

export const QuantityInput = ({
  productOptions,
  quantity,
  onChangeQuantity,
}: QuantityInputProps) => {
  const maxQuantity = productOptions.giftOrderLimit;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: quantity,
      min: 1,
      max: maxQuantity,
      onChange: (valueAsNumber) => {
        onChangeQuantity(Number(valueAsNumber));
      },
    });

  const dec = getDecrementButtonProps();
  const inc = getIncrementButtonProps();
  const input = getInputProps();

  return (
    <Card flexDirection="column" gap="0.5rem" css={{ padding: '1rem' }}>
      <Text as="b">{productOptions.productName}</Text>
      <Container flexDirection="row" gap="0.5rem">
        <IconButton
          aria-label="Decrease Quantity"
          icon={<MinusIcon />}
          {...dec}
        />
        <Input {...input} />
        <IconButton
          aria-label="Increase Quantity"
          icon={<AddIcon />}
          {...inc}
        />
      </Container>
    </Card>
  );
};
