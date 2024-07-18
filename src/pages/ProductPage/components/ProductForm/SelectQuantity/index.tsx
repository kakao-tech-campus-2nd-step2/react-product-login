import { ChangeEvent } from 'react';

import { Card } from '@/components/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input/Default';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { buttonStyle, cardStyle } from './styles';

type SelectQuantityProps = {
  productName: string;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
};

export const SelectQuantity = ({
  productName,
  quantity,
  setQuantity,
}: SelectQuantityProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    setQuantity(value);
  };

  return (
    <Card flexDirection="column" gap="0.5rem" css={cardStyle}>
      <Text isBold>{productName}</Text>
      <Container flexDirection="row" gap="0.5rem">
        <Button
          theme="lightGray"
          size="medium"
          onClick={() => setQuantity(quantity - 1)}
          css={buttonStyle}
        >
          -
        </Button>
        <Input name="quantity" value={quantity} onChange={handleInputChange} />
        <Button
          theme="lightGray"
          size="medium"
          onClick={() => setQuantity(quantity + 1)}
          css={buttonStyle}
        >
          +
        </Button>
      </Container>
    </Card>
  );
};
