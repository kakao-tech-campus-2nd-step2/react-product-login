import { useFormContext } from 'react-hook-form';

import { Textarea } from '@chakra-ui/react';

import { OrderForm } from '@/pages/OrderPage/hooks/useOrderForm';

import { FormField } from '@/components/ui/Form';

import { textAreaContainerStyle, textLengthStyle } from './styles';

export const GiftMessageField = () => {
  const { control } = useFormContext<OrderForm>();

  return (
    <FormField
      control={control}
      name="gitfMessage"
      render={({ field }) => {
        const textLength = field.value.length;

        return (
          <div css={textAreaContainerStyle}>
            <Textarea
              value={field.value}
              onChange={field.onChange}
              placeholder="선물과 함께 보낼 메세지를 적어보세요"
              variant="filled"
              data-testid="gift-message-field"
              css={{ height: '6.5rem' }}
            />
            <span css={textLengthStyle(textLength > 100)}>
              {textLength}/100
            </span>
          </div>
        );
      }}
    />
  );
};
