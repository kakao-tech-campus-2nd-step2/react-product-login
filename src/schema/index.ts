import { z } from 'zod';

export const OrderValidationErrorMessages = {
  giftMessageRequired: '메세지를 입력해주세요.',
  giftMessageTooLong: '선물 메세지는 100자 이내로 입력해 주세요.',
  cashReceiptNumberRequired: '현금 영수증 번호를 입력해주세요.',
  cashReceiptNumberInvalid: '(-없이) 번호를 정확히 입력해주세요.',
};
export const OrderSchema = z
  .object({
    productId: z.number(),
    productQuantity: z.number(),
    gitfMessage: z
      .string()
      .min(1, { message: OrderValidationErrorMessages.giftMessageRequired })
      .max(100, { message: OrderValidationErrorMessages.giftMessageTooLong }),
    isCashChecked: z.boolean(),
    cashReceiptType: z.enum(['개인소득공제', '사업자증빙용']).optional(),
    cashReceiptNumber: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.isCashChecked) {
      if (!data.cashReceiptNumber.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: OrderValidationErrorMessages.cashReceiptNumberRequired,
          path: ['cashReceiptNumber'],
        });
      }

      if (!data.cashReceiptNumber.match(/^01\d{9}$/)) {
        ctx.addIssue({
          code: 'custom',
          message: OrderValidationErrorMessages.cashReceiptNumberInvalid,
          path: ['cashReceiptNumber'],
        });
      }
    }
  });

export const AuthErrorMessage = {
  emailRequired: '이메일을 입력해주세요.',
  emailInvalid: '이메일 형식으로 입력해주세요.',
  passwordRequired: '비밀번호를 입력해주세요.',
};
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: AuthErrorMessage.emailRequired })
    .regex(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
      message: AuthErrorMessage.emailInvalid,
    }),
  password: z.string().min(1, { message: AuthErrorMessage.passwordRequired }),
});
export type LoginFields = z.infer<typeof LoginSchema>;

export const RegisterSchema = LoginSchema;
export type RegisterFields = z.infer<typeof RegisterSchema>;
