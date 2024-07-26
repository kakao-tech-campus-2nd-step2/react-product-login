import { validateOrderForm } from './index';

describe('주문 폼 유효성 검사', () => {
  test('현금영수증 번호 유효성 검사', () => {
    const values = {
      hasCashReceipt: true,
      cashReceiptNumber: '12345abc',
      messageCardTextMessage: '테스트 메시지',
      productId: 2263833,
      productQuantity: 1,
      receiverId: 0,
      senderId: 0,
    };

    const result = validateOrderForm(values);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('현금영수증 번호는 숫자로만 입력해주세요.');
  });

  test('메시지 카드 텍스트 길이 검사 (너무 짧음)', () => {
    const values = {
      hasCashReceipt: false,
      messageCardTextMessage: '',
      productId: 2263833,
      productQuantity: 1,
      receiverId: 0,
      senderId: 0,
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('메시지를 입력해주세요.');
  });

  test('메시지 카드 텍스트 길이 검사 (너무 김)', () => {
    const values = {
      hasCashReceipt: false,
      messageCardTextMessage: 'a'.repeat(101),
      productId: 2263833,
      productQuantity: 1,
      receiverId: 0,
      senderId: 0,
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('메시지는 100자 이내로 입력해주세요.');
  });

  test('모든 조건이 유효한 경우', () => {
    const values = {
      hasCashReceipt: false,
      messageCardTextMessage: '올바른 메시지',
      productId: 2263833,
      productQuantity: 1,
      receiverId: 0,
      senderId: 0,
    };
    const result = validateOrderForm(values);
    expect(result.isValid).toBe(true);
  });
});
