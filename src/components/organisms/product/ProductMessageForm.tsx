import { defaultBorderColor } from '@styles/colors';
import Container from '@components/atoms/container/Container';
import {
  Divider, Text, Textarea,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback } from 'react';

interface ProductMessageFormProps {
  cardMessage: string;
  setCardMessage: (message: string) => void;
}

function ProductMessageForm({ cardMessage, setCardMessage }: ProductMessageFormProps) {
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCardMessage(e.target.value);
  }, [setCardMessage]);

  return (
    <>
      <Text fontWeight="bold">나에게 주는 선물</Text>
      <Container elementSize="full-width" padding="14px 30px">
        <Container elementSize="full-width" padding="12px 30px 16px">
          <Textarea
            width="100%"
            height="100px"
            border="none"
            backgroundColor={defaultBorderColor}
            resize="none"
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            value={cardMessage}
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Divider borderBottomWidth="5px" borderColor={defaultBorderColor} />
    </>
  );
}

export default ProductMessageForm;
