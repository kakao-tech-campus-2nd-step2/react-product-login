import { Callout } from '@/components/Callout';
import { Text } from '@/components/ui/Text';

import { calloutStyle } from './styles';

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
      css={calloutStyle}
    >
      <Text size="sm" isBold>
        총 결제 금액
      </Text>
      <Text size="lg" isBold>
        {totalPrice} 원
      </Text>
    </Callout>
  );
};
