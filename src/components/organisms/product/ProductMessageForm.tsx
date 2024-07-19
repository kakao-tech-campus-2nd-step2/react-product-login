import { backgroundColors, defaultBorderColor, textColors } from '@styles/colors';
import Container from '@components/atoms/container/Container';
import {
  Divider, Text, Textarea,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback } from 'react';
import { OrderRequestBody } from '@/types/request';
import { OrderFormErrorStatus } from '@/types';

interface ProductMessageFormProps {
  orderData: OrderRequestBody;
  setOrderData: (orderData: OrderRequestBody) => void;
  errorStatus: OrderFormErrorStatus;
}

function ProductMessageForm({
  orderData, setOrderData, errorStatus,
}: ProductMessageFormProps) {
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setOrderData({ ...orderData, messageCardTextMessage: e.target.value });
  }, [orderData, setOrderData]);

  return (
    <>
      <Text fontWeight="bold">나에게 주는 선물</Text>
      <Container elementSize="full-width" padding="14px 30px">
        <Container elementSize="full-width" padding="12px 30px 16px" flexDirection="column">
          <Textarea
            _focus={{
              backgroundColor: backgroundColors.container,
            }}
            width="100%"
            height="100px"
            border="none"
            backgroundColor={defaultBorderColor}
            resize="none"
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            value={orderData.messageCardTextMessage}
            onChange={handleChange}
          />
          {
            errorStatus.hasCardMessageError ? (
              <Text color={textColors.error}>{errorStatus.cardMessageErrorCaption}</Text>
            ) : null
          }
        </Container>
      </Container>
      <Divider borderBottomWidth="5px" borderColor={defaultBorderColor} />
    </>
  );
}

export default ProductMessageForm;
