import { Text } from '@chakra-ui/react';

import { Callout } from '@/components/Callout';

type TotalPriceCalloutProps = {
  totalPrice: number;
};

export const TotalPriceCallout = ({ totalPrice }: TotalPriceCalloutProps) => {
  return (
    <Callout
      radius={3}
      theme="lightGray"
      justifyContent="space-between"
      alignItems="center"
      css={{ padding: '0.5rem 1rem' }}
    >
      <Text as="b">총 결제 금액</Text>
      <Text fontSize="lg" as="b">
        {totalPrice} 원
      </Text>
    </Callout>
  );
};
