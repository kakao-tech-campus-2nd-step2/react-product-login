import { OrderFormType } from '@/types/orderType';

import { Divider } from '@/components/ui/Divider';
import { Container } from '@/components/ui/Layout/Container';

import { GiftDetail } from './GiftDetail';
import { GiftMessage } from './GiftMessage';
import { dividerStyle } from './styles';

type GiftSectionProps = {
  formData: OrderFormType;
  handleInputChange: (inputField: keyof OrderFormType, value: string) => void;
};

export const GiftSection = ({
  formData,
  handleInputChange,
}: GiftSectionProps) => {
  return (
    <Container flexDirection="column">
      <GiftMessage formData={formData} handleInputChange={handleInputChange} />
      <Divider css={dividerStyle} />
      <GiftDetail />
    </Container>
  );
};
