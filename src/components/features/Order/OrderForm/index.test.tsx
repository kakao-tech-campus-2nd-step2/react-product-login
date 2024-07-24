import { validateOrderForm } from './index';

describe('validateOrderForm', () => {
  test('should return error when cash receipt number is missing', () => {
    const values = {
      productId: 1,
      productQuantity: 2,
      senderId: 1,
      receiverId: 1,
      hasCashReceipt: true,
      cashReceiptNumber: '',
      messageCardTextMessage: 'Test message',
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('현금영수증 번호를 입력해주세요.');
  });

  test('should return error when message is too long', () => {
    const values = {
      productId: 1,
      productQuantity: 2,
      senderId: 1,
      receiverId: 1,
      hasCashReceipt: false,
      cashReceiptNumber: '',
      messageCardTextMessage: 'a'.repeat(101),
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('메시지는 100자 이내로 입력해주세요.');
  });

  test('should return valid when all conditions are met', () => {
    const values = {
      productId: 1,
      productQuantity: 2,
      senderId: 1,
      receiverId: 1,
      hasCashReceipt: false,
      cashReceiptNumber: '',
      messageCardTextMessage: 'Valid message',
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(true);
  });
});
