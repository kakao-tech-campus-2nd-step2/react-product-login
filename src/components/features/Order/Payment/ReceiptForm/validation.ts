const VALIDATE_NUMBER = /^\d*$/;

export const validatePayment = (message: string, hasCashReceipt: boolean, cashReceiptNumber: string) => {
  if (!message) return '메시지를 입력해주세요.';
  if (hasCashReceipt && !cashReceiptNumber) return '현금영수증 번호를 입력해주세요.';
  if (hasCashReceipt && !VALIDATE_NUMBER.test(cashReceiptNumber)) return '현금영수증 번호는 숫자로만 입력해주세요.';
  return '';
};
