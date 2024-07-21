import { useForm } from 'react-hook-form';

import { Textarea } from '@chakra-ui/react';
import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

import { FormField } from '@/components/ui/Form';

import { textAreaContainerStyle, textLengthStyle } from './styles';

type GiftMessageProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const GiftMessage = ({ form }: GiftMessageProps) => {
  return (
    <FormField
      control={form.control}
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
