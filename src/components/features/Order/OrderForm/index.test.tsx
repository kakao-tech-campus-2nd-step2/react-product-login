import { validateOrderForm } from './index';

describe('validateOrderForm', () => {
  test('현금영수증 번호가 없을 때 오류 반환', () => {
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

  test('현금영수증 번호가 없을 때 오류 반환', () => {
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

  test('메시지가 없을 때 오류 반환', () => {
    const values = {
      productId: 1,
      productQuantity: 2,
      senderId: 1,
      receiverId: 1,
      hasCashReceipt: false,
      cashReceiptNumber: '',
      messageCardTextMessage: '',
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('메시지를 입력해주세요.');
  });
  

  test('메세지가 너무 길 때 오류 반환', () => {
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

  test('모든 조건이 충족되었을 때 유효', () => {
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
