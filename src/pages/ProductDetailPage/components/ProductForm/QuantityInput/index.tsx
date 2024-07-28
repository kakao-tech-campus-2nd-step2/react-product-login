import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, Text, useNumberInput } from '@chakra-ui/react';

import { ProductData } from '@/types/productType';

import { Card } from '@/components/Card';
import { Container } from '@/components/ui/Layout/Container';

type QuantityInputProps = {
  productDetail: ProductData;
  quantity: number;
  onChangeQuantity: (newQuantity: number) => void;
};

export const QuantityInput = ({
  productDetail,
  quantity,
  onChangeQuantity,
}: QuantityInputProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: quantity,
      min: 1,
      max: 100,
      onChange: (valueAsNumber) => {
        onChangeQuantity(Number(valueAsNumber));
      },
    });

  const dec = getDecrementButtonProps();
  const inc = getIncrementButtonProps();
  const input = getInputProps();

  return (
    <Card flexDirection="column" gap="0.5rem" css={{ padding: '1rem' }}>
      <Text as="b">{productDetail.name}</Text>
      <Container flexDirection="row" gap="0.5rem">
        <IconButton
          aria-label="Decrease Quantity"
          icon={<MinusIcon />}
          data-testid="quantity-increase-button"
          {...dec}
        />
        <Input {...input} data-testid="quantity-input" />
        <IconButton
          aria-label="Increase Quantity"
          icon={<AddIcon />}
          {...inc}
        />
      </Container>
    </Card>
  );
};
