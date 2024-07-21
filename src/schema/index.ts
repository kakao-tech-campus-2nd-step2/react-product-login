import { z } from 'zod';

export const OrderSchema = z
  .object({
    productId: z.number(),
    productQuantity: z.number(),
    gitfMessage: z
      .string()
      .min(1, { message: '메세지를 입력해주세요.' })
      .max(100, { message: '선물 메세지는 100자 이내로 입력해 주세요.' }),
    isCashChecked: z.boolean(),
    cashReceiptType: z.enum(['개인소득공제', '사업자증빙용']),
    cashReceiptNumber: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.isCashChecked) {
      if (!data.cashReceiptNumber.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: '현금 영수증 번호를 입력해주세요.',
          path: ['cashReceiptNumber'],
        });
      }

      if (!data.cashReceiptNumber.match(/^01\d{9}$/)) {
        ctx.addIssue({
          code: 'custom',
          message: '(-없이) 번호를 정확히 입력해주세요.',
          path: ['cashReceiptNumber'],
        });
      }
    }
  });
