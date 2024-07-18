import { OrderFormType } from '@/types/orderType';

import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';
import { TextArea } from '@/components/ui/TextArea';

import { containerStyle, textAreaStyle } from './styles';

type GiftMessageProps = {
  formData: OrderFormType;
  handleInputChange: (inputField: keyof OrderFormType, value: string) => void;
};

export const GiftMessage = ({
  formData,
  handleInputChange,
}: GiftMessageProps) => {
  return (
    <Container
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      css={containerStyle}
    >
      <Text size="lg" isBold>
        나에게 주는 선물
      </Text>
      <TextArea
        placeholder="선물과 함께 보낼 메세지를 적어보세요"
        value={formData.gitfMessage}
        onChange={(e) => handleInputChange('gitfMessage', e.target.value)}
        css={textAreaStyle}
      />
    </Container>
  );
};
