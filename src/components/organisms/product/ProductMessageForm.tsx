import { backgroundColors, defaultBorderColor, textColors } from '@styles/colors';
import Container from '@components/atoms/container/Container';
import {
  Divider, Text, Textarea,
} from '@chakra-ui/react';
import {
  FieldErrors, FieldValues, UseFormRegister,
} from 'react-hook-form';
import { OrderFormData } from '@/types';

interface ProductMessageFormProps<T extends FieldValues> {
  register: UseFormRegister<T>,
  errors: FieldErrors<T>,
}

function ProductMessageForm({
  register, errors,
}: ProductMessageFormProps<OrderFormData>) {
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
            {...register('messageCardTextMessage', {
              required: '카드 메시지를 입력해주세요',
            })}
          />
          {
            errors.messageCardTextMessage ? (
              <Text color={textColors.error}>{errors.messageCardTextMessage.message}</Text>
            ) : null
          }
        </Container>
      </Container>
      <Divider borderBottomWidth="5px" borderColor={defaultBorderColor} />
    </>
  );
}

export default ProductMessageForm;
